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
      this.id = source.id || source.text;
      this.text = source.text;

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

  public getSimilar():SelectivityItem {
    let r:SelectivityItem = new SelectivityItem(false);
    r.id = this.id;
    r.text = this.text;
    r.parent = this.parent;
    return r;
  }
}
