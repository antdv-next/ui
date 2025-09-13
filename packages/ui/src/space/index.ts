import type { App } from 'vue'
import Compact from './compact.vue'
import Space from './space.vue'

Space.install = (app: App) => {
  app.component('ASpace', Space)
}

Space.Compact = Compact

Space.install = function (app: App) {
  app.component(Space.name!, Space)
  return app
}

Compact.install = function (app: App) {
  app.component(Compact.name!, Compact)
  return app
}

export { Compact }

export { Space }
