import type { VueNode } from '@v-c/util/dist/type'
import type { CSSProperties } from 'vue'
import type { SizeType } from '../config-provider/size-context.ts'
import type { ButtonColorType, ButtonHTMLType, ButtonShape, ButtonType, ButtonVariantType } from './buttonHelpers.ts'

export interface BaseButtonProps {
  type?: ButtonType
  color?: ButtonColorType
  variant?: ButtonVariantType
  iconPosition?: 'start' | 'end'
  shape?: ButtonShape
  size?: SizeType
  icon?: VueNode | (() => VueNode)
  disabled?: boolean
  loading?: boolean | { delay?: number, icon?: VueNode | (() => VueNode) }
  prefixCls?: string
  className?: string
  rootClassName?: string
  ghost?: boolean
  danger?: boolean
  block?: boolean
  [key: `data-${string}`]: string
  classNames?: { icon: string }
  styles?: { icon: CSSProperties }
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
  loadingIcon?: () => any
  default?: () => any
}

export interface ButtonEvents {
  click: [Event]
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

export interface DefaultLoadingIconProps {
  prefixCls: string
  existIcon: boolean
  loading?: boolean | object
  mount: boolean
}
export interface LoadingConfigType {
  loading: boolean
  delay: number
}

export function getLoadingConfig(loading: BaseButtonProps['loading']): LoadingConfigType {
  if (typeof loading === 'object' && loading) {
    let delay = loading?.delay
    delay = !Number.isNaN(delay) && typeof delay === 'number' ? delay : 0
    return {
      loading: delay <= 0,
      delay,
    }
  }

  return {
    loading: !!loading,
    delay: 0,
  }
}
