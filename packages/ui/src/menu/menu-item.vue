<script setup lang="ts">
import type { Key, MenuItemProps, MenuItemSlots } from './define.ts'
import { computed, h, isVNode, onMounted, onUnmounted, shallowRef, useSlots } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { classNames } from '../_utils/classNames.ts'
import { useMenuContext, useMenuDisabled, useMenuLevel, useMenuPath, useParentMode } from './context.ts'

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
const levelRef = useMenuLevel()
const parentDisabled = useMenuDisabled()
const parentMode = useParentMode()

const prefixCls = computed(() => menuContext.prefixCls?.value ?? 'ant-menu')
const mode = computed(() => menuContext.mode?.value ?? 'vertical')
const inlineIndentValue = computed(() => menuContext.inlineIndent?.value ?? 24)
const selectedKeySet = computed(() => menuContext.selectedKeys?.value ?? new Set<Key>())

const eventKey = computed(() => props.eventKey ?? localKey.value)

const keyPath = computed<Key[]>(() => [eventKey.value, ...parentPathValue.value])

const isDisabled = computed(() => parentDisabled.value || props.disabled)

const isSelected = computed(() => selectedKeySet.value.has(eventKey.value))

const paddingStyle = computed(() => {
  if (mode.value === 'inline' || parentMode.value === 'inline') {
    const indent = inlineIndentValue.value * (levelRef.value - 1)
    return {
      paddingInlineStart: `${Math.max(indent, 0)}px`,
    }
  }
  return undefined
})

const menuItemClass = computed(() => {
  return classNames(
    `${prefixCls.value}-item`,
    {
      [`${prefixCls.value}-item-selected`]: isSelected.value,
      [`${prefixCls.value}-item-disabled`]: isDisabled.value,
      [`${prefixCls.value}-item-danger`]: props.danger,
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

function resolveContent(content?: MenuItemProps['title'] | MenuItemProps['icon'], slot?: () => any) {
  let nodes: any[] = []
  if (slot)
    nodes = flattenChildren(slot())
  else if (typeof content === 'function')
    nodes = flattenChildren((content as () => any)())
  else if (content !== undefined)
    nodes = flattenChildren(content as any)

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

const iconNodes = computed(() => resolveContent(props.icon, slots.icon))
const titleNodes = computed(() => resolveContent(props.title, slots.default))
</script>

<template>
  <li
    :class="menuItemClass"
    role="menuitem"
    :title="titleAttr"
    :aria-disabled="isDisabled"
    @click="handleClick"
  >
    <span :class="`${prefixCls}-item-content`" :style="paddingStyle">
      <span v-if="iconNodes.length" :class="`${prefixCls}-item-icon`">
        <component
          :is="node"
          v-for="(node, index) in iconNodes"
          :key="index"
        />
      </span>
      <span :class="`${prefixCls}-title-content`">
        <template v-if="titleNodes.length">
          <component
            :is="node"
            v-for="(node, index) in titleNodes"
            :key="index"
          />
        </template>
      </span>
    </span>
  </li>
</template>
