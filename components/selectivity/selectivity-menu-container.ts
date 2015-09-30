import {
  Component, View, OnInit, OnDestroy,
  Directive, ViewEncapsulation, Self,
  EventEmitter, ElementRef, ComponentRef,
  DynamicComponentLoader,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle
} from 'angular2/angular2';

import {bind, Injectable, forwardRef, ResolvedBinding, Injector} from 'angular2/di';

import {positionService} from '../position';
import {ISelectivity, IOptionsBehavior} from './selectivity-interfaces';
import {SelectivityItem} from './selectivity-item';
import {SelectivityOptions} from './selectivity-options';
import {SelectivityOptionsContainer} from './selectivity-options-container';

let cssSelectivity = require('./selectivity.css');

@Component({
  selector: 'selectivity-menu-container',
  events: ['data']
})
@View({
  template: `
<div class="selectivity-dropdown"
     [ng-style]="{top: top, left: left, width: width, display: display}">
  <div class="selectivity-results-container">
    <div *ng-for="#i of items"
         (mouseenter)="selectActive(i, $event)"
         [ng-class]="{highlight: isActive(i)}"
         class="selectivity-result-item">{{i.text}}<i class="selectivity-submenu-icon fa fa-chevron-right"></i></div>
  </div>
</div>
  `,
  styles: [cssSelectivity],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle],
  encapsulation: ViewEncapsulation.None
})
export class SelectivityMenuContainer implements ISelectivity {
  private items:Array<SelectivityItem> = [];
  private itemObjects:Array<SelectivityItem> = [];
  private active:SelectivityItem;
  private top:string;
  private left:string;
  private width:string;
  private display:string;
  private placement:string;
  private _popup:Promise<ComponentRef>;
  private data:EventEmitter = new EventEmitter();
  private hostEl:ElementRef;

  constructor(public element:ElementRef, private options:SelectivityOptions, private loader:DynamicComponentLoader) {
    Object.assign(this, options);
  }

  public position(hostEl:ElementRef) {
    this.hostEl = hostEl;
    this.items = this.options.container.getItemObjects();
    this.active = this.items[0].subMenu.items[0];
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
  }

  private isActive(value:SelectivityItem):boolean {
    return this.active.text === value.text;
  }

  private doActive(value:SelectivityItem, e:Event) {
    this.active = value;
    this.itemObjects = this.active.subMenu.items.map((item:any) => new SelectivityItem(item));
    this.show(positionService.position(e.srcElement));
  }

  private selectActive(value:SelectivityItem, e:Event) {
    if (!this._popup) {
      this.doActive(value, e);
      return;
    }

    this._popup.then((componentRef:ComponentRef) => {
      componentRef.dispose();
      this._popup = null;
      this.doActive(value, e);

      return componentRef;
    });
  }

  show(position:any) {
    let options = new SelectivityOptions({
      placement: 'top-right',
      selectivity: this.options.selectivity,
      container: this
    });

    let binding = Injector.resolve([
      bind(SelectivityOptions).toValue(options)
    ]);

    let expectedPopup:any = SelectivityOptionsContainer;
    this._popup = this.loader
      .loadNextToLocation(expectedPopup, this.element, binding)
      .then((componentRef:ComponentRef) => {
      componentRef.instance.position(this.hostEl, position);
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

  public getItemObjects():Array<SelectivityItem> {
    return this.itemObjects;
  }

  public hasSearchInput():boolean {
    return this.active.subMenu.options.showSearchInput;
  }
}
