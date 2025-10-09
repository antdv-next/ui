# Select Component

A Vue 3 implementation of the Ant Design Select component.

## Features

- ✅ Single selection mode
- ✅ Multiple selection mode
- ✅ Tags mode
- ✅ Search functionality
- ✅ Custom filter options
- ✅ Size variants (large, middle, small)
- ✅ Style variants (outlined, filled, borderless)
- ✅ Status states (error, warning)
- ✅ Disabled state
- ✅ Loading state
- ✅ Allow clear
- ✅ Custom prefix
- ✅ Custom icons (suffix, clear, remove, menuItemSelected)
- ✅ Placeholder support
- ✅ Virtual scrolling
- ✅ Custom option rendering
- ✅ Custom tag rendering
- ✅ Label rendering
- ✅ Placement options (with correct slide animations)
- ✅ Popup customization
- ✅ **Width matching - dropdown matches select width by default**
- ✅ **Smooth animations - slide-up for bottom, slide-down for top**
- ✅ RTL support

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import { Select } from 'antdv-next'
import { ref } from 'vue'

const value = ref<string>()

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
]
</script>

<template>
  <Select
    v-model:value="value"
    placeholder="Please select"
    :options="options"
  />
</template>
```

### Multiple Selection

```vue
<script setup lang="ts">
import { Select } from 'antdv-next'
import { ref } from 'vue'

const value = ref<string[]>([])

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
]
</script>

<template>
  <Select
    v-model:value="value"
    mode="multiple"
    placeholder="Please select"
    :options="options"
  />
</template>
```

### With Search

```vue
<script setup lang="ts">
import { Select } from 'antdv-next'
import { ref } from 'vue'

const value = ref<string>()

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
]

function filterOption(input: string, option: any) {
  return option.label.toLowerCase().includes(input.toLowerCase())
}
</script>

<template>
  <Select
    v-model:value="value"
    show-search
    placeholder="Search to select"
    :options="options"
    :filter-option="filterOption"
  />
</template>
```

### Sizes

```vue
<template>
  <div>
    <Select size="large" :options="options" />
    <Select size="middle" :options="options" />
    <Select size="small" :options="options" />
  </div>
</template>
```

### Variants

```vue
<template>
  <div>
    <Select variant="outlined" :options="options" />
    <Select variant="filled" :options="options" />
    <Select variant="borderless" :options="options" />
  </div>
</template>
```

### Status

```vue
<template>
  <div>
    <Select status="error" :options="options" />
    <Select status="warning" :options="options" />
  </div>
</template>
```

## API

### Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value / v-model:value | Current selected value | `string \| number \| array` | - |
| options | Data source for options | `OptionType[]` | `[]` |
| mode | Mode of Select | `'multiple' \| 'tags'` | - |
| placeholder | Placeholder text | `string \| VNode` | - |
| disabled | Whether disabled | `boolean` | `false` |
| loading | Show loading icon | `boolean` | `false` |
| allowClear | Show clear button | `boolean \| { clearIcon?: VNode }` | `false` |
| showSearch | Whether select is searchable | `boolean` | `false` (single), `true` (multiple) |
| size | Size of select | `'large' \| 'middle' \| 'small'` | `'middle'` |
| variant | Style variant | `'outlined' \| 'filled' \| 'borderless'` | `'outlined'` |
| status | Validation status | `'error' \| 'warning'` | - |
| placement | Placement of dropdown | `TooltipPlacement` | `'bottomLeft'` |
| open / v-model:open | Whether dropdown is open | `boolean` | - |
| defaultOpen | Initial open state | `boolean` | `false` |
| filterOption | Custom filter logic | `boolean \| function` | `true` |
| filterSort | Sort filtered options | `function` | - |
| optionFilterProp | Which prop to filter by | `string` | `'label'` |
| optionLabelProp | Which prop to display | `string` | `'label'` |
| optionRender | Custom option rendering | `function` | - |
| tagRender | Custom tag rendering | `function` | - |
| labelRender | Custom label rendering | `function` | - |
| maxCount | Max selected items (multiple) | `number` | - |
| maxTagCount | Max tags to show | `number \| 'responsive'` | - |
| maxTagPlaceholder | Placeholder for hidden tags | `VNode \| function` | - |
| maxTagTextLength | Max length of tag text | `number` | - |
| prefix | Custom prefix | `VNode` | - |
| suffixIcon | Custom suffix icon | `VNode` | - |
| clearIcon | Custom clear icon | `VNode` | - |
| removeIcon | Custom remove icon | `VNode` | - |
| menuItemSelectedIcon | Custom selected icon | `VNode` | - |
| notFoundContent | Content when no data | `VNode` | `'No Data'` |
| virtual | Enable virtual scroll | `boolean` | `true` |
| listHeight | Height of dropdown | `number` | `256` |
| listItemHeight | Height of each item | `number` | `24` |
| popupClassName | Dropdown class name | `string` | - |
| popupMatchSelectWidth | Match dropdown width | `boolean \| number` | `true` |
| popupStyle | Dropdown style | `CSSProperties` | - |
| popupRender | Custom dropdown render | `function` | - |
| getPopupContainer | Container for dropdown | `function` | - |
| autoClearSearchValue | Clear search on select | `boolean` | `true` |
| defaultActiveFirstOption | Active first option | `boolean` | `true` |
| tokenSeparators | Token separators for tags | `string[]` | - |
| autoFocus | Auto focus | `boolean` | `false` |
| tabIndex | Tab index | `number` | - |

### Emits

| Event | Description | Parameters |
|-------|-------------|------------|
| update:value | Triggered when value changes | `(value: ValueType)` |
| update:open | Triggered when open state changes | `(open: boolean)` |
| update:searchValue | Triggered when search value changes | `(value: string)` |
| change | Triggered on value change | `(value: ValueType, option: OptionType \| OptionType[])` |
| select | Triggered on option select | `(value: RawValue, option: OptionType)` |
| deselect | Triggered on option deselect | `(value: RawValue, option: OptionType)` |
| search | Triggered on search | `(value: string)` |
| blur | Triggered on blur | `(event: FocusEvent)` |
| focus | Triggered on focus | `(event: FocusEvent)` |
| clear | Triggered on clear | `()` |
| openChange | Triggered when dropdown opens/closes | `(open: boolean)` |
| inputKeyDown | Triggered on input keydown | `(event: KeyboardEvent)` |
| popupScroll | Triggered on popup scroll | `(event: UIEvent)` |

### Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| focus | Focus the select | `()` |
| blur | Blur the select | `()` |
| scrollTo | Scroll to specific option | `(arg: number \| { index?: number, key?: string \| number, align?: 'top' \| 'bottom' \| 'auto' })` |

## Notes

- Deprecated props from Ant Design React (like `dropdownClassName`, `bordered`, `showArrow`) are not included
- Event handlers are implemented as emits, not props (Vue convention)
- `className` and `style` are handled via `$attrs` and don't need separate props
- Uses Tooltip component for dropdown functionality
- Follows Vue 3 Composition API with `<script setup>` syntax
- Fully typed with TypeScript generics for value and option types
