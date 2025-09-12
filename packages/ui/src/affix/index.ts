import type { App } from 'vue'
import Affix from './affix.vue'

export type { AffixProps } from './define'
Affix.install = (app: App) => {
  app.component('AAffix', Affix)
}
export {
  Affix,
}
