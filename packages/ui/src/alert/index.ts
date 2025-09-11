import Alert from './alert.vue'

Alert.install = (app) => {
  app.component('AAlert', Alert)
}

export default Alert
