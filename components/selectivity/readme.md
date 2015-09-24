### Usage
```typescript
import {selectivity} from 'ng2-selectivity';
```

### Annotations
```typescript
// class Selectivity
@Component({
  selector: 'ng2-selectivity',
  properties: [
    'allowClear',
    'placeholder',
    'items',
    'multiple',
    'showSearchInputInDropdown']
})
```

### Selectivity properties

  - `items` - (`Array<any>`) - Array of items from which to select. Should be an array of objects with `id` and `text` properties.
  As convenience, you may also pass an array of strings, in which case the same string is used for both the ID and the text.
  Items may be nested by adding a `children` property to any item, whose value should be another array of items. Items that have children may omit having an ID.
  If `items` are specified, all items are expected to be available locally and all selection operations operate on this local array only.
  If omitted, items are not available locally, and the `query` option should be provided to fetch data.
  - `allowClear` (`?boolean=false`) (*not yet supported*) - Set to `true` to allow the selection to be cleared. This option only applies to single-value inputs.
  - `placeholder` (`?string=''`) - Placeholder text to display when the element has no focus and selected items.
  - `multiple` - (`?boolean=false`) - Mode of this component. If set `true` user can select more than one option.
  - `showSearchInputInDropdown` - (`?boolean=true`) (*not yet supported*) - Set to `false` to remove the search input used in dropdowns.
  This option only applies to single-value inputs, as multiple-value inputs don't have the search input in the dropdown to begin with.
