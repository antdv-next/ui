<script setup lang="ts">
import type { DropdownOverlayProps } from './define'
import { computed, useAttrs } from 'vue'
import { classNames } from '../_utils/classNames.ts'
import { useProvideDropdownOverlay } from './context'

defineOptions({
  name: 'ADropdownOverlay',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownOverlayProps>(), {
  role: 'menu',
})

const attrs = useAttrs()

const mergedClass = computed(() => {
  const attrClass = attrs.class as string | undefined
  return classNames(`${props.prefixCls}-menu`, attrClass)
})

const restAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

useProvideDropdownOverlay({
  prefixCls: computed(() => props.prefixCls),
  onItemClick: props.onItemClick,
})
</script>

<template>
  <ul
    v-bind="restAttrs"
    :class="mergedClass"
    :tabindex="0"
    :role="props.role"
  >
    <slot />
  </ul>
</template>
