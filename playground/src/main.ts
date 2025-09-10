import antd from 'antdv-next'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'antdv-next/index.less'

const app = createApp(App)
app.use(router)
app.use(antd)
app.mount('#app')
