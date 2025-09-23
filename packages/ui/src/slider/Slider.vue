<script setup lang="ts">
import type { SliderProps as VcSliderProps } from '@v-c/slider'
import type { TooltipPlacement } from '../tooltip'
import type { Formatter, SliderProps, SliderSingleProps, SliderTooltipProps, SliderBaseProps, SliderEmits, SliderSlots } from './define'
import VcSlider from '@v-c/slider'
import raf from '@v-c/util/dist/raf'
import { cloneElement } from '@v-c/util/dist/vnode'
import { computed, h, onMounted, onUnmounted } from 'vue'
import { useComponentConfig } from '../config-provider/context'
import { useDisabled } from '../config-provider/disabled-context'
import { useInjectSliderInternal } from './context'
import SliderTooltip from './SliderTooltip.vue'
import useRafLock from './useRafLock'

defineOptions({ name: 'ASlider' })
const props = defineProps<SliderBaseProps>()
const emit = defineEmits<SliderEmits>()
defineSlots<SliderSlots>()

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
const mergedDisabled = computed(() => contextDisabled?.value || props.disabled)
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
const lockOpen = tooltipOpen ?? props.tooltipVisible
const activeOpen = (hoverOpen || focusOpen) && lockOpen

const mergedTipFormatter = getTipFormatter(tipFormatter, props.tipFormatter)

// ============================= Change ==============================
const [dragging, setDragging] = useRafLock()
const onInternalChangeComplete: VcSliderProps['onChangeComplete'] = (nextValues) => {
  emit('changeComplete', nextValues as any)
  setDragging(false)
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

const useActiveTooltipHandle = computed(() => props.range && !lockOpen)
function handleRender({
  index,
  prefixCls,
  value,
  node,
}: VcSliderProps['handleRender']) {
  const nodeProps = node.props

  function proxyEvent(
    eventName: unknown,
    event: Event,
    triggerRestPropsEvent?: boolean,
  ) {
    if (triggerRestPropsEvent) {
      (props as any)[eventName]?.(event)
    }

    (nodeProps as any)[eventName]?.(event)
  }

  const passedProps: typeof nodeProps = {
    ...nodeProps,
    onMouseenter: (e: MouseEvent) => {
      setHoverOpen(true)
      proxyEvent('onMouseenter', e)
    },
    onMouseleave: (e: MouseEvent) => {
      setHoverOpen(false)
      proxyEvent('onMouseleave', e)
    },
    onMousedown: (e: MouseEvent) => {
      setFocusOpen(true)
      setDragging(true)
      proxyEvent('onMousedown', e)
    },
    onFocus: (e: FocusEvent) => {
      setFocusOpen(true)
      emit('focus', e)
      proxyEvent('onFocus', e, true)
    },
    onBlur: (e: FocusEvent) => {
      setFocusOpen(false)
      emit('blur', e)
      proxyEvent('onBlur', e, true)
    },
  }

  const cloneNode = cloneElement(node, passedProps)

  const open = (lockOpen || activeOpen) && mergedTipFormatter !== null
  if (!useActiveTooltipHandle.value) {
    return h(SliderTooltip, {
      ...tooltipProps.value,
      key: index,
      prefixCls: context.value.getPrefixCls('tooltip', customizeTooltipPrefixCls ?? props.tooltipPrefixCls),
      title: mergedTipFormatter ? mergedTipFormatter(value) : '',
      value,
      open,
      placement: getTooltipPlacement(tooltipPlacement ?? tooltipPlacement, vertical.value),
      classNames: { root: `${prefixCls}-tooltip` },
      getPopupContainer: getTooltipPopupContainer || props.tooltipPopupContainer || props.getPopupContainer,
    }, cloneNode)
  }
  return cloneNode
}

function activeHandleRender({ value, draggingDelete, node }: SliderProps['activeHandleRender']) {
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
      open: mergedTipFormatter !== null && activeOpen,
      placement: getTooltipPlacement(tooltipPlacement ?? tooltipPlacement, vertical.value),
      classNames: { root: `${prefixCls}-tooltip` },
      getPopupContainer: getTooltipPopupContainer || props.tooltipPopupContainer || props.getPopupContainer,
      draggingDelete,
    }, cloneNode)
  }
}
</script>

<template>
  <VcSlider
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
  >
    <template #mark="{ point, label }">
      <slot name="mark" v-bind="{ point, label }" />
    </template>
  </VcSlider>
</template>

<style scoped>

</style>
