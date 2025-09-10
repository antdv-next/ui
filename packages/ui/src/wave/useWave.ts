import type { MaybeRef } from 'vue'
import type { ShowWave, WaveComponent } from './interface.ts'
import raf from '@v-c/util/dist/raf'
import { shallowRef, unref } from 'vue'
import { TARGET_CLS } from './interface.ts'
import { showWaveEffect } from './waveEffect.ts'

export function useWave(
  nodeRef: MaybeRef<HTMLElement | undefined>,
  cls: string,
  component?: MaybeRef<WaveComponent | undefined>,
) {
  const showWave = (e: MouseEvent) => {
    const node = unref(nodeRef)
    if (!node) {
      return
    }
    const targetNode = node.querySelector<HTMLElement>(`.${TARGET_CLS}`) || node
    showWaveEffect(targetNode, {
      className: cls,
      component: unref(component),
    })
  }
  const rafId = shallowRef<number>()
  const showDebounceWave: ShowWave = (event) => {
    raf.cancel(rafId.value!)

    rafId.value = raf(() => {
      showWave(event)
    })
  }
  return showDebounceWave
}
