<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { LayoutBasicProps } from './define.ts'
import { computed, useAttrs } from 'vue'
import { classNames } from '../_utils/classNames.ts'
import { useConfigContext } from '../config-provider/context.ts'

defineOptions({
  name: 'ALayoutHeader',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LayoutBasicProps>(), {
  suffixCls: 'header',
  tagName: 'header',
})

const attrs = useAttrs()
const configCtx = useConfigContext()

const prefixCls = computed(() => configCtx.getPrefixCls('layout', props.prefixCls))
const prefixWithSuffix = computed(() => (props.suffixCls ? `${prefixCls.value}-${props.suffixCls}` : prefixCls.value))
const baseCls = computed(() => props.prefixCls ?? prefixWithSuffix.value)

const className = computed(() => classNames(
  baseCls.value,
  props.rootClassName,
))

const mergedStyle = computed<StyleValue | undefined>(() => {
  const styleList = [] as StyleValue[]
  if (styleList.length === 0) {
    return undefined
  }
  if (styleList.length === 1) {
    return styleList[0]
  }
  return styleList
})

const restAttrs = computed(() => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class' && key !== 'style'))
})

const TagName = computed(() => props.tagName ?? 'header')
</script>

<template>
  <component
    :is="TagName"
    v-bind="restAttrs"
    :class="[className, $attrs.class]"
    :style="[mergedStyle, $attrs.style]"
  >
    <slot />
  </component>
</template>
