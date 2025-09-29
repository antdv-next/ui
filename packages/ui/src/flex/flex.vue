<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { FlexProps } from './define'
import { computed } from 'vue'
import { isPresetSize } from '../_utils/gapSize'
import { flexDefaultProps } from './define'
import createFlexClassNames from './utils'

defineOptions({ name: 'AFlex' })
const props = withDefaults(defineProps<FlexProps>(), flexDefaultProps)

const mergedCls = computed(() => [
  createFlexClassNames(props.prefixCls, props),
  {
    'ant-flex': true,
    'ant-flex-vertical': props.vertical,
    'ant-flex-rtl': false,
    [`ant-flex-gap-${props.gap}`]: isPresetSize(props.gap),
  },
])

const mergedStyle = computed(() => {
  const style: CSSProperties = {}

  if (props.flex) {
    style.flex = props.flex
  }

  if (props.gap && !isPresetSize(props.gap)) {
    style.gap = `${props.gap}px`
  }

  return style
})
</script>

<template>
  <component :is="componentTag" :class="mergedCls" :style="mergedStyle" v-bind="$attrs">
    <slot />
  </component>
</template>

<style scoped></style>
