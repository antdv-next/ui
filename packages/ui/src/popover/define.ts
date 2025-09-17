import type { VueNode } from '@v-c/util/dist/type'
import type { TooltipEmits, TooltipProps, TooltipRef } from '../tooltip'

export interface PopoverProps extends Omit<TooltipProps, 'title' | 'overlay'> {
  prefixCls?: string
  title?: VueNode | (() => VueNode)
  content?: VueNode | (() => VueNode)
  onOpenChange?: (open: boolean) => void
}

export interface PopoverSlots {
  default?: () => any
  title?: () => any
  content?: () => any
}

export type PopoverRef = TooltipRef

export interface PopoverEmits extends TooltipEmits {}
