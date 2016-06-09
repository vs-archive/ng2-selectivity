import {
  Component, View, OnInit, OnDestroy, Output,
  Directive, ViewEncapsulation, Self,
  EventEmitter, ElementRef, ComponentRef,
  DynamicComponentLoader,
  provide, forwardRef, ResolvedBinding, Injector
} from 'angular2/core';

import {
  NgClass, NgStyle, NgFor
} from 'angular2/common';

import {positionService} from '../position';
import {ISelectivity, IOptionsBehavior} from './selectivity-interfaces';
import {SelectivityItem} from './selectivity-item';
import {SelectivityOptions} from './selectivity-options';
import {SelectivityOptionsContainer} from './selectivity-options-container';

@Component({
  selector: 'selectivity-menu-container'
})
@View({
  template: `
<div class="selectivity-dropdown"
     [ngStyle]="{top: top, left: left, width: width, display: display}">
  <div class="selectivity-results-container">
    <div *ngFor="#i of items"
         (mouseenter)="selectActive(i, $event)"
         [ngClass]="{highlight: isActive(i)}"
         class="selectivity-result-item">{{i.text}}<i class="selectivity-submenu-icon fa fa-chevron-right"></i></div>
  </div>
</div>
  `,
  directives: [NgClass, NgStyle, NgFor],
  encapsulation: ViewEncapsulation.None
})
export class SelectivityMenuContainer implements ISelectivity {
  @Output() dataChange = new EventEmitter();
  private items:Array<SelectivityItem> = [];
  private itemObjects:Array<SelectivityItem> = [];
  private active:SelectivityItem;
  private top:string;
  private left:string;
  private width:string;
  private display:string;
  private placement:string;
  private _popup:Promise<ComponentRef>;
  private hostEl:ElementRef;

  constructor(public element:ElementRef,
              private options:SelectivityOptions,
              private loader:DynamicComponentLoader) {
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
      provide(SelectivityOptions, {useValue: options})
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
