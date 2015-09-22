/// <reference path="../../tsd.d.ts" />

import {
  Component, View, onInit, onDestroy,
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
  public items:Array<any> = [];

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
<div *ng-if="options && options.items" class="selectivity-dropdown has-search-input" [ng-style]="{top: top, left: left, display: display}">
  <div class="selectivity-search-input-container"><input type="text" class="selectivity-search-input"></div>
  <div class="selectivity-results-container">
    <div *ng-for="#i of options.items" [ng-class]="{'highlight': i === 'Cologne'}" class="selectivity-result-item">{{i}}</div>
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
  private display:string;
  private placement:string;

  constructor(public element:ElementRef, private options:SelectivityOptions) {
    Object.assign(this, options);
  }

  public position(hostEl:ElementRef) {
    this.display = 'block';
    // todo: adaptive top: in case of options at bottom of the screen
    let p = positionService
      .positionElements(hostEl.nativeElement,
      this.element.nativeElement.children[0],
      this.placement, false);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
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
<div class="selectivity-single-select">
  <input type="text" class="selectivity-single-select-input">
  <div class="selectivity-single-result-container">
    <span class="selectivity-single-selected-item" data-item-id="Barcelona">
      <a class="selectivity-single-selected-item-remove"><i class="fa fa-remove"></i></a>Barcelona
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
  styles: [cssSelectivity]
})
export class Selectivity {
  private allowClear:boolean = false;
  private placeholder:string = '';
  private items:Array<any> = [];
  private multiple:boolean = false;
  private showSearchInputInDropdown:boolean = true;

  private popup:Promise<any>;
  public container:SelectivityOptionsContainer;

  constructor(private element:ElementRef, private loader:DynamicComponentLoader) {
  }

  onInit() {
    setTimeout(() => {
      this.show();
    }, 2000);
  }

  onDestroy() {
  }

  show() {
    let options = new SelectivityOptions({
      placement: 'bottom-left',
      items: this.items
    });

    let binding = Injector.resolve([
      bind(SelectivityOptions).toValue(options)
    ]);

    this.popup = this.loader
      .loadNextToLocation(SelectivityOptionsContainer, this.element, binding)
      .then((componentRef:ComponentRef) => {
      componentRef.instance.position(this.element);
      this.container = componentRef.instance;
      this.element.nativeElement.focus();
      return componentRef;
    });
  }

  hide() {
    if (this.container) {
      this.popup.then((componentRef:ComponentRef) => {
        componentRef.dispose();
        this.container = null;
        return componentRef;
      });
    }
  }
}

export const selectivity:Array<any> = [Selectivity];
