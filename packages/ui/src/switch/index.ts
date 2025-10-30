import type { App } from 'vue'
import Switch from './switch.vue'

Switch.install = function (app: App) {
  app.component(Switch.name!, Switch)
  return app
}

export { Switch }
