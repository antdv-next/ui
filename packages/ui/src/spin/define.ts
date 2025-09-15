import type { VNode } from 'vue'
import { isNaN } from 'es-toolkit/compat'
import { h } from 'vue'

export type SpinSize = 'small' | 'default' | 'large'

export interface SpinProps {
  prefixCls: string
  spinning?: boolean
  size: SpinSize
  warapperClassName: string
  tip: VNode // fixed: fix types
  delay: number
  indicator: VNode
}

export function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !isNaN(Number(delay))
}

export const defaultIndicator: { value: null | (() => VNode) } = { value: null }

export function setDefaultIndicator(Content: any) {
  const Indicator = Content.indicator
  defaultIndicator.value = typeof Indicator === 'function' ? Indicator : () => h(Indicator)
}
