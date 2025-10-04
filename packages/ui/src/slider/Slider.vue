<script setup lang="ts">
import type { SliderProps as VcSliderProps } from '@v-c/slider'
import type { VNode } from 'vue'
import type { TooltipPlacement } from '../tooltip'
import type { Formatter, SliderEmits, SliderRangeProps, SliderSingleProps, SliderSlots, SliderTooltipProps } from './define'
import VcSlider from '@v-c/slider'
import raf from '@v-c/util/dist/raf'
import { cloneElement } from '@v-c/util/dist/vnode'
import { computed, h, onMounted, onUnmounted, ref } from 'vue'
import { useComponentConfig } from '../config-provider/context'
import { useDisabled } from '../config-provider/disabled-context'
import { useInjectSliderInternal } from './context'
import SliderTooltip from './SliderTooltip.vue'
import useRafLock from './useRafLock'

defineOptions({ name: 'ASlider' })
const props = defineProps<SliderRangeProps | SliderSingleProps>()
const emit = defineEmits<SliderEmits>()
defineSlots<SliderSlots>()
const valueModel = defineModel('value')

function getTipFormatter(tipFormatter?: Formatter, legacyTipFormatter?: Formatter) {
  if (tipFormatter || tipFormatter === null) {
    return tipFormatter
  }
  if (legacyTipFormatter || legacyTipFormatter === null) {
    return legacyTipFormatter
  }
  return (val?: number) => (typeof val === 'number' ? val.toString() : '')
}

const vertical = computed(() => props.vertical)
const context = useComponentConfig('slider')
const contextDisabled = useDisabled()
const mergedDisabled = computed(() => contextDisabled.disabled?.value || props.disabled)
const contextSlider = useInjectSliderInternal()
const mergedDirection = computed(() => contextSlider?.direction || context.value.direction)
const isRTL = computed(() => mergedDirection.value === 'rtl')
const [hoverOpen, setHoverOpen] = useRafLock()
const [focusOpen, setFocusOpen] = useRafLock()
const tooltipProps = computed<SliderTooltipProps>(() => ({
  ...props.tooltip,
}))
const {
  open: tooltipOpen,
  placement: tooltipPlacement,
  getPopupContainer: getTooltipPopupContainer,
  prefixCls: customizeTooltipPrefixCls,
  formatter: tipFormatter,
} = tooltipProps.value
const lockOpen = computed(() => tooltipOpen ?? props.tooltipVisible)
const activeOpen = computed(() => (hoverOpen.value || focusOpen.value) && lockOpen.value)

const mergedTipFormatter = getTipFormatter(tipFormatter, props.tipFormatter)

// ============================= Change ==============================
const [dragging, setDragging] = useRafLock()
const onInternalChangeComplete: VcSliderProps['onChangeComplete'] = (nextValues) => {
  emit('changeComplete', nextValues as any)
  setDragging(false)
}
const onInternalChange: VcSliderProps['onChange'] = (nextValues) => {
  valueModel.value = nextValues
  emit('change', nextValues as any)
}
// ============================ Placement ============================
function getTooltipPlacement(placement?: TooltipPlacement, vert?: boolean) {
  if (placement) {
    return placement
  }
  if (!vert) {
    return 'top'
  }
  return isRTL.value ? 'left' : 'right'
}

// ============================== Style ===============================
const prefixCls = context.value.getPrefixCls('slider', props.prefixCls)

const rootClassNames = computed(() => [
  {
    [`${prefixCls}-rtl`]: isRTL.value,
    [`${prefixCls}-lock`]: dragging.value,
  },
])

function onMouseUp() {
  // Delay for 1 frame to make the click to enable hide tooltip
  // even when the handle is focused
  raf(() => {
    setFocusOpen(false)
  }, 1)
}
onMounted(() => {
  document.addEventListener('mouseup', onMouseUp)
})
onUnmounted(() => {
  document.removeEventListener('mouseup', onMouseUp)
})

const useActiveTooltipHandle = computed(() => {
  return props.range && !lockOpen.value
})

const mergedOpen = ref((lockOpen.value || activeOpen.value) && mergedTipFormatter !== null)
const handleRender = computed(() => {
  return ({
    index,
    value,
    node,
  }: { index: number, prefixCls: string, value: number, node: VNode }) => {
    const nodeProps = node.props

    const passedProps: typeof nodeProps = {
      ...nodeProps,
      onMouseenter: (e: MouseEvent) => {
        setHoverOpen(true)
        emit('mouseenter', e)
      },
      onMouseleave: (e: MouseEvent) => {
        setHoverOpen(false)
        emit('mouseleave', e)
      },
      onMousedown: (e: MouseEvent) => {
        setFocusOpen(true)
        setDragging(true)
        emit('mousedown', e)
      },
      onFocus: (e: FocusEvent) => {
        setFocusOpen(true)
        emit('focus', e, true)
      },
      onBlur: (e: FocusEvent) => {
        setFocusOpen(false)
        emit('blur', e, true)
      },
    }

    const cloneNode = cloneElement(node, passedProps)
    if (!useActiveTooltipHandle.value) {
      return h(SliderTooltip, {
        ...tooltipProps.value,
        key: index,
        prefixCls: context.value.getPrefixCls('tooltip', customizeTooltipPrefixCls ?? props.tooltipPrefixCls),
        title: mergedTipFormatter ? mergedTipFormatter(value) : '',
        value,
        open: mergedOpen.value,
        'onUpdate:open': (open: boolean) => {
          mergedOpen.value = open
        },
        placement: getTooltipPlacement(tooltipPlacement ?? tooltipPlacement, vertical.value),
        getPopupContainer: getTooltipPopupContainer || props.tooltipPopupContainer || props.getPopupContainer,
      }, {
        default: () => cloneNode,
      })
    }
    return cloneNode
  }
})

const activeHandleRender = computed(() => {
  return ({ value, draggingDelete, node }: { value: number, node: VNode, draggingDelete: boolean }) => {
    if (useActiveTooltipHandle.value) {
      const cloneNode = cloneElement(node, {
        style: {
          visibility: 'hidden',
        },
      })
      return h(SliderTooltip, {
        ...tooltipProps.value,
        key: 'tooltip',
        prefixCls: context.value.getPrefixCls('tooltip', customizeTooltipPrefixCls ?? props.tooltipPrefixCls),
        title: mergedTipFormatter ? mergedTipFormatter(value) : '',
        value,
        open: true,
        placement: getTooltipPlacement(tooltipPlacement ?? tooltipPlacement, vertical.value),
        getPopupContainer: getTooltipPopupContainer || props.tooltipPopupContainer || props.getPopupContainer,
        draggingDelete,
      }, {
        default: () => cloneNode,
      })
    }
  }
})
</script>

<template>
  <VcSlider
    :value="value"
    :step="step"
    :range="range"
    :marks="marks"
    :class="rootClassNames"
    :class-names="classNames"
    :style="$attrs.style"
    :styles="styles"
    :disabled="mergedDisabled"
    :reverse="reverse"
    :vertical="vertical"
    :prefix-cls="prefixCls"
    :handle-render="handleRender"
    :active-handle-render="activeHandleRender"
    @change-complete="onInternalChangeComplete"
    @change="onInternalChange"
  >
    <template #mark="{ point, label }">
      <slot name="mark" v-bind="{ point, label }" />
    </template>
  </VcSlider>
</template>

<style scoped>

</style>
