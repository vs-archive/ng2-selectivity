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
<div *ng-if="options.sel && options.sel.items"
     class="selectivity-dropdown"
     [ng-class]="{'has-search-input': options.sel.multiple === false}"
     [ng-style]="{top: top, left: left, width: width, display: display}">
  <div *ng-if="options.sel.multiple === false"
       class="selectivity-search-input-container">
    <input (keydown)="inputEvent($event)"
           (keyup)="inputEvent($event, true)"
           type="text"
           class="selectivity-search-input">
  </div>
  <div class="selectivity-results-container">
    <div *ng-if="items.length <= 0"
         class="selectivity-error">No results for <b>{{inputValue}}</b></div>
    <div *ng-for="#i of items"
         [ng-class]="{'highlight': isActive(i)}"
         (mouseenter)="selectActive(i)"
         (click)="selectMatch(i, $event)"
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
  private inputValue:string;
  private inputComponent:any;

  constructor(public element:ElementRef, private options:SelectivityOptions) {
    Object.assign(this, options);
  }

  public position(hostEl:ElementRef) {
    this.items = this.options.sel.items.filter(option => {
      return (this.options.sel.multiple === false ||
      this.options.sel.multiple === true && this.options.sel.active.indexOf(option) < 0);
    });

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
      }
    }

    this.inputComponent.focus();
  }

  public inputEvent(e:any, isUpMode:boolean = false) {
    // todo: scroll processing during active option changing is expected
    // esc and tab
    if (!isUpMode && (e.keyCode === 27 || e.keyCode === 9)) {
      this.options.sel.hide();
      e.preventDefault();
      return;
    }
    // left
    if (!isUpMode && e.keyCode === 37 && this.items.length > 0) {
      this.active = this.items[0];
      e.preventDefault();
      return;
    }

    // right
    if (!isUpMode && e.keyCode === 39 && this.items.length > 0) {
      this.active = this.items[this.items.length - 1];
      e.preventDefault();
      return;
    }

    // up
    if (!isUpMode && e.keyCode === 38) {
      this.prevActiveMatch();
      e.preventDefault();
      return;
    }

    // down
    if (!isUpMode && e.keyCode === 40) {
      this.nextActiveMatch();
      e.preventDefault();
      return;
    }

    // enter
    if (!isUpMode && e.keyCode === 13) {
      let success = this.selectActiveMatch();
      // clear user input after option selection from list
      if (success) {
        if (this.inputComponent) {
          this.inputComponent.value = '';
        }
      }

      e.preventDefault();
      return;
    }

    if (e.srcElement) {
      this.inputValue = e.srcElement.value;

      let query = new RegExp(e.srcElement.value, 'ig');
      this.items = this.options.sel.items.filter(option => {
        return query.test(option) &&
          (this.options.sel.multiple === false ||
          this.options.sel.multiple === true && this.options.sel.active.indexOf(option) < 0);
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

  private selectActiveMatch():boolean {
    return this.selectMatch(this.active);
  }

  private selectMatch(value:string, e:Event = null):boolean {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (this.options.sel.multiple === true) {
      if (this.items.length <= 0) {
        return false;
      }

      this.options.sel.active.push(value);
    }

    if (this.options.sel.multiple === false) {
      this.options.sel.active[0] = value;
    }

    this.options.sel.hide();
    return true;
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
<div *ng-if="!multiple" (click)="onClick($event)" class="selectivity-single-select">
  <input type="text" class="selectivity-single-select-input">
  <div class="selectivity-single-result-container">
    <div *ng-if="active.length <= 0" class="selectivity-placeholder">{{placeholder}}</div>
    <span *ng-if="active.length > 0" class="selectivity-single-selected-item">
      <a class="selectivity-single-selected-item-remove"><i class="fa fa-remove"></i></a>{{active[0]}}
    </span>
  </div><i class="fa fa-sort-desc selectivity-caret"></i>
</div>

<div *ng-if="multiple" (click)="onClick($event)" class="selectivity-multiple-input-container">
  <span *ng-for="#a of active" class="selectivity-multiple-selected-item">
    <a class="selectivity-multiple-selected-item-remove"><i class="fa fa-remove"></i></a>{{a}}</span>
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
  private allowClear:boolean = false;
  private placeholder:string = '';
  private _items:Array<any> = [];
  private _multiple:boolean = false;
  private _popup:Promise<ComponentRef>;
  private _active:Array<string> = [];
  private showSearchInputInDropdown:boolean = true;
  private offSideClickHandler:any;
  private optContainer:SelectivityOptionsContainer;

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

  public get active():Array<string> {
    return this._active;
  }

  public set active(value:Array<string>) {
    this._active = value;
  }

  public get multiple():boolean {
    return this._multiple;
  }

  set multiple(value:boolean) {
    this._multiple = value;
  }

  onInit() {
    this.offSideClickHandler = this.getOffSideClickHandler(this);
    document.addEventListener('click', this.offSideClickHandler);
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

  private onClick(e:any) {
    if (e.srcElement && e.srcElement.className &&
      e.srcElement.className.indexOf('fa-remove') >= 0) {

      if (this.multiple === true && this.active) {
        let index = this.active.indexOf(e.srcElement.parentElement.parentElement.innerText);
        this.active.splice(index, 1);
      }

      if (this.multiple === false) {
        this.active = [];
      }

      return;
    }

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
