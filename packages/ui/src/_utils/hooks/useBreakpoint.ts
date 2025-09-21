import type { Ref } from 'vue'
import type { ScreenMap } from '../responsiveObserve'
import { shallowRef } from 'vue'

// TODO: useResponsiveObserve
// onMounted, onUnmounted,
// import useResponsiveObserve from '../responsiveObserve'

function useBreakpoint(): Ref<ScreenMap> {
  const screens = shallowRef<ScreenMap>({})
  // let token = null
  // // const responsiveObserve = useResponsiveObserve()
  //
  // onMounted(() => {
  //   token = responsiveObserve.value.subscribe((supportScreens) => {
  //     screens.value = supportScreens
  //   })
  // })
  //
  // onUnmounted(() => {
  //   responsiveObserve.value.unsubscribe(token)
  // })

  return screens
}

export default useBreakpoint
