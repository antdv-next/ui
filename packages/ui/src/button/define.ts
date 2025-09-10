import type { VNodeChild } from 'vue'
import type { SizeType } from '../_utils/size.ts'
import type { ButtonColorType, ButtonHTMLType, ButtonShape, ButtonType, ButtonVariantType } from './buttonHelpers.ts'

export interface BaseButtonProps {
  type?: ButtonType
  color?: ButtonColorType
  variant?: ButtonVariantType
  iconPosition?: 'start' | 'end'
  shape?: ButtonShape
  size?: SizeType
  icon?: VNodeChild
  disabled?: boolean
  loading?: boolean | { delay?: number, icon?: VNodeChild }
  prefixCls?: string
  className?: string
  rootClassName?: string
  ghost?: boolean
  danger?: boolean
  block?: boolean
  [key: `data-${string}`]: string
}

/**
 * Button component definition.
 */

export interface ButtonProps extends BaseButtonProps {
  href?: string
  htmlType?: ButtonHTMLType
  autoInsertSpace?: boolean
}

/**
 * Button slots interface.
 */
export interface ButtonSlots {
  icon?: () => any
  default?: () => any
}

export interface ButtonEvents {
  click?: [MouseEvent]
}

export type ColorVariantPairType = [color?: ButtonColorType, variant?: ButtonVariantType]

export const ButtonTypeMap: Partial<Record<ButtonType, ColorVariantPairType>> = {
  default: ['default', 'outlined'],
  primary: ['primary', 'solid'],
  dashed: ['default', 'dashed'],
  // `link` is not a real color but we should compatible with it
  link: ['link' as any, 'link'],
  text: ['default', 'text'],
}
