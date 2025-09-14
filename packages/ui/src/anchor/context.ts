import type { InjectionKey } from 'vue'
import type { AntAnchor } from './define.ts'
import { inject, provide } from 'vue'
import { generateKey } from '../_utils/env.ts'

export const AnchorContext: InjectionKey<AntAnchor> = generateKey('AnchorContext')

export function useAnchorProvider(value: AntAnchor) {
  provide(AnchorContext, value)
}

export function useAnchorContext() {
  return inject(AnchorContext, {} as AntAnchor)
}
