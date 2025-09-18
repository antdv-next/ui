<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { LayoutBasicProps } from './define.ts'
import { computed, useAttrs } from 'vue'
import { classNames } from '../_utils/classNames.ts'
import { useConfigContext } from '../config-provider/context.ts'

defineOptions({
  name: 'ALayoutContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LayoutBasicProps>(), {
  suffixCls: 'content',
  tagName: 'main',
})

const attrs = useAttrs()
const configCtx = useConfigContext()

const prefixCls = computed(() => configCtx.getPrefixCls('layout', props.prefixCls))
const prefixWithSuffix = computed(() => (props.suffixCls ? `${prefixCls.value}-${props.suffixCls}` : prefixCls.value))
const baseCls = computed(() => props.prefixCls ?? prefixWithSuffix.value)

const attrClass = computed(() => attrs.class)
const attrStyle = computed(() => attrs.style as StyleValue | undefined)

const className = computed(() => classNames(
  baseCls.value,
  props.className,
  props.rootClassName,
  attrClass.value,
))

const mergedStyle = computed<StyleValue | undefined>(() => {
  const styleList = [] as StyleValue[]
  if (attrStyle.value) {
    styleList.push(attrStyle.value)
  }
  if (props.style) {
    styleList.push(props.style)
  }
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

const TagName = computed(() => props.tagName ?? 'main')
</script>

<template>
  <component
    :is="TagName"
    v-bind="restAttrs"
    :class="className"
    :style="mergedStyle"
  >
    <slot />
  </component>
</template>
