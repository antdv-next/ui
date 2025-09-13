import { inject, provide, reactive, watchEffect } from 'vue'

function createContext<T extends Record<string, any>>(defaultValue?: T | null) {
  const contextKey = Symbol('contextKey')
  const useProvide = (props: T | null, newProps?: T | null) => {
    const mergedProps = reactive<T>({} as T)
    provide(contextKey, mergedProps)
    watchEffect(() => {
      Object.assign(mergedProps, props, newProps || {})
    })
    return mergedProps
  }
  const useInject = () => {
    return inject(contextKey, defaultValue as T) || ({} as T)
  }
  return {
    useProvide,
    useInject,
  }
}

export default createContext
