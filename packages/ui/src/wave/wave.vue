<script setup lang="ts">
import type { WaveComponent } from './interface.ts'
import isVisible from '@v-c/util/dist/Dom/isVisible'
import { useEventListener } from '@vueuse/core'
import { toRefs } from 'vue'
import { useWave } from './useWave.ts'

const props = defineProps<{
  node?: HTMLElement
  component?: WaveComponent
}>()
const { node, component } = toRefs(props)
const showWave = useWave(node, 'ant-wave', component)
function onClick(e: MouseEvent) {
  const _node = node.value
  if (!_node) {
    return
  }
  if (
    !isVisible(e.target as HTMLElement)
    || !_node.getAttribute
    || _node.getAttribute('disabled')
    || (_node as HTMLInputElement).disabled
    || (_node.className.includes('disabled') && !_node.className.includes('disabled:'))
    || _node.getAttribute('aria-disabled') === 'true'
    || _node.className.includes('-leave')
  ) {
    return
  }
  showWave(e)
}
useEventListener('click', onClick, node, { passive: true })
</script>

<template>
  <slot />
</template>
