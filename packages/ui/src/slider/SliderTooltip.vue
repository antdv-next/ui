<script setup lang="ts">
import type { SliderTooltipProps as TooltipProps } from './define'
import raf from '@v-c/util/dist/raf'
import { computed, ref, watchEffect } from 'vue'
import { Tooltip } from '../tooltip'

type SliderTooltipProps = TooltipProps & {
  draggingDelete?: boolean
  value?: number
}
const props = defineProps<SliderTooltipProps>()
const innerRef = ref(null)
const mergedOpen = computed(() => props.open || !props.draggingDelete)
const rafRef = ref<null | unknown>(null)
function cancelKeepAlign() {
  raf.cancel(rafRef.value!)
  rafRef.value = null
}

function keepAlign() {
  rafRef.value = raf(() => {
    innerRef.value?.forceAlign()
    rafRef.value = null
  })
}

watchEffect((onCleanup) => {
  if (mergedOpen.value) {
    keepAlign()
  } else {
    cancelKeepAlign()
  }
  onCleanup(() => cancelKeepAlign())
})
</script>

<template>
  <Tooltip red="innerRef" v-bind="[$props, $attrs]" :open="mergedOpen">
    <slot />
  </Tooltip>
</template>

<style scoped>
</style>
