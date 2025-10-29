<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { SingleNumberProps, UnitNumberProps } from './define'

import { computed, h, onUnmounted, reactive, ref, watch } from 'vue'
import RenderComponent from '../_utils/renderComponent.vue'

defineOptions({
  name: 'SingleNumber',
})

const props = defineProps<SingleNumberProps>()

const originValue = computed(() => Number(props.value))
const originCount = computed(() => Math.abs(props.count!))

const state = reactive({
  prevValue: originValue.value,
  prevCount: originCount.value,
})

function getOffset(start: number, end: number, unit: -1 | 1) {
  let index = start
  let offset = 0

  while ((index + 10) % 10 !== end) {
    index += unit
    offset += unit
  }

  return offset
}

function UnitNumber({
  prefixCls,
  value,
  current,
  offset = 0,
}: UnitNumberProps) {
  let style: CSSProperties | undefined

  if (offset) {
    style = {
      position: 'absolute',
      top: `${offset}00%`,
      left: 0,
    }
  }

  return h(
    'p',
    {
      style,
      class: {
        [`${prefixCls}-only-unit`]: true,
        current,
      },
    },
    [value],
  )
}

// ============================= Events =============================
function onTransitionEnd() {
  state.prevValue = originValue.value
  state.prevCount = originCount.value
}

const timeout = ref()
// Fallback if transition event not support
watch(
  originValue,
  () => {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
      onTransitionEnd()
    }, 1000)
  },
  { flush: 'post' },
)
onUnmounted(() => {
  clearTimeout(timeout.value)
})

const offsetStyle = computed(() => {
  const value = originValue.value
  if (
    state.prevValue === value
    || Number.isNaN(value)
    || Number.isNaN(state.prevValue)
  ) {
    return {
      transition: 'none',
    }
  }

  // Calculate container offset value
  const unit = state.prevCount < originCount.value ? 1 : -1
  return {
    transform: `translateY(${-getOffset(state.prevValue, value, unit)}00%)`,
  }
})

const unitNodes = computed(() => {
  const value = originValue.value

  if (
    state.prevValue === value
    || Number.isNaN(value)
    || Number.isNaN(state.prevValue)
  ) {
    return [UnitNumber({ ...props, current: true } as UnitNumberProps)]
  }

  const unitNumberList: number[] = []
  // Fill basic number units
  const end = value + 10

  for (let index = value; index <= end; index += 1) {
    unitNumberList.push(index)
  }

  // Fill with number unit nodes
  const prevIndex = unitNumberList.findIndex(
    (n: number) => n % 10 === state.prevValue,
  )

  return unitNumberList.map((n, index) => {
    const singleUnit = n % 10
    return UnitNumber({
      ...props,
      value: singleUnit,
      offset: index - prevIndex,
      current: index === prevIndex,
    } as UnitNumberProps)
  })
})
</script>

<template>
  <span
    :class="[`${prefixCls}-only`]"
    :style="offsetStyle"
    @transitionend="onTransitionEnd"
  >
    <RenderComponent :render="unitNodes" />
  </span>
</template>
