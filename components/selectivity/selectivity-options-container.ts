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

@Component({
  selector: 'selectivity-options-container'
})
@View({
  template: `
<style>
  @import url(/build/selectivity.css);
</style>
<div *ng-if="options.selectivity && options.container"
     class="selectivity-dropdown"
     [ng-class]="{'has-search-input': options.selectivity.multiple === false}"
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
      <div *ng-if="items.length <= 0"
         class="selectivity-error">No results for <b>{{inputValue}}</b></div>
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

  constructor(public element:ElementRef, public options:SelectivityOptions) {
    Object.assign(this, options);
  }

  public position(hostEl:ElementRef, itemPosition:any = {}) {
    this.items = this.options.container
      .getItemObjects()
      .filter(option => (this.options.selectivity.multiple === false ||
      this.options.selectivity.multiple === true && !this.options.selectivity
        .active
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
    /*let resultsEl:any = this.element.nativeElement.children[1].children[3];
     let resultsPosition = positionService.position(resultsEl);*/

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
          .remove(this.options.selectivity.active[this.options.selectivity.active.length - 1]);
      }
    }

    // left
    if (!isUpMode && e.keyCode === 37 && this.items.length > 0) {
      this.behavior.first();
      // resultsEl.scrollTop = 0;

      e.preventDefault();
      return;
    }

    // right
    if (!isUpMode && e.keyCode === 39 && this.items.length > 0) {
      this.behavior.last();
      // resultsEl.scrollTop = resultsEl.scrollHeight;

      e.preventDefault();
      return;
    }

    // up
    if (!isUpMode && e.keyCode === 38) {
      let reverse = this.behavior.prev();

      /*let activeEl:any = resultsEl.getElementsByClassName('highlight');
       let activePosition = positionService.position(activeEl[0]);

       if (reverse) {
       resultsEl.scrollTop = resultsEl.scrollHeight;
       }

       if (!reverse && activePosition.top <= resultsEl.scrollTop) {
       resultsEl.scrollTop = activePosition.top - activePosition.height;
       }*/

      e.preventDefault();
      return;
    }

    // down
    if (!isUpMode && e.keyCode === 40) {
      let reverse = this.behavior.next();

      /*let activeEl:any = resultsEl.getElementsByClassName('highlight');
       let activePosition = positionService.position(activeEl[0]);

       if (reverse) {
       resultsEl.scrollTop = 0;
       }

       if (!reverse && activePosition.top > resultsPosition.height - activePosition.height) {
       resultsEl.scrollTop = activePosition.top + activePosition.height;
       }*/

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
      let query:RegExp = new RegExp(e.srcElement.value, 'ig');
      let {items, isActiveAvailable} = this.behavior.filter(query);
      this.items = items;

      if (this.items.length > 0 && !isActiveAvailable) {
        this.behavior.first();
      }
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

    if (this.options.selectivity.multiple === true) {
      if (this.items.length <= 0) {
        return;
      }

      this.options.selectivity.active.push(value);
      this.options.selectivity.data.next(this.options.selectivity.active);
      this.options.selectivity.doEvent('selected', value);
    }

    if (this.options.selectivity.multiple === false) {
      this.options.selectivity.active[0] = value;
      this.options.selectivity.data.next(this.options.selectivity.active[0]);
      this.options.selectivity.doEvent('selected', value);
      // turn back focus to input from options
      this.options.selectivity.element.nativeElement.children[1].children[0].focus();
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

  function getIndex(a:Array<SelectivityItem>, v:SelectivityItem):number {
    for (let i = 0; i < a.length; i++) {
      if (a[i].id === v.id) {
        return i;
      }
    }

    return -1;
  }

  export class GenericBehavior implements IOptionsBehavior {
    constructor(private actor:SelectivityOptionsContainer) {
    }

    public first() {
      this.actor.active = this.actor.items[0];
    }

    public last() {
      this.actor.active = this.actor.items[this.actor.items.length - 1];
    }

    public prev():boolean {
      let index = this.actor.items.indexOf(this.actor.active);
      let reverse = index - 1 < 0;
      this.actor.active = this.actor.items[reverse ? this.actor.items.length - 1 : index - 1];
      return reverse;
    }

    public next() {
      let index = this.actor.items.indexOf(this.actor.active);
      let reverse = index + 1 > this.actor.items.length - 1;
      this.actor.active = this.actor.items[reverse ? 0 : index + 1];
      return reverse;
    }

    public filter(query:RegExp):any {
      let items:Array<SelectivityItem> = this.actor.options.container.getItemObjects()
        .filter((option:SelectivityItem) => query.test(option.text) &&
        (this.actor.options.selectivity.multiple === false ||
        (this.actor.options.selectivity.multiple === true &&
        this.actor.options.selectivity.active.indexOf(option) < 0)));
      let isActiveAvailable = getIndex(items, this.actor.active);
      return {items, isActiveAvailable};
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

    public prev():boolean {
      let reverse = false;
      let indexParent = getIndex(this.actor.items, this.actor.active.parent);
      let index = getIndex(this.actor.items[indexParent].children, this.actor.active);
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
        reverse = true;
      }

      return reverse;
    }

    public next():boolean {
      let reverse = false;
      let indexParent = getIndex(this.actor.items, this.actor.active.parent);
      let index = getIndex(this.actor.items[indexParent].children, this.actor.active);
      this.actor.active = this.actor.items[indexParent].children[index + 1];

      if (!this.actor.active) {
        if (this.actor.items[indexParent + 1]) {
          this.actor.active = this.actor.items[indexParent + 1].children[0];
        }
      }

      if (!this.actor.active) {
        this.first();
        reverse = true;
      }

      return reverse;
    }

    public filter(query:RegExp):any {
      let items:Array<SelectivityItem> = [];
      let isActiveAvailable = false;

      for (let si of this.actor.options.container.getItemObjects()) {
        let children:Array<SelectivityItem> = si.children.filter(option => query.test(option.text));

        if (children.length > 0) {

          if (getIndex(children, this.actor.active) >= 0) {
            isActiveAvailable = true;
          }

          let newSi = si.getSimilar();
          newSi.children = children;
          items.push(newSi);
        }
      }

      return {items, isActiveAvailable};
    }
  }
}
