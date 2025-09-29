import type { App } from 'vue'
import Popconfirm from './popconfirm.vue'

export type { PopconfirmProps, PopconfirmRef } from './define'

Popconfirm.install = (app: App) => {
  app.component('APopconfirm', Popconfirm)
}

export {
  Popconfirm,
}

export default Popconfirm
