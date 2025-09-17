import { computed } from 'vue'
import { useConfigContext } from '../config-provider/context'

export function useLocale<T extends Record<string, any>>(componentName: string, defaultLocale: T) {
  const configContext = useConfigContext() as Record<string, any>

  return [
    computed<T>(() => {
      const locale = configContext?.locale
      const componentLocale = locale?.[componentName] ?? {}
      return {
        ...defaultLocale,
        ...componentLocale,
      }
    }),
  ] as const
}
