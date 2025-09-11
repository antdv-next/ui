<script setup lang="ts">
import type { VueNode } from '@v-c/util/dist/type'
import { computed, useSlots } from 'vue'
import DefaultLoadingIcon from './defaultLoadingIcon.vue'
import IconWrapper from './icon-wrapper.vue'

interface ButtonIconProps {
  prefixCls: string
  icon?: VueNode | (() => VueNode)
  loading?: boolean | { icon?: VueNode | (() => VueNode), delay?: number }
  innerLoading: boolean
  isMountRef: boolean
  customClassNames?: { icon?: string }
  buttonCtx?: {
    classNames?: { icon?: string }
    styles?: { icon?: any }
  }
  styles?: { icon?: any }
}

const {
  prefixCls,
  icon,
  loading,
  innerLoading,
  isMountRef,
  customClassNames,
  buttonCtx,
  styles,
} = defineProps<ButtonIconProps>()

const slots = useSlots()

const hasIconSlot = computed(() => !!slots.icon)
const hasLoadingIconSlot = computed(() => !!slots.loadingIcon)

const showCustomIcon = computed(() => (icon || hasIconSlot.value) && !innerLoading)
const showLoadingIcon = computed(() => loading && typeof loading === 'object' && (loading.icon || hasLoadingIconSlot.value))
</script>

<template>
  <IconWrapper
    v-if="showCustomIcon"
    :prefix-cls="prefixCls"
    :class="[
      customClassNames?.icon,
      buttonCtx?.classNames?.icon,
    ]"
    :style="[
      buttonCtx?.styles?.icon,
      styles?.icon,
    ]"
  >
    <slot name="icon">
      <component :is="icon" />
    </slot>
  </IconWrapper>
  <IconWrapper v-else-if="showLoadingIcon">
    <slot name="loadingIcon">
      <component :is="(loading as any).icon" />
    </slot>
  </IconWrapper>
  <template v-else>
    <DefaultLoadingIcon
      :prefix-cls="prefixCls"
      :loading="innerLoading"
      :mount="isMountRef"
      :exist-icon="!!(icon || hasIconSlot)"
    />
  </template>
</template>
