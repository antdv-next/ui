import type { App } from 'vue'
import Spin from './spin.vue'

Spin.install = function (app: App) {
  app.component(Spin.name!, Spin)
  return app
}

export { Spin }
