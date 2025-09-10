import type { ShowWaveEffect } from './interface.ts'
import { h, render } from 'vue'
import WaveEffect from './waveEffect.vue'

export const showWaveEffect: ShowWaveEffect = (target, info) => {
  const { component } = info

  // Skip for unchecked checkbox
  if (component === 'Checkbox' && !target.querySelector<HTMLInputElement>('input')?.checked) {
    return
  }

  // Create holder
  const holder = document.createElement('div')
  holder.style.position = 'absolute'
  holder.style.left = '0px'
  holder.style.top = '0px'
  target?.insertBefore(holder, target?.firstChild)

  render(
    h(WaveEffect, {
      ...info,
      target,
    }),
    holder,
  )
}
