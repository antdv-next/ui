import antd from 'antdv-next'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'antdv-next/index.less'
import 'uno.css'

const app = createApp(App)
app.use(router)
app.use(antd)
app.mount('#app')
