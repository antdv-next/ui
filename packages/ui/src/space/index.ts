import type { App, Plugin } from 'vue'
import Compact from './compact.vue'
import Space from './space.vue'

export type { SpaceCompactItemProps, SpaceCompactProps, SpaceProps, SpaceSize } from './define'

Space.Compact = Compact

Space.install = function (app: App) {
  app.component(Space.name!, Space)
  app.component(Compact.name!, Compact)
  return app
}
Compact.install = () => {
  // TODO
}

export { Compact, Space }

export default Space as typeof Space
  & Plugin & {
    readonly Compact: typeof Compact
  }
