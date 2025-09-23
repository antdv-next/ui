import type { Ref } from 'vue'
import raf from '@v-c/util/dist/raf'
import { ref, watchEffect } from 'vue'

export default function useRafLock(): [state: Ref<boolean>, setState: (nextState: boolean) => void] {
  const state = ref(false)

  const rafRef = ref<number | null>(null)
  const cleanup = () => {
    raf.cancel(rafRef.value!)
  }

  const setDelayState = (nextState: boolean) => {
    cleanup()

    if (nextState) {
      state.value = nextState
    } else {
      rafRef.value = raf(() => {
        state.value = nextState
      })
    }
  }

  watchEffect((onCleanup) => {
    onCleanup(() => {
      cleanup()
    })
  })

  return [state, setDelayState]
}
