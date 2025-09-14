import type { App } from 'vue'
import AnchorLink from './anchor-link.vue'
import Anchor from './anchor.vue'

export type { AnchorLinkBaseProps, AnchorProps } from './define'

Anchor.install = (app: App) => {
  app.component('AAnchor', Anchor)
  app.component('AAnchorLink', AnchorLink)
}

AnchorLink.install = (app: App) => {
  app.component('AAnchorLink', AnchorLink)
}

export {
  Anchor,
  AnchorLink,
}
export default Anchor
