import type { Ref } from 'vue'
import type { LayoutContextProps } from './define'
import { computed, inject, provide } from 'vue'
import createContext from '../_utils/createContext'
import { generateKey } from '../_utils/env.ts'

const defaultContext: LayoutContextProps = {
  siderHook: {
    addSider: () => undefined,
    removeSider: () => undefined,
  },
}

const LayoutContext = createContext<LayoutContextProps>(defaultContext)

export const useLayoutContext = LayoutContext.useInject
export const useProvideLayoutContext = LayoutContext.useProvide

export interface SiderContextProps {
  siderCollapsed?: Ref<boolean>
}

export const LayoutSiderKey = generateKey('LayoutSiderKey')

export function useProviderLayoutSider(context: SiderContextProps) {
  provide(LayoutSiderKey, context)
}

export function useLayoutSider() {
  return inject(LayoutSiderKey, {
    siderCollapsed: computed(() => false),
  })
}
