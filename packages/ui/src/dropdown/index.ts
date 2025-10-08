import type { App } from 'vue'
import Dropdown from './dropdown.vue'

Dropdown.install = (app: App) => {
  app.component(Dropdown.name!, Dropdown)
}

export { Dropdown }
export type { DropdownArrowOptions, DropdownEmits, DropdownProps, DropdownSlots } from './define'
export default Dropdown
