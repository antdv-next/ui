<script setup lang="ts">
import type { VNodeNormalizedChildren } from 'vue'
import type { VNodeChildAtom } from '../_utils/checker'
import type { SpaceCompactProps } from './define'
import { isEmpty } from 'es-toolkit/compat'
import { computed, toRefs, useSlots } from 'vue'
import { flattenChildren } from '../_utils/checker'
import { classNames } from '../_utils/classNames'
import { useConfigContext } from '../config-provider/context'
import CompactItem from './compact-item.vue'
import { SpaceCompactItemContext } from './define'

defineOptions({
  name: 'ASpaceCompact',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SpaceCompactProps>(), {})

const { block, direction } = toRefs(props)

const ctx = useConfigContext()

const prefixCls = computed(() => ctx.getPrefixCls('space-compact', props.prefixCls))

const compactItemContext = SpaceCompactItemContext.useInject()

const clx = computed(() => {
  return classNames(prefixCls.value, {
    [`${prefixCls.value}-rtl`]: ctx.direction === 'rtl',
    [`${prefixCls.value}-block`]: block.value,
    [`${prefixCls.value}-vertical`]: direction.value === 'vertical',
  })
})

const slots = useSlots()
const flattenChildrenItem = computed(() => flattenChildren(slots.default?.() || []))
const noCompactItemContext = computed(() => !compactItemContext || isEmpty(compactItemContext))

function getChildrenKey(child: VNodeChildAtom | VNodeNormalizedChildren, index: number) {
  return (child && typeof child === 'object' && 'key' in child && child.key as PropertyKey) || `${prefixCls.value}-item-${index}`
}
</script>

<template>
  <div v-if="flattenChildrenItem.length > 0" v-bind="$attrs" :class="[clx, $attrs.class]">
    <CompactItem
      v-for="(item, index) in flattenChildrenItem"
      :key="getChildrenKey(item, index)"
      :compact-size="size ?? 'middle'"
      :compact-direction="direction"
      :is-first-item="index === 0 && (noCompactItemContext || compactItemContext.isFirstItem)"
      :is-last-item="index === flattenChildrenItem.length - 1 && (noCompactItemContext || compactItemContext?.isLastItem)"
    >
      <component :is="item" />
    </CompactItem>
  </div>
</template>
