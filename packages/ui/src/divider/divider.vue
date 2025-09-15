<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { DividerProps, DividerSlots } from './define'
import { computed } from 'vue'
import { useComponentConfig } from '../config-provider/context'
import { useSize } from '../config-provider/size-context'
import { DividerDefaultProps } from './define'

defineOptions({
  name: 'ADivider',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<DividerProps>(), DividerDefaultProps)
const slots = defineSlots<DividerSlots>()
const prefixCls = props.prefixCls
const config = useComponentConfig('divider')
const sizeClassNameMap: Record<string, string> = { small: 'sm', middle: 'md' }
const sizeFullName = useSize()
const sizeCls = computed(() => sizeClassNameMap[props.size ?? sizeFullName.size.value])
const hasChildren = computed(() => !!slots.default)
const mergedOrientation = computed(() => {
  if (props.orientation === 'left') {
    return config.value.direction === 'rtl' ? 'end' : 'start'
  }
  if (props.orientation === 'right') {
    return config.value.direction === 'rtl' ? 'start' : 'end'
  }
  return props.orientation
})
const hasMarginStart = computed(() => mergedOrientation.value === 'start' && props.orientationMargin !== null)

const hasMarginEnd = computed(() => mergedOrientation.value === 'end' && props.orientationMargin !== null)
const cls = computed(() => {
  return {
    [prefixCls]: true,
    [`${prefixCls}-${props.type}`]: true,
    [`${prefixCls}-with-text`]: hasChildren.value,
    [`${prefixCls}-with-text-${mergedOrientation.value}`]: hasChildren.value,
    [`${prefixCls}-dashed`]: !!props.dashed,
    [`${prefixCls}-${props.variant}`]: props.variant !== 'solid',
    [`${prefixCls}-plain`]: !!props.plain,
    [`${prefixCls}-rtl`]: config.value.direction === 'rtl',
    [`${prefixCls}-no-default-orientation-margin-start`]: hasMarginStart.value,
    [`${prefixCls}-no-default-orientation-margin-end`]: hasMarginEnd.value,
    [`${prefixCls}-${sizeCls.value}`]: !!sizeCls.value,
  }
})
const memoizedOrientationMargin = computed(() => {
  if (typeof props.orientationMargin === 'number') {
    return props.orientationMargin
  }
  if (/^\d+$/.test(props.orientationMargin!)) {
    return Number(props.orientationMargin)
  }
  return props.orientationMargin!
})
const innerStyle: CSSProperties = {
  marginInlineStart: hasMarginStart.value ? memoizedOrientationMargin.value : undefined,
  marginInlineEnd: hasMarginEnd.value ? memoizedOrientationMargin.value : undefined,
}
</script>

<template>
  <div v-bind="$attrs" :class="[cls]" :style="[innerStyle]" role="separator">
    <template v-if="$slots.default && type !== 'vertical'">
      <span :class="[`${prefixCls}-inner-text`]" :style="innerStyle">
        <slot />
      </span>
    </template>
  </div>
</template>

<style scoped>

</style>
