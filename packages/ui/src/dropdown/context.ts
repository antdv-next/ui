import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export interface DropdownContextProps {
  /**
   * Register a function to check if any submenu is hovered
   * This is used by Menu component to prevent dropdown from closing
   * when mouse moves to a submenu
   */
  registerSubmenuHoverCheck: (checker: () => boolean) => void
  /**
   * Unregister the submenu hover check function
   */
  unregisterSubmenuHoverCheck: () => void
}

const DropdownContextKey: InjectionKey<DropdownContextProps> = Symbol('DropdownContextKey')

export function useProvideDropdownContext(value: DropdownContextProps) {
  provide(DropdownContextKey, value)
  return value
}

export function useDropdownContext() {
  return inject(DropdownContextKey, null)
}
