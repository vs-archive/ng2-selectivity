/// <reference path="../../../tsd.d.ts" />

import {
  Component, View,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass
} from 'angular2/angular2';

import {selectivity} from '../../../components/index';

// webpack html imports
let template = require('./single-demo.html');

@Component({
  selector: 'single-demo'
})
@View({
  template: template,
  directives: [selectivity, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class SingleDemo {
}
