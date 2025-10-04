<script setup lang="ts">
import type { SliderTooltipProps as TooltipProps } from './define'
import { ref } from 'vue'
import { Tooltip } from '../tooltip'

type SliderTooltipProps = TooltipProps & {
  draggingDelete?: boolean
  value?: number
}
const props = defineProps<SliderTooltipProps>()
const emit = defineEmits<{
  'update:open': [boolean]
}>()
const mergedOpen = ref(props.open || !props.draggingDelete)
function change(value: boolean) {
  emit('update:open', value)
}
</script>

<template>
  <Tooltip v-bind="[$props, $attrs]" v-model:open="mergedOpen" @open-change="change">
    <slot />
  </Tooltip>
</template>

<style scoped>
</style>
