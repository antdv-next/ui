<script setup lang="ts">
import type { CSSProperties, VNode } from 'vue'
import type { AvatarGroupProps } from './define'
import { computed, toRefs, useAttrs, useSlots, watchEffect } from 'vue'
import { flattenChildren } from '../_utils/checker'
import { cloneElement } from '../_utils/node'
import RenderComponent from '../_utils/renderComponent.vue'
import { useConfigContext } from '../config-provider/context'
import Avatar from './avatar.vue'
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

const childrenFlatNodes = computed(() => {
  const children = Reflect.get(props, 'default') || slots.default?.()
  return flattenChildren(children).map((child, index) => cloneElement(child as VNode, { key: `avatar-group-key-${index}` }))
})

const numOfChildren = computed(() => childrenFlatNodes.value.length)

const maxChildrenShow = computed(() => {
  if (maxCount.value && numOfChildren.value > maxCount.value) {
    return childrenFlatNodes.value.slice(0, maxCount.value)
  }
  return childrenFlatNodes.value
})

const maxChildrenHidden = computed(() => {
  if (maxCount.value && numOfChildren.value > maxCount.value) {
    return childrenFlatNodes.value.slice(maxCount.value, numOfChildren.value)
  }
  return null
})
</script>

<template>
  <div v-if="maxCount && numOfChildren > maxCount" v-bind="$attrs" :class="cls" :style="$attrs.style as CSSProperties">
    <RenderComponent :render="maxChildrenShow" />
    <Popover
      key="avatar-popover-key"
      :trigger="maxPopoverTrigger"
      :placement="maxPopoverPlacement"
      :overlay-class-name="`${groupPrefixCls}-popover`"
    >
      <Avatar :style="maxStyle" :shape="shape">
        +{{ numOfChildren - maxCount }}
      </Avatar>
      <template #content>
        <RenderComponent :render="maxChildrenHidden" />
      </template>
    </Popover>
  </div>

  <div v-else v-bind="$attrs" :class="cls" :style="$attrs.style as CSSProperties">
    <RenderComponent :render="childrenFlatNodes" />
  </div>
</template>
