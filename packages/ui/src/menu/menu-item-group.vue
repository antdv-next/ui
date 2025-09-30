<script setup lang="ts">
import type { MenuItemGroupProps, MenuItemGroupSlots } from './define.ts'
import { filterEmpty } from '@v-c/util/dist/props-util'
import { computed, h, isVNode, useSlots } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { useMenuContext, useMenuLevel, useMenuPath, useProvideMenuLevel, useProvideMenuPath } from './context.ts'

defineOptions({
  name: 'AMenuItemGroup',
})

const props = defineProps<MenuItemGroupProps>()

const slots = useSlots() as MenuItemGroupSlots

const menuContext = useMenuContext()
const levelRef = useMenuLevel()
const parentPath = useMenuPath()

const prefixCls = computed(() => menuContext.prefixCls.value)

function normalizeChildren(value: any): any[] {
  if (value === undefined || value === null)
    return []
  const arrayValue = Array.isArray(value) ? value : [value]
  return filterEmpty(arrayValue as any)
}

const titleNodes = computed(() => {
  let nodes: any[] = []
  if (slots.title)
    nodes = flattenChildren(normalizeChildren(slots.title?.()))
  else if (typeof props.title === 'function')
    nodes = flattenChildren(normalizeChildren((props.title as () => any)?.()))
  else if (props.title !== undefined)
    nodes = flattenChildren(normalizeChildren(props.title))

  return nodes
    .map((node) => {
      if (isVNode(node))
        return node
      if (typeof node === 'string' || typeof node === 'number')
        return h('span', node)
      return null
    })
    .filter(Boolean)
})

const childLevel = computed(() => levelRef.value + 1)
useProvideMenuLevel(childLevel)
useProvideMenuPath(computed(() => parentPath.value))
</script>

<template>
  <li :class="`${prefixCls}-item-group`" role="presentation">
    <div :class="`${prefixCls}-item-group-title`">
      <template v-if="titleNodes.length">
        <component
          :is="node"
          v-for="(node, index) in titleNodes"
          :key="index"
        />
      </template>
    </div>
    <ul :class="`${prefixCls}-item-group-list`">
      <slot />
    </ul>
  </li>
</template>
