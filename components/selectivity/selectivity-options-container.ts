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

let cssSelectivity = require('./selectivity.css');

@Component({
  selector: 'selectivity-options-container'
})
@View({
  template: `
<div *ng-if="options.selectivity && options.container"
     class="selectivity-dropdown"
     [ng-class]="{'has-search-input': options.selectivity.isMultiple() === false}"
     [ng-style]="{top: top, left: left, width: width, display: display}">
  <div *ng-if="options.container.hasSearchInput()"
       class="selectivity-search-input-container">
    <input (keydown)="inputEvent($event)"
           (keyup)="inputEvent($event, true)"
           type="text"
           class="selectivity-search-input">
  </div>
  <div *ng-if="!options.container.getItemObjects()[0].hasChildren()" class="selectivity-results-container">
    <div *ng-if="items.length <= 0"
         class="selectivity-error">No results for <b>{{inputValue}}</b></div>
    <div *ng-for="#i of items"
         [ng-class]="{'highlight': isActive(i)}"
         (mouseenter)="selectActive(i)"
         (click)="selectMatch(i, $event)"
         class="selectivity-result-item">{{i.text}}</div>
  </div>

  <div *ng-if="options.container.getItemObjects()[0].hasChildren()" class="selectivity-results-container">
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
  private behavior:IOptionsBehavior;

  constructor(public element:ElementRef, private options:SelectivityOptions) {
    Object.assign(this, options);
  }

  public position(hostEl:ElementRef, itemPosition:any = {}) {
    this.items = this.options.container
      .getItemObjects()
      .filter(option => (this.options.selectivity.isMultiple() === false ||
    this.options.selectivity.isMultiple() === true && !this.options.selectivity
      .getActive()
      .find(o => option.text === o.text)));

    if (this.options.container.getItemObjects()[0].hasChildren()) {
      this.behavior = new SelectivityOptionsContainer.ChildrenBehavior(this);
    }

    if (!this.behavior) {
      this.behavior = new SelectivityOptionsContainer.GenericBehavior(this);
    }

    if (this.items.length > 0) {
      this.behavior.first();
    }

    this.display = 'block';
    // todo: adaptive top: in case of options at bottom of the screen
    let parentPosition = positionService.position(hostEl.nativeElement);
    let p = positionService
      .positionElements(hostEl.nativeElement,
      this.element.nativeElement.children[0],
      this.placement, false);

    // will be calculated in case of this container have parent menu
    let topOffset:number = itemPosition ? itemPosition.top + itemPosition.height : 0;
    this.top = (p.top + topOffset) + 'px';
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
  }

  public inputEvent(e:any, isUpMode:boolean = false) {
    // todo: scroll processing during active option changing is expected
    // esc and tab
    if (!isUpMode && (e.keyCode === 27 || e.keyCode === 9)) {
      this.options.container.hide();
      e.preventDefault();
      return;
    }

    // backspace
    if (!isUpMode && e.keyCode === 8) {
      if (!this.inputValue) {
        this.options.selectivity
          .remove(this.options.selectivity.getActive()[this.options.selectivity.getActive().length - 1]);
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
      this.items = this.options.container
        .getItemObjects().filter((option:SelectivityItem) => query.test(option.text) &&
      (this.options.selectivity.isMultiple() === false ||
      this.options.selectivity.isMultiple() === true && this.options.selectivity.getActive().indexOf(option) < 0));
    }
  }

  private selectActiveMatch() {
    this.selectMatch(this.active);
  }

  private selectMatch(value:SelectivityItem, e:Event = null) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (this.options.selectivity.isMultiple() === true) {
      if (this.items.length <= 0) {
        return;
      }

      this.options.selectivity.getActive().push(value);
      this.options.selectivity.getDataEvent().next(this.options.selectivity.getActive());
      this.options.selectivity.doEvent('selected', value);
    }

    if (this.options.selectivity.isMultiple() === false) {
      this.options.selectivity.getActive()[0] = value;
      this.options.selectivity.getDataEvent().next(this.options.selectivity.getActive()[0]);
      this.options.selectivity.doEvent('selected', value);
      // turn back focus to input from options
      this.options.selectivity.getElement().nativeElement.children[1].children[0].focus();
    }

    // clear user input after option selection from list
    if (this.inputComponent) {
      this.inputComponent.value = '';
    }

    this.options.container.hide();
    this.options.selectivity.hide();
  }

  private selectActive(value:SelectivityItem) {
    this.active = value;
  }

  private isActive(value:SelectivityItem):boolean {
    return this.active.text === value.text;
  }
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
      this.actor.active = this.actor.items[0].children[0];
    }

    public last() {
      this.actor.active =
        this.actor
          .items[this.actor.items.length - 1]
          .children[this.actor.items[this.actor.items.length - 1].children.length - 1];
    }

    public prev() {
      let indexParent:number = this.actor.items.indexOf(this.actor.active.parent);
      let index:number = this.actor.items[indexParent].children.indexOf(this.actor.active);
      this.actor.active = this.actor.items[indexParent].children[index - 1];

      if (!this.actor.active) {
        if (this.actor.items[indexParent - 1]) {
          this.actor.active = this.actor
            .items[indexParent - 1]
            .children[this.actor.items[indexParent - 1].children.length - 1];
        }
      }

      if (!this.actor.active) {
        this.last();
      }
    }

    public next() {
      let indexParent:number = this.actor.items.indexOf(this.actor.active.parent);
      let index:number = this.actor.items[indexParent].children.indexOf(this.actor.active);
      this.actor.active = this.actor.items[indexParent].children[index + 1];

      if (!this.actor.active) {
        if (this.actor.items[indexParent + 1]) {
          this.actor.active = this.actor.items[indexParent + 1].children[0];
        }
      }

      if (!this.actor.active) {
        this.first();
      }
    }
  }
}
