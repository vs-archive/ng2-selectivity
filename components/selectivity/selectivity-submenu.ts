import {SelectivityItem} from './selectivity-item';

export class SelectivitySubMenu {
  public items:Array<SelectivityItem>;
  public options:any = {};

  constructor(source:any, public parent:SelectivityItem) {
    this.items = source.items;
    for (let o of Object.keys(source)) {
      if (o !== 'items') {
        this.options[o] = source[o];
      }
    }
  }
}
