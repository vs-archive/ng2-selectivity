/// <reference path="../../tsd.d.ts" />

import {Component, View, CORE_DIRECTIVES, NgNonBindable} from 'angular2/angular2';

import {tabs} from 'ng2-bootstrap';
import {SingleDemo} from './selectivity/single-demo';
import {MultipleDemo} from './selectivity/multiple-demo';
import {ChildrenDemo} from './selectivity/children-demo';

let name = 'Selectivity';
let src = 'https://github.com/valor-software/ng2-selectivity/blob/master/components/selectivity/selectivity.ts';
// webpack html imports
let doc = require('../../components/selectivity/readme.md');

let tabDesc:Array<any> = [
  {
    heading: 'Single',
    ts: require('!!prismjs?lang=typescript!./selectivity/single-demo.ts'),
    html: require('!!prismjs?lang=markup!./selectivity/single-demo.html')
  },
  {
    heading: 'Multiple',
    ts: require('!!prismjs?lang=typescript!./selectivity/multiple-demo.ts'),
    html: require('!!prismjs?lang=markup!./selectivity/multiple-demo.html')
  },
  {
    heading: 'Children',
    ts: require('!!prismjs?lang=typescript!./selectivity/children-demo.ts'),
    html: require('!!prismjs?lang=markup!./selectivity/children-demo.html')
  }
];

let tabsContent:string = ``;
tabDesc.forEach(desc => {
  tabsContent += `
          <tab heading="${desc.heading}" (select)="select($event)">
          <div class="card card-block panel panel-default panel-body">

            <${desc.heading.toLowerCase()}-demo *ng-if="currentHeading === '${desc.heading}'"></${desc.heading.toLowerCase()}-demo>

            <br>

            <div class="row" style="margin: 0px;">
              <tabset>
                <tab heading="Markup">
                  <div class="card card-block panel panel-default panel-body">
                    <pre class="language-html"><code class="language-html" ng-non-bindable>${desc.html}</code></pre>
                  </div>
                </tab>
                <tab heading="TypeScript">
                  <div class="card card-block panel panel-default panel-body">
                    <pre class="language-typescript"><code class="language-typescript" ng-non-bindable>${desc.ts}</code></pre>
                  </div>
                </tab>
              </tabset>
            </div>
          </div>
        </tab>
  `;
});

@Component({
  selector: 'selectivity-section'
})
@View({
  template: `
  <section id="${name.toLowerCase()}">
    <div class="row">
      <tabset>

        ${tabsContent}

      </tabset>
    </div>

    <div class="row">
      <h2>API</h2>
      <div class="card card-block panel panel-default panel-body">${doc}</div>
    </div>
  </section>
  `,
  directives: [SingleDemo, MultipleDemo, ChildrenDemo, tabs, CORE_DIRECTIVES, NgNonBindable]
})
export class SelectivitySection {
  private currentHeading:string = 'Single';

  private select(e) {
    if (e.heading) {
      this.currentHeading = e.heading;
    }
  }
}
