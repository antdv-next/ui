import type { VueNode } from '@v-c/util/dist/type'
import type { CSSProperties } from 'vue'
import type { PresetColorType } from '../_utils/colors.ts'
import type { LiteralUnion } from '../_utils/type.ts'

export type ActionType = 'hover' | 'focus' | 'click' | 'contextMenu'

export type TooltipPlacement
  = | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'

type SemanticName = 'root' | 'body'

export interface TooltipAlignConfig {
  points?: [string, string]
  offset?: [number | string, number | string]
  targetOffset?: [number | string, number | string]
  overflow?: { adjustX: boolean, adjustY: boolean }
  useCssRight?: boolean
  useCssBottom?: boolean
  useCssTransform?: boolean
}

export interface TooltipProps {
  prefixCls?: string
  // Basic props
  trigger?: ActionType | ActionType[]
  open?: boolean
  defaultOpen?: boolean
  afterOpenChange?: (open: boolean) => void
  /**
   * @private This is an internal property used to determine if the tooltip has an inner element.
   */
  hasInner?: boolean

  // Layout & positioning
  placement?: TooltipPlacement
  align?: TooltipAlignConfig

  // Style & appearance
  styles?: Partial<Record<SemanticName, CSSProperties>>
  classNames?: Partial<Record<SemanticName, string>>
  rootClassName?: string | Record<string, any>
  color?: LiteralUnion<PresetColorType>
  overlayStyle?: CSSProperties
  overlayInnerStyle?: CSSProperties
  overlayClassName?: string | Record<string, any>

  // Arrow
  arrow?: boolean | { pointAtCenter?: boolean, arrowPointAtCenter?: boolean }
  arrowPointAtCenter?: boolean

  // Behavior
  autoAdjustOverflow?: boolean | { adjustX?: boolean, adjustY?: boolean }
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  destroyOnHidden?: boolean
  destroyTooltipOnHide?: boolean | { keepParent?: boolean }
  builtinPlacements?: Record<string, any>

  // Content
  title?: VueNode | (() => VueNode)
  overlay?: VueNode | (() => VueNode)

  // Animation & timing
  transitionName?: string
  mouseEnterDelay?: number
  mouseLeaveDelay?: number

  // Advanced
  zIndex?: number
  fresh?: boolean
  openClassName?: string

  // Legacy support (deprecated but compatible)
  /** @deprecated Please use `open` instead. */
  visible?: boolean
  /** @deprecated Please use `defaultOpen` instead. */
  defaultVisible?: boolean
  /** @deprecated Please use `afterOpenChange` instead. */
  afterVisibleChange?: (visible: boolean) => void
}

export interface TooltipRef {
  /** Force popup to align */
  forceAlign: () => void
  /** Wrapped dom element */
  nativeElement: HTMLElement | null
  /** Popup dom element */
  popupElement: HTMLDivElement | null

  /** @deprecated Please use `forceAlign` instead */
  forcePopupAlign?: () => void
}

export interface TooltipExpose extends TooltipRef {}

export interface TooltipEmits {
  'update:open': [boolean]
  'openChange': [boolean]
  // Legacy
  'update:visible': [boolean]
  'visibleChange': [boolean]
}

export interface TooltipSlots {
  title?: () => any
  default?: () => any
  overlay?: () => any
}
