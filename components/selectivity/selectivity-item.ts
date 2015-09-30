import {SelectivitySubMenu} from './selectivity-submenu';

export class SelectivityItem {
  public id:string;
  public text:string;
  public children:Array<SelectivityItem>;
  public parent:SelectivityItem;
  public subMenu:SelectivitySubMenu;

  constructor(source:any) {
    if (typeof source === 'string') {
      this.id = this.text = source;
    }

    if (typeof source === 'object') {
      if (source.id && source.text) {
        this.id = source.id;
        this.text = source.text;
      }

      if (source.children && source.text) {
        this.children = source.children.map(c => {
          let r:SelectivityItem = new SelectivityItem(c);
          r.parent = this;
          return r;
        });
        this.text = source.text;
      }

      if (source.submenu) {
        this.subMenu = new SelectivitySubMenu(source.submenu, this);
      }
    }
  }

  public hasChildren():boolean {
    return this.children && this.children.length > 0;
  }
}
