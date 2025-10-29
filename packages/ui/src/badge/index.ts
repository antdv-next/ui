import type { App, Plugin } from 'vue'
import Badge from './badge.vue'
import Ribbon from './ribbon.vue'

export type { BadgeProps } from './define'

Badge.install = function (app: App) {
  app.component(Badge.name!, Badge)
  app.component(Ribbon.name!, Ribbon)
  return app
}

export { Badge, Ribbon as BadgeRibbon }

export default Badge as typeof Badge
  & Plugin & {
    readonly Ribbon: typeof Ribbon
  }
