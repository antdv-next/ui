import type { VueNode } from '@v-c/util/dist/type'
import type { ButtonProps } from '../button'
import type { LegacyButtonType } from '../button/buttonHelpers'
import type { PopoverProps, PopoverRef } from '../popover'
import type { PopoverEmits } from '../popover/define'

export interface PopconfirmProps extends Omit<PopoverProps, 'title' | 'content'> {
  title?: VueNode | (() => VueNode)
  description?: VueNode | (() => VueNode)
  disabled?: boolean
  onConfirm?: (e: MouseEvent) => void
  onCancel?: (e: MouseEvent) => void
  okText?: VueNode | (() => VueNode)
  okType?: LegacyButtonType
  cancelText?: VueNode | (() => VueNode)
  okButtonProps?: Partial<ButtonProps>
  cancelButtonProps?: Partial<ButtonProps>
  showCancel?: boolean
  icon?: VueNode | (() => VueNode)
  onVisibleChange?: (visible: boolean) => void
  onPopupClick?: (event: MouseEvent) => void
}

export interface PopconfirmSlots {
  default?: () => any
  icon?: () => any
  title?: () => any
  description?: () => any
  cancelText?: () => any
  okText?: () => any
}

export interface PopconfirmEmits extends PopoverEmits {
  confirm: [MouseEvent]
  cancel: [MouseEvent]
}

export type PopconfirmRef = PopoverRef

export interface PopconfirmLocale {
  okText: string
  cancelText: string
}

export interface OverlayProps
  extends Pick<
    PopconfirmProps,
    | 'icon'
    | 'okButtonProps'
    | 'cancelButtonProps'
    | 'cancelText'
    | 'okText'
    | 'okType'
    | 'showCancel'
    | 'title'
    | 'description'
    | 'onPopupClick'
  > {
  prefixCls: string
  close?: (...args: any[]) => void
  onConfirm?: (event: MouseEvent) => void
  onCancel?: (event: MouseEvent) => void
}
