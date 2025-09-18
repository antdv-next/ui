<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { LayoutProps } from './define.ts'
import { computed, ref, useAttrs, useSlots } from 'vue'
import { classNames } from '../_utils/classNames.ts'
import { useComponentConfig, useConfigContext } from '../config-provider/context.ts'
import { useProvideLayoutContext } from './context.ts'
import { useHasSider } from './hooks/useHasSider.ts'

defineOptions({
  name: 'ALayout',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LayoutProps>(), {
  tagName: 'div',
  hasSider: undefined,
})

const attrs = useAttrs()
const slots = useSlots()

const siders = ref<string[]>([])

function addSider(id: string) {
  if (!siders.value.includes(id)) {
    siders.value = [...siders.value, id]
  }
}

function removeSider(id: string) {
  siders.value = siders.value.filter(current => current !== id)
}

useProvideLayoutContext({
  siderHook: {
    addSider,
    removeSider,
  },
})

const configCtx = useConfigContext()
const componentConfig = useComponentConfig('layout')

const prefixCls = computed(() => configCtx.getPrefixCls('layout', props.prefixCls))
const direction = computed(() => componentConfig.value?.direction ?? configCtx.direction)
const contextClassName = computed(() => componentConfig.value?.className)
const contextStyle = computed(() => componentConfig.value?.style as StyleValue | undefined)

const attrClass = computed(() => attrs.class)
const attrStyle = computed(() => attrs.style as StyleValue | undefined)

const hasSiderProp = computed(() => props.hasSider)
const mergedHasSider = useHasSider(siders, slots, hasSiderProp)

const className = computed(() => classNames(
  prefixCls.value,
  {
    [`${prefixCls.value}-has-sider`]: mergedHasSider.value,
    [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
  },
  contextClassName.value,
  props.className,
  props.rootClassName,
  attrClass.value,
))

const mergedStyle = computed<StyleValue | undefined>(() => {
  const styleList = [] as StyleValue[]
  if (contextStyle.value) {
    styleList.push(contextStyle.value)
  }
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

const TagName = computed(() => props.tagName ?? 'div')
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
