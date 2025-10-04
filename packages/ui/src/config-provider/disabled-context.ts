import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { inject, provide, ref } from 'vue'

export interface DisabledContextProps {
  disabled?: Ref<boolean> | ComputedRef<boolean>
}
const DisabledContext: InjectionKey<DisabledContextProps> = Symbol('DisabledContext')

export function useDisabledProvide(props: DisabledContextProps) {
  provide(DisabledContext, props)
}
export function useDisabled() {
  return inject(DisabledContext, { disabled: ref() })
}
