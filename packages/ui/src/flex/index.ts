import type { App } from 'vue'
import Flex from './flex.vue'

Flex.install = (app: App) => {
  app.component('AFlex', Flex)
}

export type { FlexProps } from './define'

export {
  Flex,
}
