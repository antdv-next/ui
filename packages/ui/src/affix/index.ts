import type { App } from 'vue'
import Affix from './affix.vue'

Affix.install = (app: App) => {
  app.component('AAffix', Affix)
}
export {
  Affix,
}
