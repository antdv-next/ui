import type { App } from 'vue'
import * as components from './components'

export * from './components'

export default {
  install(app: App) {
    Object.keys(components).forEach((key) => {
      const component = (components as any)[key]
      app.use(component)
    })
  },
}
