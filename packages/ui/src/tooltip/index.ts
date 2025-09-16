import type { App } from 'vue'
import type { TooltipEmits, TooltipPlacement, TooltipProps, TooltipRef } from './define'
import Tooltip from './tooltip.vue'

export type { TooltipEmits, TooltipPlacement, TooltipProps, TooltipRef }

export { Tooltip }

Tooltip.install = (app: App) => {
  app.component('ATooltip', Tooltip)
  app.component('Tooltip', Tooltip)
}
export default Tooltip
