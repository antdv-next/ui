import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { Key, MenuMode, MenuTheme, TriggerSubMenuAction } from './define.ts'
import { computed, inject, provide } from 'vue'

export interface MenuContextProps {
  prefixCls: Ref<string>
  mode: Ref<MenuMode>
  theme: Ref<MenuTheme>
  inlineIndent: Ref<number>
  inlineCollapsed: Ref<boolean>
  selectable: Ref<boolean>
  multiple: Ref<boolean>
  triggerSubMenuAction: Ref<TriggerSubMenuAction>
  expandIcon: ComputedRef<((info: { isOpen: boolean, disabled: boolean, level: number }) => any) | any>
  openDelay: Ref<number>
  closeDelay: Ref<number>
  openKeys: Ref<Set<Key>>
  selectedKeys: Ref<Set<Key>>
  openSelectedKeySet: Ref<Set<Key>>
  level: Ref<number>
  parentPath: Ref<Key[]>
  onMenuItemClick: (info: {
    key: Key
    keyPath: Key[]
    domEvent: Event
    isSelected: boolean
    item: any
  }) => void
  onSubMenuToggle: (info: { key: Key, keyPath: Key[], open: boolean, event: Event | null }) => void
  registerPath: (key: Key, path: Key[]) => void
  unregisterPath: (key: Key) => void
  getKeyPath: (key: Key) => Key[] | undefined
  setPopoverSubmenu: (key: Key, isPopover: boolean) => void
}

const defaultMenuContext: MenuContextProps = {
  prefixCls: computed(() => 'ant-menu'),
  mode: computed(() => 'vertical'),
  theme: computed(() => 'light'),
  inlineIndent: computed(() => 24),
  inlineCollapsed: computed(() => false),
  selectable: computed(() => true),
  multiple: computed(() => false),
  triggerSubMenuAction: computed(() => 'hover'),
  expandIcon: computed(() => null),
  openDelay: computed(() => 0.1),
  closeDelay: computed(() => 0.1),
  openKeys: computed(() => new Set<Key>()),
  selectedKeys: computed(() => new Set<Key>()),
  openSelectedKeySet: computed(() => new Set<Key>()),
  level: computed(() => 1),
  parentPath: computed(() => []),
  onMenuItemClick: () => {},
  onSubMenuToggle: () => {},
  registerPath: () => {},
  unregisterPath: () => {},
  getKeyPath: () => undefined,
  setPopoverSubmenu: () => {},
}

const MenuContextKey: InjectionKey<MenuContextProps> = Symbol('MenuContextKey')

export function useProvideMenuContext(value: MenuContextProps) {
  provide(MenuContextKey, value)
  return value
}

export function useMenuContext() {
  return inject(MenuContextKey, defaultMenuContext)
}

const defaultMenuPath = computed<Key[]>(() => [])
const MenuPathKey: InjectionKey<Ref<Key[]>> = Symbol('MenuPathKey')
export function useProvideMenuPath(value: Ref<Key[]>) {
  provide(MenuPathKey, value)
  return value
}
export function useMenuPath() {
  return inject(MenuPathKey, defaultMenuPath)
}

const defaultDisabled = computed(() => false)
const MenuDisabledKey: InjectionKey<Ref<boolean>> = Symbol('MenuDisabledKey')
export function useProvideMenuDisabled(value: Ref<boolean>) {
  provide(MenuDisabledKey, value)
  return value
}
export function useMenuDisabled() {
  return inject(MenuDisabledKey, defaultDisabled)
}

const defaultParentMode = computed<MenuMode>(() => 'vertical')
const MenuParentModeKey: InjectionKey<Ref<MenuMode>> = Symbol('MenuParentModeKey')
export function useProvideParentMode(value: Ref<MenuMode>) {
  provide(MenuParentModeKey, value)
  return value
}
export function useParentMode() {
  return inject(MenuParentModeKey, defaultParentMode)
}

const defaultLevel = computed(() => 1)
const MenuLevelKey: InjectionKey<Ref<number>> = Symbol('MenuLevelKey')
export function useProvideMenuLevel(value: Ref<number>) {
  provide(MenuLevelKey, value)
  return value
}
export function useMenuLevel() {
  return inject(MenuLevelKey, defaultLevel)
}
