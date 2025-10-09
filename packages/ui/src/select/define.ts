import type { CSSProperties, VNode } from 'vue'
import type { TooltipPlacement } from '../tooltip'

export type RawValue = string | number

export interface LabeledValue {
  key?: string
  value: RawValue
  label?: VNode | string
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined

export interface BaseOptionType {
  disabled?: boolean
  [name: string]: any
}

export interface DefaultOptionType extends BaseOptionType {
  label?: VNode | string
  value?: string | number
  children?: Omit<DefaultOptionType, 'children'>[]
}

export type SelectCommonPlacement = TooltipPlacement

export interface SelectProps<
  ValueType = any,
  OptionType extends BaseOptionType = DefaultOptionType,
> {
  prefixCls?: string
  id?: string

  // Value
  value?: ValueType
  defaultValue?: ValueType
  labelInValue?: boolean

  // Search
  searchValue?: string
  inputValue?: string
  showSearch?: boolean
  autoClearSearchValue?: boolean
  filterOption?: boolean | ((inputValue: string, option?: OptionType) => boolean)
  filterSort?: (optionA: OptionType, optionB: OptionType) => number
  optionFilterProp?: string
  onSearch?: (value: string) => void

  // Options
  options?: OptionType[]
  fieldNames?: {
    value?: string
    label?: string
    options?: string
  }
  optionLabelProp?: string
  optionRender?: (option: OptionType, info: { index: number }) => VNode | string

  // Display
  mode?: 'multiple' | 'tags'
  disabled?: boolean
  loading?: boolean
  placeholder?: string | VNode
  maxTagCount?: number | 'responsive'
  maxTagPlaceholder?: VNode | ((omittedValues: any[]) => VNode)
  maxTagTextLength?: number
  tagRender?: (props: {
    label: any
    value: any
    disabled: boolean
    onClose: (event?: MouseEvent) => void
    closable: boolean
  }) => VNode
  labelRender?: (props: LabeledValue) => VNode

  // Clear
  allowClear?: boolean | { clearIcon?: VNode }
  clearIcon?: VNode

  // Icons
  suffixIcon?: VNode
  removeIcon?: VNode
  menuItemSelectedIcon?: VNode

  // Size & Variant
  size?: 'large' | 'middle' | 'small'
  variant?: 'outlined' | 'borderless' | 'filled'
  status?: 'error' | 'warning'

  // Popup
  open?: boolean
  defaultOpen?: boolean
  placement?: SelectCommonPlacement
  popupClassName?: string
  popupMatchSelectWidth?: boolean | number
  popupStyle?: CSSProperties
  popupRender?: (menu: VNode) => VNode
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  virtual?: boolean
  listHeight?: number
  listItemHeight?: number

  // Behavior
  autoFocus?: boolean
  defaultActiveFirstOption?: boolean
  notFoundContent?: VNode
  tokenSeparators?: string[]

  // Accessibility
  tabIndex?: number

  // Prefix
  prefix?: VNode

  // Multiple
  maxCount?: number

  // Semantic class & style
  rootClassName?: string
  popupRootClassName?: string
  styles?: {
    root?: CSSProperties
    popup?: {
      root?: CSSProperties
    }
  }
  classNames?: {
    root?: string
    popup?: {
      root?: string
    }
  }
}

export interface SelectEmits<ValueType = any, OptionType extends BaseOptionType = DefaultOptionType> {
  (e: 'update:value', value: ValueType): void
  (e: 'update:open', open: boolean): void
  (e: 'update:searchValue', value: string): void
  (e: 'change', value: ValueType, option: OptionType | OptionType[]): void
  (e: 'select', value: RawValue, option: OptionType): void
  (e: 'deselect', value: RawValue, option: OptionType): void
  (e: 'search', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'openChange', open: boolean): void
  (e: 'inputKeyDown', event: KeyboardEvent): void
  (e: 'popupScroll', event: UIEvent): void
}

export interface OptionProps {
  value?: string | number
  label?: string | VNode
  disabled?: boolean
  title?: string
}

export interface OptGroupProps {
  label?: string | VNode
  key?: string
  title?: string
}

export interface SelectRef {
  focus: () => void
  blur: () => void
  scrollTo: (arg: number | { index?: number, key?: string | number, align?: 'top' | 'bottom' | 'auto' }) => void
}
