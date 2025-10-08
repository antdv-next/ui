import type { VueNode } from '@v-c/util/dist/type'
import type { ComputedRef, InjectionKey } from 'vue'
import type { MenuMode } from './define'
import { computed, inject, provide } from 'vue'

export interface MenuOverrideContext {
  prefixCls: ComputedRef<string | undefined>
  expandIcon: ComputedRef<VueNode | ((info: { isOpen: boolean, disabled: boolean, level: number }) => VueNode) | undefined>
  mode: ComputedRef<MenuMode | undefined>
  selectable: ComputedRef<boolean | undefined>
  onClick?: () => void
  rootClassName: ComputedRef<string | undefined>
}

const MenuOverrideContextKey: InjectionKey<MenuOverrideContext> = Symbol('MenuOverrideContextKey')

export function useProvideMenuOverride(
  prefixCls?: string,
  expandIcon?: VueNode | ((info: { isOpen: boolean, disabled: boolean, level: number }) => VueNode),
  mode?: MenuMode,
  selectable?: boolean,
  onClick?: () => void,
  rootClassName?: string,
) {
  const context: MenuOverrideContext = {
    prefixCls: computed(() => prefixCls),
    expandIcon: computed(() => expandIcon),
    mode: computed(() => mode),
    selectable: computed(() => selectable),
    onClick,
    rootClassName: computed(() => rootClassName),
  }

  provide(MenuOverrideContextKey, context)
  return context
}

const defaultOverrideContext: MenuOverrideContext = {
  prefixCls: computed(() => undefined),
  expandIcon: computed(() => undefined),
  mode: computed(() => undefined),
  selectable: computed(() => undefined),
  onClick: undefined,
  rootClassName: computed(() => undefined),
}

export function useMenuOverride() {
  return inject(MenuOverrideContextKey, defaultOverrideContext)
}
