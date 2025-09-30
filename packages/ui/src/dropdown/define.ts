import type { VueNode } from '@v-c/util/dist/type'
import type { CSSProperties } from 'vue'
import type { ButtonProps } from '../button'
import type { ButtonHTMLType } from '../button/buttonHelpers.ts'
import type { SizeType } from '../config-provider/size-context'
import type { MenuEmits, MenuProps } from '../menu'
import type { Key } from '../menu/define'
import type { TooltipAlignConfig, TooltipProps } from '../tooltip'

export type DropdownTriggerType = 'click' | 'hover' | 'contextMenu'

export type DropdownPlacement
  = | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'

export interface DropdownArrowOptions {
  pointAtCenter?: boolean
}

export interface DropdownMenuProps extends MenuProps {
  activeKey?: MenuProps['activeKey']
  onClick?: MenuEmits['click'][0] extends infer T ? (info: T) => void : (info: any) => void
  onOpenChange?: MenuEmits['openChange'][0] extends infer T ? (openKeys: T) => void : (openKeys: any) => void
}

export interface DropdownProps {
  menu?: DropdownMenuProps
  autoFocus?: boolean
  arrow?: boolean | DropdownArrowOptions
  trigger?: DropdownTriggerType | DropdownTriggerType[]
  dropdownRender?: (originNode: VueNode) => VueNode
  popupRender?: (originNode: VueNode) => VueNode
  onOpenChange?: (open: boolean, info: { source: 'trigger' | 'menu' }) => void
  open?: boolean
  disabled?: boolean
  destroyPopupOnHide?: boolean
  destroyOnHidden?: boolean
  align?: TooltipAlignConfig
  getPopupContainer?: TooltipProps['getPopupContainer']
  prefixCls?: string
  className?: string
  rootClassName?: string
  transitionName?: string
  placement?: DropdownPlacement
  overlayClassName?: string
  overlayStyle?: CSSProperties
  forceRender?: boolean
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  openClassName?: string
  autoAdjustOverflow?: TooltipProps['autoAdjustOverflow']
  overlay?: VueNode | (() => VueNode)
  visible?: boolean
  onVisibleChange?: (open: boolean) => void
}

export interface DropdownSlots {
  default?: () => any
  overlay?: () => any
}

export interface DropdownEmits {
  'update:open': [boolean]
  'openChange': [boolean, { source: 'trigger' | 'menu' }]
  'update:visible': [boolean]
  'visibleChange': [boolean]
}

export interface DropdownExpose {
  nativeElement: HTMLElement | null
  popupElement: HTMLElement | null
  forceAlign: () => void
}

export type DropdownButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text'

export interface DropdownButtonProps extends DropdownProps {
  type?: DropdownButtonType
  htmlType?: ButtonHTMLType
  danger?: boolean
  disabled?: boolean
  loading?: ButtonProps['loading']
  onClick?: (event: MouseEvent) => void
  icon?: VueNode
  href?: string
  title?: string
  buttonsRender?: (buttons: VueNode[]) => VueNode[]
  size?: SizeType
  block?: boolean
}

export interface DropdownOverlayProps {
  prefixCls: string
  onItemClick?: (info: DropdownItemClickInfo) => void
  role?: string
}

export interface DropdownItemProps {
  eventKey?: Key
  danger?: boolean
  disabled?: boolean
  icon?: VueNode | (() => VueNode)
}

export interface DropdownItemSlots {
  default?: () => any
  extra?: () => any
  icon?: () => any
}

export interface DropdownItemClickInfo {
  key?: Key
  event: MouseEvent
}

export interface DropdownItemEmits {
  click: [
    {
      key?: Key
      domEvent: MouseEvent
    },
  ]
}
