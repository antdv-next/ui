import type { VueNode } from '@v-c/util/dist/type'
import type { MenuProps } from '../menu'
import type { TooltipPlacement } from '../tooltip'

export interface DropdownArrowOptions {
  pointAtCenter?: boolean
}

export interface DropdownProps {
  prefixCls?: string
  menu?: MenuProps & { activeKey?: string }
  autoFocus?: boolean
  arrow?: boolean | DropdownArrowOptions
  trigger?: ('click' | 'hover' | 'contextMenu')[]
  popupRender?: (originNode: VueNode) => VueNode
  open?: boolean
  disabled?: boolean
  destroyOnHidden?: boolean
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  rootClassName?: string
  transitionName?: string
  placement?: TooltipPlacement
  overlayClassName?: string | Record<string, any>
  overlayStyle?: Record<string, any>
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  openClassName?: string
  autoAdjustOverflow?: boolean | { adjustX?: boolean, adjustY?: boolean }
}

export interface DropdownEmits {
  openChange: [open: boolean, info: { source: 'trigger' | 'menu' }]
  'update:open': [open: boolean]
}

export interface DropdownSlots {
  default?: () => any
  overlay?: () => any
}
