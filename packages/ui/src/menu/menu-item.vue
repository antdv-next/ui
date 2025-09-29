<script setup lang="ts">
import type { PropType, VNode } from 'vue'
import type { Key, MenuItemProps, MenuItemSlots } from './define.ts'
import { filterEmpty } from '@v-c/util/dist/props-util'
import { cloneVNode, computed, defineComponent, h, isVNode, onMounted, onUnmounted, shallowRef, Text, useSlots } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { classNames } from '../_utils/classNames.ts'
import { useMenuContext, useMenuDisabled, useMenuPath } from './context.ts'

defineOptions({
  name: 'AMenuItem',
})

const props = withDefaults(defineProps<MenuItemProps>(), {
  danger: false,
  disabled: false,
})

defineSlots<MenuItemSlots>()
const slots = useSlots() as MenuItemSlots

let uuid = 0
function createLocalKey() {
  uuid += 1
  return `__menu-item-${uuid}`
}

const localKey = shallowRef(createLocalKey())

const menuContext = useMenuContext()
const parentPath = useMenuPath()
const parentPathValue = computed(() => parentPath?.value ?? [])
const parentDisabled = useMenuDisabled()

const prefixCls = computed(() => menuContext.prefixCls?.value ?? 'ant-menu')
const mode = computed(() => menuContext.mode?.value ?? 'vertical')
const inlineIndentValue = computed(() => menuContext.inlineIndent?.value ?? 24)
const inlineCollapsed = computed(() => menuContext.inlineCollapsed?.value ?? false)
const selectedKeySet = computed(() => menuContext.selectedKeys?.value ?? new Set<Key>())

const eventKey = computed(() => props.eventKey ?? localKey.value)

const keyPath = computed<Key[]>(() => [eventKey.value, ...parentPathValue.value])
const level = computed(() => parentPathValue.value.length + 1)

const isDisabled = computed(() => parentDisabled.value || props.disabled)

const isSelected = computed(() => selectedKeySet.value.has(eventKey.value))

const menuItemClass = computed(() => {
  return classNames(
    `${prefixCls.value}-item`,
    {
      [`${prefixCls.value}-item-selected`]: isSelected.value,
      [`${prefixCls.value}-item-disabled`]: isDisabled.value,
      [`${prefixCls.value}-item-danger`]: props.danger,
      [`${prefixCls.value}-item-only-child`]: mode.value === 'inline' && level.value > 1,
    },
  )
})

const titleAttr = computed(() => {
  if (typeof props.title === 'string')
    return props.title
  return undefined
})

function handleClick(event: MouseEvent) {
  if (isDisabled.value)
    return

  menuContext.onMenuItemClick?.({
    key: eventKey.value,
    keyPath: keyPath.value,
    domEvent: event,
    isSelected: isSelected.value,
    item: props.item ?? null,
  })
}

onMounted(() => {
  menuContext.registerPath?.(eventKey.value, keyPath.value)
})

onUnmounted(() => {
  menuContext.unregisterPath?.(eventKey.value)
})

function normalizeChildren(value: any): any[] {
  if (value === undefined || value === null)
    return []

  const arrayValue = Array.isArray(value) ? value : [value]
  return filterEmpty(arrayValue as any)
}

function resolveContent(content?: any, slot?: () => any) {
  let nodes: any[] = []
  if (slot) {
    const slotContent = slot() ?? []
    nodes = flattenChildren(normalizeChildren(slotContent))
  } else if (typeof content === 'function') {
    nodes = flattenChildren(normalizeChildren((content as () => any)()))
  } else if (content !== undefined) {
    nodes = flattenChildren(normalizeChildren(content))
  }

  return nodes.filter(node => node !== null && node !== undefined && node !== false)
}

const rawIconNodes = computed(() => {
  if (slots.icon)
    return resolveContent(undefined, slots.icon)
  if (props.icon)
    return resolveContent(props.icon)
  if (props.item?.icon)
    return resolveContent(props.item.icon)
  return []
})

const iconNodes = computed(() => rawIconNodes.value.map((node, index) => {
  if (isVNode(node)) {
    return cloneVNode(node, {
      key: node.key ?? `menu-item-icon-${index}`,
      class: classNames(node.props?.class, `${prefixCls.value}-item-icon`),
    })
  }
  return h('span', {
    key: `menu-item-icon-${index}`,
    class: `${prefixCls.value}-item-icon`,
  }, node as any)
}))

const labelNodes = computed(() => {
  const slotNodes = resolveContent(undefined, slots.default)
  if (slotNodes.length)
    return slotNodes

  if (props.item?.label !== undefined)
    return resolveContent(props.item.label)

  if (props.title !== undefined)
    return resolveContent(props.title)

  return []
})

const extraNodes = computed(() => {
  const extra = props.extra ?? props.item?.extra
  if (extra === undefined)
    return []
  return resolveContent(extra)
})

const hasExtra = computed(() => extraNodes.value.length > 0)

const shouldUseCustomTitle = computed(() => {
  if (labelNodes.value.length !== 1)
    return false
  const first = labelNodes.value[0]
  return isVNode(first) && first.type !== Text
})

const titleContentClass = computed(() => classNames(
  `${prefixCls.value}-title-content`,
  {
    [`${prefixCls.value}-title-content-with-extra`]: hasExtra.value,
  },
))

const directExtraNode = computed(() => {
  if (!hasExtra.value)
    return null
  if (extraNodes.value.length !== 1)
    return null
  const node = extraNodes.value[0]
  if (!isVNode(node) || node.type === Text)
    return null
  return cloneVNode(node as VNode, {
    class: classNames((node as any).props?.class, `${prefixCls.value}-item-extra`),
  })
})

const titleContentNode = computed(() => {
  if (!labelNodes.value.length && !hasExtra.value)
    return null

  if (shouldUseCustomTitle.value) {
    const node = labelNodes.value[0] as VNode
    return cloneVNode(node, {
      class: classNames(node.props?.class, titleContentClass.value),
    })
  }

  const children: any[] = [...labelNodes.value]

  if (hasExtra.value) {
    if (directExtraNode.value)
      children.push(directExtraNode.value)
    else
      children.push(h('span', { class: `${prefixCls.value}-item-extra` }, extraNodes.value))
  }

  return h('span', { class: titleContentClass.value }, children)
})

const itemPaddingStyle = computed(() => {
  if (mode.value !== 'inline')
    return undefined

  if (inlineCollapsed.value)
    return undefined

  const indent = inlineIndentValue.value * level.value
  return indent > 0 ? { paddingLeft: `${indent}px` } : undefined
})

const InlineRender = defineComponent({
  name: 'AMenuItemInlineRender',
  props: {
    content: {
      type: [Function, Object, String, Number, Boolean] as PropType<any>,
      default: undefined,
    },
  },
  setup(props) {
    return () => props.content ?? null
  },
})
</script>

<template>
  <li
    :class="menuItemClass"
    role="menuitem"
    :title="titleAttr"
    :aria-disabled="isDisabled"
    :style="itemPaddingStyle"
    @click="handleClick"
  >
    <InlineRender
      v-for="(icon, index) in iconNodes"
      :key="icon?.key ?? `icon-${index}`"
      :content="icon"
    />
    <InlineRender v-if="titleContentNode" :content="titleContentNode" />
  </li>
</template>
