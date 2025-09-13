<script setup lang="ts">
import type { CSSProperties, VNodeNormalizedChildren } from 'vue'
import type { VNodeChildAtom } from '../_utils/checker'
import type { SizeType } from '../config-provider/size-context'
import { computed, ref, toRefs, useSlots, watch } from 'vue'
import { flattenChildren } from '../_utils/checker'
import useFlexGapSupport from '../_utils/hooks/useFlexGapSupport'
import { renderVNode } from '../_utils/node'
import { useConfigContext } from '../config-provider/context'

type SpaceSize = SizeType | number

interface SpaceProps {
  prefixCls?: string
  size: SpaceSize | [SpaceSize, SpaceSize]
  direction?: 'horizontal' | 'vertical'
  align: 'start' | 'end' | 'center' | 'baseline'
  wrap?: boolean
}

defineOptions({
  name: 'ASpace',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SpaceProps>(), {
  direction: 'horizontal',
})

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}

const { align, size: _size, wrap, direction } = toRefs(props)

const ctx = useConfigContext()
const prefixCls = computed(() => ctx.getPrefixCls('space', props.prefixCls))
const horizontalSize = ref<number>()
const verticalSize = ref<number>()

const supportFlexGap = useFlexGapSupport()

const size = computed(() => _size.value ?? ctx?.space ?? 'small')
const marginDirection = computed(() =>
  ctx.direction === 'rtl' ? 'marginLeft' : 'marginRight',
)
const mergedAlign = computed(() =>
  align.value === undefined && direction.value === 'horizontal' ? 'center' : align.value,
)
const cn = computed(() => {
  return {
    [`${prefixCls.value}`]: true,
    [`${prefixCls.value}-${props.direction}`]: true,
    [`${prefixCls.value}-rtl`]: ctx.direction === 'rtl',
    [`${prefixCls.value}-align-${mergedAlign.value}`]: mergedAlign.value,
  }
})

function getNumberSize(size: SpaceSize) {
  return typeof size === 'string' ? spaceSize[size] : size || 0
}

const style = computed(() => {
  const gapStyle: CSSProperties = {}
  if (supportFlexGap.value) {
    gapStyle.columnGap = `${horizontalSize.value}px`
    gapStyle.rowGap = `${verticalSize.value}px`
  }
  return {
    ...gapStyle,
    ...(props.wrap && { flexWrap: 'wrap', marginBottom: verticalSize.value && `${-verticalSize.value}px` }),
  } as CSSProperties
})

const slots = useSlots()
const renderChildren = computed(() => flattenChildren(slots.default?.() || []))
const splitChildren = computed(() => {
  return renderVNode(flattenChildren(slots.split?.()))
})

watch(
  size,
  () => {
    [horizontalSize.value, verticalSize.value] = (
      (Array.isArray(size.value) ? size.value : [size.value, size.value]) as [
        SpaceSize,
        SpaceSize,
      ]
    ).map(item => getNumberSize(item))
  },
  { immediate: true },
)

function getOriginIndex(child: VNodeChildAtom | VNodeNormalizedChildren, defaultIndex: number) {
  const index = renderChildren.value.indexOf(child)
  if (index === -1) {
    return `$$space-${defaultIndex}`
  }
}

const itemClassName = computed(() => `${prefixCls.value}-item`)
const latestIndex = computed(() => renderChildren.value.length - 1)
function calcItemStyle(index: number) {
  let itemStyle: CSSProperties = {}

  if (supportFlexGap.value) {
    return itemStyle
  }

  if (direction.value === 'vertical') {
    if (index < latestIndex.value) {
      itemStyle = { marginBottom: `${horizontalSize.value! / (splitChildren.value ? 2 : 1)}px` }
    }
  } else {
    itemStyle = {
      ...(index < latestIndex.value && {
        [marginDirection.value]: `${horizontalSize.value! / (splitChildren.value ? 2 : 1)}px`,
      }),
      ...(wrap.value && { paddingBottom: `${verticalSize.value}px` }),
    }
  }

  return itemStyle
}
</script>

<template>
  <div v-bind="$attrs" :class="[cn, $attrs.class]" :style="[style, $attrs.style as CSSProperties]">
    <template v-for="(child, index) in renderChildren" :key="getOriginIndex(child, index)">
      <div :class="itemClassName" :style="calcItemStyle(index)">
        <component :is="child" />
      </div>

      <span v-if="index < latestIndex && splitChildren" :class="`${itemClassName}-split`" :style="calcItemStyle(index)">
        <component :is="splitChildren" />
      </span>
    </template>
  </div>
</template>
