/// <reference path="../../tsd.d.ts" />

import {
  Component, View, OnInit, OnDestroy,
  Directive, ViewEncapsulation,
  EventEmitter, ElementRef, ComponentRef,
  DynamicComponentLoader,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle
} from 'angular2/angular2';

import {bind, Injectable, forwardRef, ResolvedBinding, Injector} from 'angular2/di';

import {positionService} from '../position';

let cssSelectivity = require('./selectivity.css');

export class SelectivityOptions {
  public placement:string;
  public sel:Selectivity;

  constructor(options:SelectivityOptions) {
    Object.assign(this, options);
  }
}

// todo: local font awesome is expected

@Component({
  selector: 'selectivity-options-container'
})
@View({
  template: `
<div *ng-if="options.sel && options.sel.items" class="selectivity-dropdown has-search-input" [ng-style]="{top: top, left: left, width: width, display: display}">
  <div class="selectivity-search-input-container"><input type="text" class="selectivity-search-input" (keydown)="inputEvent($event)"></div>
  <div class="selectivity-results-container">
    <div *ng-for="#i of items"
         [ng-class]="{'highlight': isActive(i)}"
         (mouseenter)="selectActive(i)"
         class="selectivity-result-item">{{i}}</div>
  </div>
</div>
  `,
  styles: [cssSelectivity],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle],
  encapsulation: ViewEncapsulation.None
})
export class SelectivityOptionsContainer {
  private top:string;
  private left:string;
  private width:string;
  private display:string;
  private placement:string;
  private items:Array<any> = [];
  private active:string;

  constructor(public element:ElementRef, private options:SelectivityOptions) {
    Object.assign(this, options);
  }

  public position(hostEl:ElementRef) {
    this.items = this.options.sel.items.slice();

    if (this.items.length > 0) {
      this.active = this.items[0];
    }

    this.display = 'block';
    // todo: adaptive top: in case of options at bottom of the screen
    let parentPosition = positionService.position(hostEl.nativeElement);
    let p = positionService
      .positionElements(hostEl.nativeElement,
      this.element.nativeElement.children[0],
      this.placement, false);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
    this.width = parentPosition.width + 'px';

    // input element before options list should be focused: see structure of own template
    this.element.nativeElement.children[1].children[0].children[0].focus();
  }

  private inputEvent(e:any) {
    // esc
    // todo: tab 9 should be correct
    if (e.keyCode === 27 || e.keyCode === 9) {
      this.options.sel.hide();
      e.preventDefault();
      return;
    }

    // up
    if (e.keyCode === 38) {
      this.prevActiveMatch();
      e.preventDefault();
      return;
    }

    // down
    if (e.keyCode === 40) {
      this.nextActiveMatch();
      e.preventDefault();
      return;
    }

    // enter
    if (e.keyCode === 13) {
      this.selectActiveMatch();
      e.preventDefault();
      return;
    }

    if (e.srcElement) {
      let query = new RegExp(e.srcElement.value, 'ig');
      this.items = this.options.sel.items.filter(option => {
        return query.test(option);
      });
    }
  }

  private prevActiveMatch() {
    let index = this.items.indexOf(this.active);
    this.active = this.items[index - 1 < 0 ? this.items.length - 1 : index - 1];
  }

  private nextActiveMatch() {
    let index = this.items.indexOf(this.active);
    this.active = this.items[index + 1 > this.items.length - 1 ? 0 : index + 1];
  }

  private selectActiveMatch() {
    this.selectMatch(this.active);
  }

  private selectMatch(value:string, e:Event = null) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    console.log(this.options);
    this.options.sel.active = value;
    this.options.sel.hide();
    /*this.parent.changeModel(value);
     this.parent.typeaheadOnSelect.next({
     item: value
     });*/
    return false;
  }

  private selectActive(value:string) {
    this.active = value;
  }

  private isActive(value):boolean {
    return this.active === value;
  }
}

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
<div (click)="openPopup()" class="selectivity-single-select">
  <input type="text" class="selectivity-single-select-input">
  <div class="selectivity-single-result-container">
    <div *ng-if="!active" class="selectivity-placeholder">{{placeholder}}</div>
    <span *ng-if="active" class="selectivity-single-selected-item">
      <a class="selectivity-single-selected-item-remove"><i class="fa fa-remove"></i></a>{{active}}
    </span>
  </div><i class="fa fa-sort-desc selectivity-caret"></i>
</div>

<!--<div class="selectivity-multiple-input-container">
  <span class="selectivity-multiple-selected-item highlighted" data-item-id="Athens">
    <a class="selectivity-multiple-selected-item-remove"><i class="fa fa-remove"></i></a>Athens</span>
  <span class="selectivity-multiple-selected-item" data-item-id="Berlin">
    <a class="selectivity-multiple-selected-item-remove"><i class="fa fa-remove"></i></a>Berlin</span>
  <input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" class="selectivity-multiple-input" placeholder="" style="width: 20px;">
  <span class="selectivity-multiple-input selectivity-width-detector"></span><div class="selectivity-clearfix"></div>
</div>-->
  `,
  styles: [cssSelectivity],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class Selectivity implements OnInit, OnDestroy {
  private allowClear:boolean = false;
  private placeholder:string = '';
  private _items:Array<any> = [];
  private multiple:boolean = false;
  private showSearchInputInDropdown:boolean = true;
  private _popup:Promise<ComponentRef>;
  private offSideClickHandler:any;
  private _active:string = '';

  constructor(private element:ElementRef, private loader:DynamicComponentLoader) {
  }

  public get popup():Promise<ComponentRef> {
    return this._popup;
  }

  public get items():Array<any> {
    return this._items;
  }

  set items(value:Array<any>) {
    this._items = value;
  }

  public get active():string {
    return this._active;
  }

  public set active(value:string) {
    this._active = value;
  }

  onInit() {
    this.offSideClickHandler = this.getOffSideClickHandler(this);
    document.addEventListener('click', this.offSideClickHandler);
  }

  onDestroy() {
    document.removeEventListener('click', this.offSideClickHandler);
    this.offSideClickHandler = null;
  }

  private getOffSideClickHandler(context:any) {
    return function (e:any) {
      if (e.srcElement && e.srcElement.className.indexOf('selectivity-') === 0) {
        return;
      }

      context.hide();
    };
  }

  private openPopup() {
    if (!this.popup) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    let options = new SelectivityOptions({
      placement: 'bottom-left',
      sel: this
    });

    let binding = Injector.resolve([
      bind(SelectivityOptions).toValue(options)
    ]);

    this._popup = this.loader
      .loadNextToLocation(SelectivityOptionsContainer, this.element, binding)
      .then((componentRef:ComponentRef) => {
      componentRef.instance.position(this.element);
      this.element.nativeElement.focus();
      return componentRef;
    });
  }

  public hide() {
    if (this._popup) {
      this._popup.then((componentRef:ComponentRef) => {
        componentRef.dispose();
        this._popup = null;
        return componentRef;
      });
    }
  }
}

export const selectivity:Array<any> = [Selectivity];
