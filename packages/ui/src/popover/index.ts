import type { App } from 'vue'
import Popover from './popover.vue'

export type { PopoverProps, PopoverRef } from './define'

Popover.install = (app: App) => {
  app.component('APopover', Popover)
}

export {
  Popover,
}

export default Popover
