import type { App } from 'vue'
import Watermark from './watermark.vue'

Watermark.install = (app: App) => {
  app.component(Watermark.name!, Watermark)
}

export type { WatermarkProps as WaterMarkProps } from './define'

export { Watermark }
