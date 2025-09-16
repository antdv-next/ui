<script setup lang="ts">
import type { VueNode } from '@v-c/util/dist/type'
import type { SpinProps } from './define'
import { filterEmpty } from '@v-c/util/dist/props-util'
import { debounce } from 'es-toolkit/compat'
import { cloneVNode, computed, h, isVNode, onWatcherCleanup, shallowRef, toRefs, useSlots, watch } from 'vue'
import { useConfigContext } from '../config-provider/context'
import DefaultSpin from './default-spin.vue'
import { defaultIndicator, shouldDelay } from './define'

defineOptions({
  name: 'ASpin',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SpinProps>(), {
  size: 'default',
  spinning: true,
  warapperClassName: '',
})

const { spinning, delay, size: _size, tip } = toRefs(props)
const ctx = useConfigContext()
const prefixCls = computed(() => ctx.getPrefixCls('spin', props.prefixCls))
const size = computed(() => _size.value || ctx.size)
const isSpinnig = shallowRef(spinning.value && shouldDelay(spinning.value, delay.value))

watch([() => spinning.value, () => delay.value], () => {
  const updateSpinning = debounce(() => {
    isSpinnig.value = spinning.value
  }, delay.value)

  updateSpinning()

  onWatcherCleanup(() => {
    updateSpinning.cancel()
  })
}, {
  immediate: true,
  flush: 'post',
})

const spinClassName = computed(() => {
  return {
    [prefixCls.value]: true,
    [`${prefixCls.value}-sm`]: size.value === 'small',
    [`${prefixCls.value}-lg`]: size.value === 'large',
    [`${prefixCls.value}-spinning`]: isSpinnig.value,
    [`${prefixCls.value}-show-text`]: !!tip.value,
  }
})

const slots = useSlots()
function renderIndicator(): VueNode {
  let indicator = props.indicator ?? slots.indicator?.()

  // should not be render default indicator when indicator value is null
  if (indicator === null) {
    return null
  }

  if (Array.isArray(indicator)) {
    indicator = filterEmpty(indicator)[0]
  }

  const dotClassName = `${prefixCls.value}-dot`
  if (isVNode(indicator)) {
    return cloneVNode(indicator, { class: dotClassName })
  }

  const vNode = defaultIndicator.value?.()
  if (defaultIndicator.value && isVNode(vNode)) {
    return cloneVNode(vNode, { class: dotClassName })
  }

  return h(DefaultSpin, { dotClassName, prefixCls: prefixCls.value })
}

const renderChildren = computed(() => filterEmpty(slots.default?.() || []))
</script>

<template>
  <div v-if="renderChildren.length" :class="[`${prefixCls}-nested-loading`, warapperClassName]">
    <div v-if="isSpinnig" key="loading">
      <div v-bind="$attrs.divProps || {}" :class="spinClassName" aria-live="polite" :aria-busy="isSpinnig">
        <component :is="renderIndicator()" />

        <div v-if="tip" :class="[`${prefixCls}-text`]">
          <component :is="tip" />
        </div>
      </div>
    </div>

    <div
      key="container" :class="{
        [`${prefixCls}-container`]: true,
        [`${prefixCls}-blur`]: isSpinnig,
      }"
    >
      <component :is="renderChildren" />
    </div>
  </div>

  <template v-else>
    <div v-bind="$attrs.divProps || {}" :class="spinClassName" aria-live="polite" :aria-busy="isSpinnig">
      <component :is="renderIndicator()" />

      <div v-if="tip" :class="[`${prefixCls}-text`]">
        <component :is="tip" />
      </div>
    </div>
  </template>
</template>
