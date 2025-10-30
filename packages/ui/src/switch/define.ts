import type { VueNode } from '@v-c/util/dist/type'

type CheckedType = string | number | boolean
type FocusEventHandler = (e: FocusEvent) => void
type SwitchSize = 'small' | 'default'

export interface SwitchProps {
  id?: string
  prefixCls?: string
  size?: SwitchSize
  disabled?: boolean
  checkedChildren?: VueNode
  unCheckedChildren?: VueNode
  tabindex?: string | number
  autofocus?: boolean
  loading?: boolean
  checked?: string | number | boolean
  checkedValue?: string | number | boolean
  unCheckedValue?: string | number | boolean

  onChange?: (e: Event) => void
  onClick?: (e: Event) => void
  onKeydown?: (e: Event) => void
  onMouseup?: (e: Event) => void
  'onUpdate:checked'?: (checked: CheckedType) => void
  onBlur?: FocusEventHandler
  onFocus?: FocusEventHandler
}
