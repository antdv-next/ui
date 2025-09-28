<script setup lang="ts">
import type { DropdownItemEmits, DropdownItemProps, DropdownItemSlots } from './define'
import { computed, getCurrentInstance, h, isVNode, useAttrs, useSlots } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { classNames } from '../_utils/classNames.ts'
import { useDropdownOverlay } from './context'

defineOptions({
  name: 'ADropdownItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownItemProps>(), {
  danger: false,
  disabled: false,
})

const emit = defineEmits<DropdownItemEmits>()
const slots = useSlots() as DropdownItemSlots
const attrs = useAttrs()

const overlayCtx = useDropdownOverlay()

const instance = getCurrentInstance()
if (instance?.type && typeof instance.type === 'object')
  (instance.type as any).__ANT_DROPDOWN_ITEM = true

const prefixCls = computed(() => overlayCtx?.prefixCls.value ?? 'ant-dropdown')
const menuPrefixCls = computed(() => `${prefixCls.value}-menu`)

const hasExtra = computed(() => !!slots.extra)
const hasIcon = computed(() => !!slots.icon || props.icon !== undefined)

function resolveNodes(source?: (() => any) | any) {
  const content = typeof source === 'function' ? source() : source
  const nodes = flattenChildren(content, true)
  return nodes
    .map((node) => {
      if (isVNode(node))
        return node
      if (typeof node === 'string' || typeof node === 'number')
        return h('span', node)
      return null
    })
    .filter(Boolean)
}

const iconNodes = computed(() => {
  if (slots.icon)
    return resolveNodes(slots.icon)
  if (props.icon !== undefined)
    return resolveNodes(props.icon)
  return []
})

const titleNodes = computed(() => resolveNodes(slots.default))

const itemClass = computed(() => classNames(
  `${menuPrefixCls.value}-item`,
  attrs.class,
  {
    [`${menuPrefixCls.value}-item-danger`]: props.danger,
    [`${menuPrefixCls.value}-item-disabled`]: props.disabled,
  },
))

const titleClass = computed(() => classNames(
  `${menuPrefixCls.value}-title-content`,
  {
    [`${menuPrefixCls.value}-title-content-with-extra`]: hasExtra.value,
  },
))

const restAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

function handleClick(event: MouseEvent) {
  if (props.disabled)
    return

  const info = {
    key: props.eventKey,
    domEvent: event,
  }

  emit('click', info)
  overlayCtx?.onItemClick?.({ key: props.eventKey, event })
}
</script>

<template>
  <li
    v-bind="restAttrs"
    :class="itemClass"
    role="menuitem"
    :aria-disabled="props.disabled"
    tabindex="-1"
    @click="handleClick"
  >
    <template v-if="hasIcon">
      <component
        :is="node"
        v-for="(node, index) in iconNodes"
        :key="index"
        :class="`${menuPrefixCls}-item-icon`"
      />
    </template>
    <span :class="titleClass">
      <template v-if="titleNodes.length">
        <component
          :is="node"
          v-for="(node, index) in titleNodes"
          :key="index"
        />
      </template>
    </span>
    <span v-if="hasExtra" :class="`${menuPrefixCls}-item-extra`">
      <slot name="extra" />
    </span>
  </li>
</template>
