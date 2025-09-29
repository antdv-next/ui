import type { App } from 'vue'
import QRCode from './index.vue'

QRCode.install = (app: App) => {
  app.component('AQrcode', QRCode)
}

export type { QRCodeProps } from './define'

export {
  QRCode,
}
