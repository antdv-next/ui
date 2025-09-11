import type { App } from 'vue'
import Button from './button.vue'

Button.install = (app: App) => {
  app.component('AButton', Button)
}

Button.__ANT_BUTTON = true

export {
  Button,
}
