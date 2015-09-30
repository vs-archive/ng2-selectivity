import {SelectivityItem} from './selectivity-item';

export interface ISelectivity {
  getItemObjects():Array<SelectivityItem>;
  hasSearchInput():boolean;
  hide();
}

export interface IOptionsBehavior {
  first();
  last();
  prev();
  next();
  filter(query:RegExp):any;
}
