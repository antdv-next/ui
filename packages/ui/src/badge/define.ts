import type { CSSProperties } from 'vue'
import type { PresetStatusColorType } from '../_utils/colors'
import type { LiteralUnion } from '../_utils/type'
import type { PresetColorKey } from '../theme/interface'
// 假设 PresetStatusColorType 是一个特定的字符串联合类型

export interface BadgeProps {
  /** Number to show in badge */
  count?: number | null
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
