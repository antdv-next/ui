import type { App } from 'vue'
import DropdownButton from './dropdown-button.vue'
import Dropdown from './dropdown.vue'

export type { DropdownButtonProps, DropdownExpose, DropdownProps } from './define'

Dropdown.install = (app: App) => {
  app.component(Dropdown.name!, Dropdown)
  return app
}

DropdownButton.install = (app: App) => {
  app.component(DropdownButton.name!, DropdownButton)
  return app
}

export {
  Dropdown,
  DropdownButton,
}

export default Dropdown
