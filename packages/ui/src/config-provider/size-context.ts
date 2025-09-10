import type { InjectionKey, Ref } from 'vue'
import { inject, provide, ref } from 'vue'
import { generateKey } from '../_utils/env.ts'

export type SizeType = 'small' | 'middle' | 'large' | undefined

const SizeContext: InjectionKey<SizeContextProps> = generateKey('SizeContext')

export interface SizeContextProps {
  size?: Ref<SizeType>
}

export function useSizeProvider(props: SizeContextProps) {
  provide(SizeContext, props)
}

export function useSize() {
  return inject(SizeContext, { size: ref<SizeType>() } as SizeContextProps)
}
