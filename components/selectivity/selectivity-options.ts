import {ISelectivity} from './selectivity-interfaces';
import {Selectivity} from './selectivity';

export class SelectivityOptions {
  public placement:string;
  public container:ISelectivity;
  public selectivity:Selectivity;

  constructor(options:SelectivityOptions) {
    Object.assign(this, options);
  }
}
