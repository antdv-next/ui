import type { CSSProperties } from 'vue'
import type { PresetStatusColorType } from '../_utils/colors'
import type { LiteralUnion } from '../_utils/type'
import type { PresetColorKey, PresetColorType } from '../theme/interface'

export interface BadgeProps {
  /** Number to show in badge */
  count?: number | string | null
  showZero?: boolean
  /** Max count to show */
  overflowCount?: number
  /** whether to show red dot without number */
  dot?: boolean
  prefixCls?: string
  scrollNumberPrefixCls?: string
  status?: PresetStatusColorType
  size?: 'default' | 'small'
  color?: LiteralUnion<PresetColorKey>
  text?: any
  offset?: [number | string, number | string]
  numberStyle?: CSSProperties
  title?: string
}

export interface UnitNumberProps {
  prefixCls: string
  value: string | number
  offset?: number
  current?: boolean
}

export interface SingleNumberProps {
  prefixCls?: string
  value?: string
  count?: number | string
}

export interface ScrollNumberProps {
  prefixCls?: string
  count?: number | string | null
  component?: string
  title?: string | number
  show?: boolean
  style?: string | CSSProperties
  class?: string | Record<string, unknown>
}

export interface RibbonProps {
  prefixCls?: string
  color?: LiteralUnion<keyof PresetColorType>
  text?: string
  placement?: 'start' | 'end'
}
