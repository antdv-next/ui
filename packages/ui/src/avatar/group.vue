<script setup lang="ts">
import type { VNode } from 'vue'
import type { AvatarGroupProps } from './define'
import { computed, h, toRefs, useAttrs, useSlots, watchEffect } from 'vue'
import { flattenChildren } from '../_utils/checker'
import { cloneElement } from '../_utils/node'
import { useConfigContext } from '../config-provider/context'
import { useAvatarProviderContext } from './define'

defineOptions({
  name: 'AAvatarGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  maxStyle: undefined,
  maxPopoverPlacement: 'top',
  maxPopoverTrigger: 'hover',
  size: 'default',
  shape: 'circle',
})

const ctx = useConfigContext()
const prefixCls = computed(() => ctx.getPrefixCls('avatar', props.prefixCls))
const direction = computed(() => ctx.direction)
const groupPrefixCls = computed(() => `${prefixCls.value}-group`)

const { maxPopoverPlacement, maxCount, maxStyle, maxPopoverTrigger, shape } = toRefs(props)
watchEffect(() => {
  const context = { size: props.size, shape: props.shape }
  useAvatarProviderContext(context)
})

const attrs = useAttrs()

const cls = computed(() => {
  return {
    [groupPrefixCls.value]: true,
    [`${groupPrefixCls.value}-rtl`]: direction.value === 'rtl',
    [`${attrs.class}`]: !!attrs.class,
  }
})

const slots = useSlots()

const childernShow = computed(() => {
  const children = Reflect.get(props, 'default') || slots.default?.()
  const childrenWithProps = flattenChildren(children).map((child, index) =>
    cloneElement(child as VNode, {
      key: `avatar-key-${index}`,
    }),
  )

  const numOfChildren = childrenWithProps.length

  if (maxCount.value && numOfChildren > maxCount.value) {
    const childrenShow = childrenWithProps.slice(0, maxCount.value)
    const childrenHidden = childrenWithProps.slice(maxCount.value, numOfChildren)
    // TODO: Popover
    childrenShow.push(
      h(
        'Popover',
        {
          key: 'avatar-popover-key',
          content: childrenHidden,
          trigger: maxPopoverTrigger.value,
          placement: maxPopoverPlacement.value,
          overlayClassName: `${groupPrefixCls.value}-popover`,
        },
        {
          default: () => h('Avatar', { style: maxStyle.value, shape: shape.value }, { default: () => `+${numOfChildren - maxCount.value}` }),
        },
      ),
    )

    return h('div', { ...attrs, class: cls.value, style: attrs.style }, childrenShow)
  }
  return h('div', { ...attrs, class: cls.value, style: attrs.style }, childrenWithProps)
})
</script>

<template>
  <component :is="childernShow" />
</template>
