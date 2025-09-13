import type { App } from 'vue'
import Alert from './alert.vue'

export type { AlertProps } from './define'

Alert.install = (app: App) => {
  app.component('AAlert', Alert)
}

export {
  Alert,
}

export default Alert
