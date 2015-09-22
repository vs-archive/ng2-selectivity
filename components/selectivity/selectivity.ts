/// <reference path="../../tsd.d.ts" />

import {
  Component, View, onInit, onDestroy,
  Directive, LifecycleEvent,
  EventEmitter, ElementRef,
  CORE_DIRECTIVES, NgClass
} from 'angular2/angular2';
import ClassDefinition = ng.ClassDefinition;

@Component({
  selector: 'ng2-selectivity',
  properties: []
})
@View({
  template: `selectivity`
})
export class Selectivity {

  constructor(private element:ElementRef) {
  }

  onInit() {
  }

  onDestroy() {
  }
}

export const selectivity:Array<any> = [Selectivity];
