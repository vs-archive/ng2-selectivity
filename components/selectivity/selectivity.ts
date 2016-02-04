import {
  Component, View, OnInit, OnDestroy, Input, Output,
  Directive, ViewEncapsulation, Self,
  EventEmitter, ElementRef, ComponentRef,
  DynamicComponentLoader,
  provide, forwardRef, ResolvedBinding, Injector
} from 'angular2/core';

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
    'items',
    'multiple',
    'showSearchInputInDropdown']
})
@View({
  template: `
<div *ngIf="!multiple" (click)="onClick($event)" class="selectivity-single-select" (keydown)="inputEvent($event)">
  <input type="text" class="selectivity-single-select-input">
  <div class="selectivity-single-result-container">
    <div *ngIf="active.length <= 0" class="selectivity-placeholder">{{placeholder}}</div>
    <span *ngIf="active.length > 0" class="selectivity-single-selected-item">
      <a class="selectivity-single-selected-item-remove"><i class="fa fa-remove"></i></a>{{active[0].text}}
    </span>
  </div><i class="fa fa-sort-desc selectivity-caret"></i>
</div>

<div *ngIf="multiple" (click)="onClick($event)" class="selectivity-multiple-input-container">
  <span *ngFor="#a of active" class="selectivity-multiple-selected-item">
    <a class="selectivity-multiple-selected-item-remove"><i class="fa fa-remove"></i></a>{{a.text}}</span>
  <input (keydown)="inputEvent($event)"
         (keyup)="inputEvent($event, true)"
         placeholder="{{active.length <= 0 ? placeholder : ''}}"
         type="text" autocomplete="off" autocorrect="off" autocapitalize="off" class="selectivity-multiple-input">
  <span class="selectivity-multiple-input selectivity-width-detector"></span><div class="selectivity-clearfix"></div>
</div>
  `,
  styles: [require('./ng2-selectivity.css')],
  directives: [],
  encapsulation: ViewEncapsulation.None
})
export class Selectivity implements ISelectivity, OnInit, OnDestroy {
  @Input() data:Array<any> = [];
  @Input() multiple:boolean = false;
  @Output() dataChange = new EventEmitter();
  @Output() selected = new EventEmitter();
  @Output() removed = new EventEmitter();
  private allowClear:boolean = false;
  private placeholder:string = '';
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

  ngOnInit() {
    this.offSideClickHandler = this.getOffSideClickHandler(this);
    document.addEventListener('click', this.offSideClickHandler);

    if (this.data) {
      this.active = this.data.map(d => new SelectivityItem(d));
      this.dataChange.emit(this.active);
    }
  }

  ngOnDestroy() {
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
      this.dataChange.emit(this.active);
      this.doEvent('removed', item);
    }

    if (this.multiple === false) {
      this.active = [];
      this.dataChange.emit(this.active);
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
      this[type].emit(value);
    }
  }

  show() {
    let options = new SelectivityOptions({
      placement: 'bottom-left',
      selectivity: this,
      container: this
    });

    let binding = Injector.resolve([
      provide(SelectivityOptions, {useValue: options})
    ]);

    let expectedPopup:any = this.items[0].submenu ?
      SelectivityMenuContainer :
      SelectivityOptionsContainer;

    this._popup = this.loader
      .loadNextToLocation(expectedPopup, this.element, binding)
      .then((componentRef:ComponentRef) => {
        this.optContainer = componentRef.instance;

        // HACK: we cannot position right now because children elements are not yet created
        setTimeout(() => {
          componentRef.instance.position(this.element);
          this.element.nativeElement.focus();
        }, 0);

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
