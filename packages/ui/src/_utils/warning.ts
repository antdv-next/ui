import vcWarning, { resetWarned } from '@v-c/util/dist/warning'

export { resetWarned }
export function noop() {}

type Warning = (valid: boolean, component: string, message?: string) => void

// eslint-disable-next-line import/no-mutable-exports
let warning: Warning = noop
// eslint-disable-next-line node/prefer-global/process
if (process.env.NODE_ENV !== 'production') {
  warning = (valid, component, message) => {
    vcWarning(valid, `[ant-design-vue: ${component}] ${message}`)

    // StrictMode will inject console which will not throw warning in React 17.
    // eslint-disable-next-line node/prefer-global/process
    if (process.env.NODE_ENV === 'test') {
      resetWarned()
    }
  }
}

export default warning
