import type { App } from 'vue'
import type { TooltipAlignConfig, TooltipEmits, TooltipPlacement, TooltipProps, TooltipRef } from './define'
import Tooltip from './tooltip.vue'

export type { TooltipAlignConfig, TooltipEmits, TooltipPlacement, TooltipProps, TooltipRef }

export { Tooltip }

Tooltip.install = (app: App) => {
  app.component('ATooltip', Tooltip)
}
export default Tooltip
