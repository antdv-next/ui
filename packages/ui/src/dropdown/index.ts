import type { App } from 'vue'
import DropdownButton from './dropdown-button.vue'
import DropdownItem from './dropdown-item.vue'
import Dropdown from './dropdown.vue'

export type {
  DropdownButtonProps,
  DropdownExpose,
  DropdownItemEmits,
  DropdownItemProps,
  DropdownProps,
} from './define'

Dropdown.install = (app: App) => {
  app.component(Dropdown.name!, Dropdown)
  return app
}

DropdownButton.install = (app: App) => {
  app.component(DropdownButton.name!, DropdownButton)
  return app
}

DropdownItem.install = (app: App) => {
  app.component(DropdownItem.name!, DropdownItem)
  return app
}

export {
  Dropdown,
  DropdownButton,
  DropdownItem,
}

export default Dropdown
