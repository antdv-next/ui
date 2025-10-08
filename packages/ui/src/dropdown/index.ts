import type { App } from 'vue'
import DropdownButton from './dropdown-button.vue'
import Dropdown from './dropdown.vue'

Dropdown.install = (app: App) => {
  app.component(Dropdown.name!, Dropdown)
}

DropdownButton.install = (app: App) => {
  app.component(DropdownButton.name!, DropdownButton)
}
export { Dropdown, DropdownButton }
export type {
  DropdownArrowOptions,
  DropdownButtonEmits,
  DropdownButtonProps,
  DropdownButtonSlots,
  DropdownButtonType,
  DropdownEmits,
  DropdownProps,
  DropdownSlots,
} from './define'
export default Dropdown
