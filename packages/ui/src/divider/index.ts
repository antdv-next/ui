import type { App } from 'vue'
import Divider from './divider.vue'

Divider.install = (app: App) => {
  app.component('ADivider', Divider)
}
export {
  Divider,
}
