/// <reference path="../../tsd.d.ts" />

import {
  Component, View, OnInit, OnDestroy,
  Directive, ViewEncapsulation, Self,
  EventEmitter, ElementRef, ComponentRef,
  DynamicComponentLoader,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle
} from 'angular2/angular2';

import {bind, Injectable, forwardRef, ResolvedBinding, Injector} from 'angular2/di';

import {positionService} from '../position';

let cssSelectivity = require('./selectivity.css');

export class SelectivityItem {
  public id:string;
  public text:string;
  public children:Array<any>;

  constructor(source:any) {
    if (typeof source === 'string') {
      this.id = this.text = source;
    }

    if (typeof source === 'object') {
      if (source.id && source.text) {
        this.id = source.id;
        this.text = source.text;
      }

      if (source.children && source.text) {
        this.children = source.children;
        this.text = source.text;
      }
    }
  }

  public hasChildren():boolean {
    return this.children && this.children.length > 0;
  }
}

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
<div *ng-if="options.sel && options.sel.items"
     class="selectivity-dropdown"
     [ng-class]="{'has-search-input': options.sel.isMultiple === false}"
     [ng-style]="{top: top, left: left, width: width, display: display}">
  <div *ng-if="options.sel.isMultiple === false"
       class="selectivity-search-input-container">
    <input (keydown)="inputEvent($event)"
           (keyup)="inputEvent($event, true)"
           type="text"
           class="selectivity-search-input">
  </div>
  <div *ng-if="!options.sel.itemObjects[0].hasChildren()" class="selectivity-results-container">
    <div *ng-if="items.length <= 0"
         class="selectivity-error">No results for <b>{{inputValue}}</b></div>
    <div *ng-for="#i of items"
         [ng-class]="{'highlight': isActive(i)}"
         (mouseenter)="selectActive(i)"
         (click)="selectMatch(i, $event)"
         class="selectivity-result-item">{{i.text}}</div>
  </div>

  <div *ng-if="options.sel.itemObjects[0].hasChildren()" class="selectivity-results-container">
      <div *ng-for="#i of items">
      <div class="selectivity-result-label">{{i.text}}</div>
          <div class="selectivity-result-children">
              <div *ng-for="#ii of i.children"
                   (mouseenter)="selectActive(ii)"
                   (click)="selectMatch(ii, $event)"
                   [ng-class]="{'highlight': isActive(ii)}"
                   class="selectivity-result-item">{{ii.text}}</div>
          </div>
      </div>
  </div>
</div>

<!--<div class="selectivity-results-container">
  <div class="selectivity-result-item" data-item-id="+00:00">Western European Time Zone<i class="selectivity-submenu-icon fa fa-chevron-right"></i></div>
  <div class="selectivity-result-item highlight" data-item-id="+01:00">Central European Time Zone<i class="selectivity-submenu-icon fa fa-chevron-right"></i></div>
  <div class="selectivity-result-item" data-item-id="+02:00">Eastern European Time Zone<i class="selectivity-submenu-icon fa fa-chevron-right"></i></div>
</div>-->


  `,
  styles: [cssSelectivity],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle],
  encapsulation: ViewEncapsulation.None
})
export class SelectivityOptionsContainer {
  public items:Array<SelectivityItem> = [];
  public active:SelectivityItem;
  private top:string;
  private left:string;
  private width:string;
  private display:string;
  private placement:string;
  private inputValue:string;
  private inputComponent:any;
  private behavior:SelectivityOptionsContainer.GenericBehavior;

  constructor(public element:ElementRef, private options:SelectivityOptions) {
    Object.assign(this, options);
  }

  public position(hostEl:ElementRef) {
    this.items = this.options.sel.itemObjects.filter(option => (this.options.sel.isMultiple === false ||
    this.options.sel.isMultiple === true && !this.options.sel.active.find(o => option.text === o.text)));

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

    let inputs:Array<any> = [
      this.element.nativeElement.getElementsByClassName('selectivity-search-input'),
      this.element.nativeElement.parentElement.getElementsByClassName('selectivity-multiple-input')
    ];

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].length > 0) {
        this.inputComponent = inputs[i][0];
        this.inputComponent.focus();
        break;
      }
    }

    if (this.options.sel.itemObjects[0].hasChildren()) {
      this.behavior = new SelectivityOptionsContainer.ChildrenBehavior(this);
    }

    if (!this.behavior) {
      this.behavior = new SelectivityOptionsContainer.GenericBehavior(this);
    }
  }

  public inputEvent(e:any, isUpMode:boolean = false) {
    // todo: scroll processing during active option changing is expected
    // esc and tab
    if (!isUpMode && (e.keyCode === 27 || e.keyCode === 9)) {
      this.options.sel.hide();
      e.preventDefault();
      return;
    }

    // backspace
    if (!isUpMode && e.keyCode === 8) {
      if (!this.inputValue) {
        this.options.sel.remove(this.options.sel.active[this.options.sel.active.length - 1]);
      }
    }

    // left
    if (!isUpMode && e.keyCode === 37 && this.items.length > 0) {
      this.behavior.first();
      e.preventDefault();
      return;
    }

    // right
    if (!isUpMode && e.keyCode === 39 && this.items.length > 0) {
      this.behavior.last();
      e.preventDefault();
      return;
    }

    // up
    if (!isUpMode && e.keyCode === 38) {
      this.behavior.prev();
      e.preventDefault();
      return;
    }

    // down
    if (!isUpMode && e.keyCode === 40) {
      this.behavior.next();
      e.preventDefault();
      return;
    }

    // enter
    if (!isUpMode && e.keyCode === 13) {
      this.selectActiveMatch();
      e.preventDefault();
      return;
    }

    if (e.srcElement) {
      this.inputValue = e.srcElement.value;

      let query = new RegExp(e.srcElement.value, 'ig');
      this.items = this.options.sel.itemObjects.filter((option:SelectivityItem) => query.test(option.text) &&
      (this.options.sel.isMultiple === false ||
      this.options.sel.isMultiple === true && this.options.sel.active.indexOf(option) < 0));
    }
  }

  private selectActiveMatch():boolean {
    return this.selectMatch(this.active);
  }

  private selectMatch(value:SelectivityItem, e:Event = null) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (this.options.sel.isMultiple === true) {
      if (this.items.length <= 0) {
        return;
      }

      this.options.sel.active.push(value);
      this.options.sel.data.next(this.options.sel.active);
      this.options.sel.doEvent('selected', value);
    }

    if (this.options.sel.isMultiple === false) {
      this.options.sel.active[0] = value;
      this.options.sel.data.next(this.options.sel.active[0]);
      this.options.sel.doEvent('selected', value);
      // turn back focus to input from options
      this.options.sel.element.nativeElement.children[1].children[0].focus();
    }

    // clear user input after option selection from list
    if (this.inputComponent) {
      this.inputComponent.value = '';
    }

    this.options.sel.hide();
  }

  private selectActive(value:SelectivityItem) {
    this.active = value;
  }

  private isActive(value:SelectivityItem):boolean {
    return this.active.text === value.text;
  }
}

export interface IOptionsBehavior {
  first();
  last();
  prev();
  next();
}

export module SelectivityOptionsContainer {
  export class GenericBehavior implements IOptionsBehavior {
    constructor(private actor:SelectivityOptionsContainer) {
    }

    public first() {
      this.actor.active = this.actor.items[0];
    }

    public last() {
      this.actor.active = this.actor.items[this.actor.items.length - 1];
    }

    public prev() {
      let index = this.actor.items.indexOf(this.actor.active);
      this.actor.active = this.actor.items[index - 1 < 0 ? this.actor.items.length - 1 : index - 1];
    }

    public next() {
      let index = this.actor.items.indexOf(this.actor.active);
      this.actor.active = this.actor.items[index + 1 > this.actor.items.length - 1 ? 0 : index + 1];
    }
  }

  export class ChildrenBehavior implements IOptionsBehavior {
    constructor(private actor:SelectivityOptionsContainer) {
    }

    public first() {
    }

    public last() {
    }

    public prev() {
    }

    public next() {
    }
  }
}

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
  styles: [cssSelectivity],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class Selectivity implements OnInit, OnDestroy {
  public data:EventEmitter = new EventEmitter();
  private selected:EventEmitter = new EventEmitter();
  private removed:EventEmitter = new EventEmitter();
  private allowClear:boolean = false;
  private placeholder:string = '';
  private initData:Array<any> = [];
  private _items:Array<any> = [];
  private _itemObjects:Array<SelectivityItem> = [];
  private multiple:boolean = false;
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

  public get isMultiple():boolean {
    return this.multiple;
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
      sel: this
    });

    let binding = Injector.resolve([
      bind(SelectivityOptions).toValue(options)
    ]);

    this._popup = this.loader
      .loadNextToLocation(SelectivityOptionsContainer, this.element, binding)
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
}

export const selectivity:Array<any> = [Selectivity];
