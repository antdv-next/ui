import type { Ref } from 'vue'
import type { DirectionType } from '../config-provider/context'

import type { SizeType } from '../types'
import { isEmpty } from 'es-toolkit/compat'
import { computed } from 'vue'
import { classNames } from '../_utils/classNames'
import createContext from '../_utils/createContext'

export type SpaceSize = SizeType | number

export interface SpaceProps {
  prefixCls?: string
  size?: SpaceSize | [SpaceSize, SpaceSize]
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'end' | 'center' | 'baseline'
  wrap?: boolean
}

export interface SpaceCompactProps {
  prefixCls?: string
  size?: SizeType
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'center' | 'end' | 'baseline'
  block?: boolean
}

export interface SpaceCompactItemProps {
  compactSize?: SizeType
  compactDirection?: 'horizontal' | 'vertical'
  isFirstItem?: boolean
  isLastItem?: boolean
}

export type SpaceCompactItemContextType = Partial<SpaceCompactItemProps>

export const SpaceCompactItemContext = createContext<SpaceCompactItemContextType>(null)

export function useCompactItemContext(prefixCls: Ref<string>, direction: Ref<DirectionType>) {
  const compactItemContext = SpaceCompactItemContext.useInject()

  const compactItemClassnames = computed(() => {
    if (!compactItemContext || isEmpty(compactItemContext))
      return ''

    const { compactDirection, isFirstItem, isLastItem } = compactItemContext
    const separator = compactDirection === 'vertical' ? '-vertical-' : '-'

    return classNames({
      [`${prefixCls.value}-compact${separator}item`]: true,
      [`${prefixCls.value}-compact${separator}first-item`]: isFirstItem,
      [`${prefixCls.value}-compact${separator}last-item`]: isLastItem,
      [`${prefixCls.value}-compact${separator}item-rtl`]: direction.value === 'rtl',
    })
  })

  return {
    compactSize: computed(() => compactItemContext?.compactSize),
    compactDirection: computed(() => compactItemContext?.compactDirection),
    compactItemClassnames,
  }
}
