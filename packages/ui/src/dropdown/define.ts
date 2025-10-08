import type { VueNode } from '@v-c/util/dist/type'
import type { ButtonProps } from '../button'
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
  /**
   * Context menu behavior mode
   * - 'follow': Menu follows mouse position on right-click
   * - undefined/false: Menu appears at trigger element (default)
   */
  contextMenuMode?: 'follow' | false
}

export interface DropdownEmits {
  openChange: [open: boolean, info: { source: 'trigger' | 'menu' }]
  'update:open': [open: boolean]
}

export interface DropdownSlots {
  default?: () => any
  overlay?: () => any
}

export type DropdownButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text'

export interface DropdownButtonProps extends DropdownProps {
  type?: DropdownButtonType
  danger?: boolean
  disabled?: boolean
  loading?: ButtonProps['loading']
  htmlType?: ButtonProps['htmlType']
  href?: string
  title?: string
  icon?: VueNode | (() => VueNode)
  buttonsRender?: (buttons: VueNode[]) => VueNode[]
  size?: ButtonProps['size']
}

export interface DropdownButtonEmits {
  click: [e: MouseEvent]
  openChange: [open: boolean, info: { source: 'trigger' | 'menu' }]
  'update:open': [open: boolean]
}

export interface DropdownButtonSlots {
  default?: () => any
  icon?: () => any
  overlay?: () => any
}
