import {
  Component, View, OnInit, OnDestroy,
  Directive, ViewEncapsulation, Self,
  EventEmitter, ElementRef, ComponentRef,
  DynamicComponentLoader,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle,
  bind, forwardRef, ResolvedBinding, Injector
} from 'angular2/angular2';

import {positionService} from '../position';
import {ISelectivity, IOptionsBehavior} from './selectivity-interfaces';
import {SelectivityItem} from './selectivity-item';
import {SelectivityOptions} from './selectivity-options';
import {SelectivityMenuContainer} from './selectivity-menu-container';
import {SelectivityOptionsContainer} from './selectivity-options-container';

// todo: local font awesome is expected
@Component({
  selector: 'ng2-selectivity',
  properties: [
    'allowClear',
    'placeholder',
    'initData:data',
    'items',
    'multiple',
    'showSearchInputInDropdown'],
  events: ['selected', 'removed', 'data']
})
@View({
  template: `
<div *ng-if="!multiple" (click)="onClick($event)" class="selectivity-single-select" (keydown)="inputEvent($event)">
  <input type="text" class="selectivity-single-select-input">
  <div class="selectivity-single-result-container">
    <div *ng-if="active.length <= 0" class="selectivity-placeholder">{{placeholder}}</div>
    <span *ng-if="active.length > 0" class="selectivity-single-selected-item">
      <a class="selectivity-single-selected-item-remove"><i class="fa fa-remove"></i></a>{{active[0].text}}
    </span>
  </div><i class="fa fa-sort-desc selectivity-caret"></i>
</div>

<div *ng-if="multiple" (click)="onClick($event)" class="selectivity-multiple-input-container">
  <span *ng-for="#a of active" class="selectivity-multiple-selected-item">
    <a class="selectivity-multiple-selected-item-remove"><i class="fa fa-remove"></i></a>{{a.text}}</span>
  <input (keydown)="inputEvent($event)"
         (keyup)="inputEvent($event, true)"
         placeholder="{{active.length <= 0 ? placeholder : ''}}"
         type="text" autocomplete="off" autocorrect="off" autocapitalize="off" class="selectivity-multiple-input">
  <span class="selectivity-multiple-input selectivity-width-detector"></span><div class="selectivity-clearfix"></div>
</div>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class Selectivity implements ISelectivity, OnInit, OnDestroy {
  public data:EventEmitter = new EventEmitter();
  public multiple:boolean = false;
  private selected:EventEmitter = new EventEmitter();
  private removed:EventEmitter = new EventEmitter();
  private allowClear:boolean = false;
  private placeholder:string = '';
  private initData:Array<any> = [];
  private _items:Array<any> = [];
  private _itemObjects:Array<SelectivityItem> = [];
  private _popup:Promise<ComponentRef>;
  private _active:Array<SelectivityItem> = [];
  private showSearchInputInDropdown:boolean = true;
  private offSideClickHandler:any;
  private optContainer:SelectivityOptionsContainer;

  constructor(public element:ElementRef,
              private loader:DynamicComponentLoader) {
  }

  public get popup():Promise<ComponentRef> {
    return this._popup;
  }

  private get items():Array<any> {
    return this._items;
  }

  private set items(value:Array<any>) {
    this._items = value;
    this._itemObjects = this._items.map((item:any) => new SelectivityItem(item));
  }

  public get itemObjects():Array<SelectivityItem> {
    return this._itemObjects;
  }

  public get active():Array<SelectivityItem> {
    return this._active;
  }

  public set active(value:Array<SelectivityItem>) {
    this._active = value;
  }

  onInit() {
    this.offSideClickHandler = this.getOffSideClickHandler(this);
    document.addEventListener('click', this.offSideClickHandler);

    if (this.initData) {
      this.active = this.initData.map(d => new SelectivityItem(d));
      this.data.next(this.active);
    }
  }

  onDestroy() {
    document.removeEventListener('click', this.offSideClickHandler);
    this.offSideClickHandler = null;
  }

  private inputEvent(e:any, isUpMode:boolean = false) {
    if (!this._popup && e.keyCode !== 13 && e.keyCode !== 27) {
      this.show();
    }

    if (this.optContainer) {
      this.optContainer.inputEvent(e, isUpMode);
    }
  }

  private getOffSideClickHandler(context:any) {
    return function (e:any) {
      if (e.srcElement && e.srcElement.className.indexOf('selectivity-') === 0) {
        return;
      }

      context.hide();
    };
  }

  public remove(item:SelectivityItem) {
    if (this.multiple === true && this.active) {
      let index = this.active.indexOf(item);
      this.active.splice(index, 1);
      this.data.next(this.active);
      this.doEvent('removed', item);
    }

    if (this.multiple === false) {
      this.active = [];
      this.data.next(this.active);
      this.doEvent('removed', item);
    }
  }

  private onClick(e:any) {
    if (e.srcElement && e.srcElement.className &&
      e.srcElement.className.indexOf('fa-remove') >= 0) {
      let currentOption = this.active.find(o => o.text === e.srcElement.parentElement.parentElement.innerText);

      if (currentOption) {
        this.remove(currentOption);
        return;
      }
    }

    if (!this.popup) {
      this.show();
    } else {
      this.hide();
    }
  }

  public doEvent(type:string, value:any) {
    if (this[type] && value) {
      this[type].next(value);
    }
  }

  show() {
    let options = new SelectivityOptions({
      placement: 'bottom-left',
      selectivity: this,
      container: this
    });

    let binding = Injector.resolve([
      bind(SelectivityOptions).toValue(options)
    ]);

    let expectedPopup:any = this.items[0].submenu ?
      SelectivityMenuContainer :
      SelectivityOptionsContainer;

    this._popup = this.loader
      .loadNextToLocation(expectedPopup, this.element, binding)
      .then((componentRef:ComponentRef) => {
      componentRef.instance.position(this.element);
      this.optContainer = componentRef.instance;
      this.element.nativeElement.focus();
      return componentRef;
    });
  }

  public hide() {
    if (this._popup) {
      this._popup.then((componentRef:ComponentRef) => {
        componentRef.dispose();
        this._popup = null;
        this.optContainer = null;
        return componentRef;
      });
    }
  }

  public getItemObjects():Array<SelectivityItem> {
    return this.itemObjects;
  }

  public hasSearchInput():boolean {
    if (this.multiple === true) {
      return false;
    }

    return this.showSearchInputInDropdown;
  }
}

export const selectivity:Array<any> = [Selectivity];
