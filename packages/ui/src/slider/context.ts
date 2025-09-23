import type { SliderProps as VcSliderProps } from '@v-c/slider'
import type { InjectionKey } from 'vue'
import type { DirectionType } from '../config-provider/context.ts'
import { inject, provide } from 'vue'

export interface SliderInternalContextProps {
  handleRender?: VcSliderProps['handleRender']
  direction?: DirectionType
}
const SliderInternalContext: InjectionKey<any> = Symbol('SliderInternalContext')

export function useProvideSliderInternal(props: SliderInternalContextProps) {
  provide(SliderInternalContext, props)
}

export function useInjectSliderInternal() {
  return inject(SliderInternalContext)
}
