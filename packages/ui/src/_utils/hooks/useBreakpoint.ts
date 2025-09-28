import type { Ref } from 'vue'
import type { ScreenMap } from '../responsiveObserve'
import { onMounted, onUnmounted, shallowRef } from 'vue'

import useResponsiveObserve from '../responsiveObserve'

function useBreakpoint(): Ref<ScreenMap> {
  const screens = shallowRef<ScreenMap>({})
  let token: number | null = null
  const responsiveObserve = useResponsiveObserve()

  onMounted(() => {
    token = responsiveObserve.value.subscribe((supportScreens) => {
      screens.value = supportScreens
    })
  })

  onUnmounted(() => {
    if (token) {
      responsiveObserve.value.unsubscribe(token)
      token = null
    }
  })

  return screens
}

export default useBreakpoint
