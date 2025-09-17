import type { CSSProperties } from 'vue'
import type { SizeType } from '../config-provider/context'

export interface FlexProps {
  prefixCls?: string
  rootClassName?: string
  vertical?: boolean
  wrap?: CSSProperties['flexWrap'] | boolean
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
  flex?: CSSProperties['flex']
  gap?: CSSProperties['gap'] | SizeType
  componentTag?: any
}

export const flexDefaultProps = {
  prefixCls: 'ant-flex',
  componentTag: 'div',
} as const
