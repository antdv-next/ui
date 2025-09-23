<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import type { CSSProperties, PropType } from 'vue'
import type { TooltipEmits, TooltipProps, TooltipSlots } from './define'
import { arrow, autoUpdate, flip, limitShift, offset, shift, useFloating } from '@floating-ui/vue'
import { onClickOutside } from '@vueuse/core'
import { computed, defineComponent, nextTick, onBeforeUnmount, ref, shallowRef, useAttrs, useSlots, watch } from 'vue'
import { classNames } from '../_utils/classNames.ts'
import { useZIndex, useZIndexProvider } from '../_utils/hooks/useZIndex.ts'
import { useComponentConfig } from '../config-provider/context'
import { convertPlacement, parseColor } from './util.ts'

defineOptions({
  name: 'ATooltip',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<TooltipProps>(),
  {
    placement: 'top',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrow: true,
    destroyOnHidden: false,
    autoAdjustOverflow: true,
    defaultOpen: false,
    open: undefined,
    zIndex: 1070,
  },
)

const emit = defineEmits<TooltipEmits>()

defineSlots<TooltipSlots>()
const slots = useSlots()
const attrs = useAttrs()

const ARROW_SAFE_INSET = 10
const ARROW_ALIGNED_INSET = 4
// ============================ zIndex ============================
const [zIndex, contextZIndex] = useZIndex('Tooltip', props.zIndex)
useZIndexProvider(contextZIndex)

// 内部状态
const isOpen = ref(props.open ?? props.defaultOpen)
const parentContext = useComponentConfig('tooltip')
const delayTimer = ref<ReturnType<typeof setTimeout>>()

// DOM 引用
const reference = shallowRef<HTMLElement>()
const floating = shallowRef<HTMLDivElement>()
const arrowRef = shallowRef<HTMLDivElement>()

// 计算属性
const prefixCls = computed(() => {
  const getPrefixCls = parentContext.value?.getPrefixCls
  const attrPrefix = (attrs.prefixCls as string | undefined) || (attrs['prefix-cls'] as string | undefined)
  const customPrefix = props.prefixCls ?? attrPrefix

  if (getPrefixCls) {
    return getPrefixCls('tooltip', customPrefix)
  }

  return customPrefix || 'ant-tooltip'
})

const transitionName = computed(() => props.transitionName || 'ant-zoom-big-fast')

const transitionClasses = computed(() => {
  const base = `${transitionName.value}`
  const cls = {
    enterFrom: `${base}-enter`,
    enterActive: `${base}-enter ${base}-enter-active`,
    enterTo: `${base}-enter ${base}-enter-active`,
    leaveFrom: `${base}-leave`,
    leaveActive: `${base}-leave ${base}-leave-active`,
    leaveTo: `${base}-leave ${base}-leave-active`,
    appearFrom: `${base}-appear`,
    appearActive: `${base}-appear ${base}-appear-active`,
    appearTo: `${base}-appear ${base}-appear-active`,
  }
  return cls
})

const floatingPlacement = computed(() => {
  return convertPlacement(props.placement) as Placement
})

const mergedOpen = computed(() => props.open ?? isOpen.value)
const mergedTrigger = computed(() => Array.isArray(props.trigger) ? props.trigger : [props.trigger])

const floatingReady = ref(false)
const MAX_POSITION_ATTEMPTS = 5
let rafId: number | null = null

function cancelPositionRaf() {
  if (rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

watch(mergedOpen, (open) => {
  if (open) {
    floatingReady.value = false
    nextTick(() => {
      waitForPosition()
    })
  } else {
    cancelPositionRaf()
    floatingReady.value = false
  }
})

// floating-ui 中间件
const middleware = computed(() => {
  const middlewares = []

  // 偏移距离 - 如果有箭头，需要包含箭头的高度
  // --ant-size-popup-arrow 是 16px，箭头实际占用的空间大约是一半 (8px)
  const offsetValue = props.arrow ? 8 : 4
  middlewares.push(offset(offsetValue))

  if (props.autoAdjustOverflow) {
    middlewares.push(flip())

    const shiftOptions: {
      padding: number
      crossAxis: boolean
      limiter?: ReturnType<typeof limitShift>
    } = {
      padding: 5,
      crossAxis: true,
    }

    if (props.arrow) {
      shiftOptions.limiter = limitShift({
        crossAxis: true,
        offset: ({ placement, rects }) => {
          const [basePlacement, alignment] = placement.split('-') as [string, string | undefined]
          const arrowEl = arrowRef.value
          const arrowSize = (arrowEl?.offsetWidth ?? 16) / 2
          const limit = basePlacement === 'top' || basePlacement === 'bottom'
            ? rects.floating.width / 2 - arrowSize
            : rects.floating.height / 2 - arrowSize

          const constrainedLimit = Math.max(limit, 0)
          const buffer = alignment ? ARROW_ALIGNED_INSET : ARROW_SAFE_INSET
          const releaseBuffer = Math.min(buffer, constrainedLimit)

          return {
            crossAxis: Math.max(constrainedLimit - releaseBuffer, 0),
          }
        },
      })
    }

    middlewares.push(shift(shiftOptions))
  }

  if (props.arrow) {
    middlewares.push(arrow({
      element: arrowRef,
      padding: {
        left: ARROW_SAFE_INSET,
        right: ARROW_SAFE_INSET,
        top: ARROW_ALIGNED_INSET,
        bottom: ARROW_ALIGNED_INSET,
      },
    }))
  }

  return middlewares
})

// floating-ui
const {
  floatingStyles,
  placement: actualPlacement,
  middlewareData,
  x,
  y,
} = useFloating(reference, floating, {
  placement: floatingPlacement,
  middleware,
  transform: false,
  whileElementsMounted: autoUpdate,
})
function waitForPosition(attempt = 0) {
  cancelPositionRaf()
  rafId = requestAnimationFrame(() => {
    if (!mergedOpen.value) {
      rafId = null
      return
    }

    const hasPosition = x.value != null && y.value != null

    if (hasPosition || attempt >= MAX_POSITION_ATTEMPTS) {
      floatingReady.value = true
      rafId = null
      return
    }

    waitForPosition(attempt + 1)
  })
}
const basePlacement = computed(() => {
  const placement = actualPlacement.value || floatingPlacement.value
  return (placement || 'top').split('-')[0]
})

const alignment = computed(() => {
  const placement = actualPlacement.value || floatingPlacement.value
  const [, align] = (placement || 'top').split('-') as [string, string | undefined]
  return align
})

const isVerticalPlacement = computed(() => basePlacement.value === 'top' || basePlacement.value === 'bottom')
const isHorizontalPlacement = computed(() => basePlacement.value === 'left' || basePlacement.value === 'right')

const colorInfo = computed(() => {
  return parseColor(prefixCls.value, props.color)
})

const arrowX = computed(() => {
  let value = middlewareData.value?.arrow?.x
  if (basePlacement.value === 'top' || basePlacement.value === 'bottom') {
    const arrowEl = arrowRef.value
    const arrowWidth = arrowEl?.offsetWidth ?? 0
    if (alignment.value === 'start') {
      value = ARROW_SAFE_INSET
    } else if (alignment.value === 'end') {
      const floatingWidth = floating.value?.offsetWidth ?? 0
      value = floatingWidth - arrowWidth - ARROW_SAFE_INSET
    }
  }

  return typeof value === 'number' ? value : null
})

const arrowY = computed(() => {
  const value = middlewareData.value?.arrow?.y
  return typeof value === 'number' ? value : null
})

const arrowPosition = computed(() => {
  const arrowEl = arrowRef.value
  const arrowWidth = arrowEl?.offsetWidth ?? 0
  const arrowHeight = arrowEl?.offsetHeight ?? 0
  const correctedX = arrowX.value != null && isVerticalPlacement.value && !alignment.value && arrowWidth
    ? arrowX.value + arrowWidth / 2
    : arrowX.value

  const correctedY = arrowY.value != null && isHorizontalPlacement.value && !alignment.value && arrowHeight
    ? arrowY.value + arrowHeight / 2
    : arrowY.value

  return {
    x: correctedX,
    y: correctedY,
  }
})

// 监听 props.open 的变化
watch(() => props.open, (newOpen) => {
  if (newOpen !== undefined) {
    isOpen.value = newOpen
  }
})

// Content to display
const tooltipContent = computed(() => {
  const title = props.title
  const overlay = props.overlay
  if (title === 0)
    return title
  if (overlay)
    return overlay
  if (title)
    return title
  return ''
})

// Event handlers
function clearDelayTimer() {
  if (delayTimer.value) {
    clearTimeout(delayTimer.value)
    delayTimer.value = undefined
  }
}

function setOpen(open: boolean, delay?: number) {
  clearDelayTimer()

  if (delay && delay > 0) {
    delayTimer.value = setTimeout(() => {
      setOpenImmediately(open)
    }, delay * 1000)
  } else {
    setOpenImmediately(open)
  }
}

function setOpenImmediately(open: boolean) {
  // Don't show tooltip if no content
  const slotHasTitle = !!slots?.title
  const slotHasOverlay = !!slots?.overlay
  const hasContent = !!(tooltipContent.value || tooltipContent.value === 0 || slotHasTitle || slotHasOverlay)
  const finalOpen = hasContent && open

  if (finalOpen === isOpen.value)
    return

  isOpen.value = finalOpen

  emit('update:open', finalOpen)
  emit('openChange', finalOpen)
  emit('update:visible', finalOpen)
  emit('visibleChange', finalOpen)

  nextTick(() => {
    props.afterOpenChange?.(finalOpen)
  })
}

// Trigger event handlers
function onMouseEnter() {
  if (mergedTrigger.value.includes('hover')) {
    setOpen(true, props.mouseEnterDelay)
  }
}

function onMouseLeave() {
  if (mergedTrigger.value.includes('hover')) {
    setOpen(false, props.mouseLeaveDelay)
  }
}

function onClick() {
  if (mergedTrigger.value.includes('click')) {
    setOpen(!mergedOpen.value)
  }
}

function onFocus() {
  if (mergedTrigger.value.includes('focus')) {
    setOpen(true)
  }
}

function onBlur() {
  if (mergedTrigger.value.includes('focus')) {
    setOpen(false)
  }
}

function onContextMenu(e: MouseEvent) {
  if (mergedTrigger.value.includes('contextMenu')) {
    e.preventDefault()
    setOpen(true)
  }
}

// Reference element management
function addEventListeners(el: HTMLElement) {
  if (mergedTrigger.value.includes('hover')) {
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
  }
  if (mergedTrigger.value.includes('click')) {
    el.addEventListener('click', onClick)
  }
  if (mergedTrigger.value.includes('focus')) {
    el.addEventListener('focus', onFocus)
    el.addEventListener('blur', onBlur)
  }
  if (mergedTrigger.value.includes('contextMenu')) {
    el.addEventListener('contextmenu', onContextMenu)
  }
}

function removeEventListeners(el: HTMLElement) {
  el.removeEventListener('mouseenter', onMouseEnter)
  el.removeEventListener('mouseleave', onMouseLeave)
  el.removeEventListener('click', onClick)
  el.removeEventListener('focus', onFocus)
  el.removeEventListener('blur', onBlur)
  el.removeEventListener('contextmenu', onContextMenu)
}

function getReferenceDom(el: Element) {
  if (reference.value) {
    removeEventListeners(reference.value)
  }
  if (el?.nextElementSibling) {
    reference.value = el.nextElementSibling as HTMLElement
    addEventListeners(reference.value)
  }
}

onBeforeUnmount(() => {
  clearDelayTimer()
  if (reference.value) {
    removeEventListeners(reference.value)
  }
  cancelPositionRaf()
})

// Styles and classes
const cls = computed(() => {
  // 将 floating-ui 的 placement 转换回 Ant Design 的格式
  const antdPlacement = convertFloatingPlacementToAntd(actualPlacement.value || props.placement)
  return classNames(
    prefixCls.value,
    `${prefixCls.value}-placement-${antdPlacement}`,
    {
      [`${prefixCls.value}-hidden`]: !mergedOpen.value,
    },
    colorInfo.value.className,
    props.rootClassName,
    props.overlayClassName,
    props.classNames?.root,
  )
})

// 转换 floating-ui 的 placement 格式回 Ant Design 格式
function convertFloatingPlacementToAntd(placement: string): string {
  switch (placement) {
    case 'top-start': return 'topLeft'
    case 'top-end': return 'topRight'
    case 'bottom-start': return 'bottomLeft'
    case 'bottom-end': return 'bottomRight'
    case 'left-start': return 'leftTop'
    case 'left-end': return 'leftBottom'
    case 'right-start': return 'rightTop'
    case 'right-end': return 'rightBottom'
    default: return placement
  }
}

type CssVars = CSSProperties & Record<string, string | number | undefined>

const tooltipStyles = computed(() => {
  const style: CssVars = {
    ...floatingStyles.value,
    zIndex: zIndex.value || 1070,
    ...colorInfo.value.overlayStyle,
    ...props.overlayStyle,
    ...props.styles?.root,
  }

  if (arrowPosition.value.x != null) {
    style['--arrow-x'] = `${arrowPosition.value.x}px`
    if (isVerticalPlacement.value)
      style['--arrow-offset-horizontal'] = `${arrowPosition.value.x}px`
    else
      delete style['--arrow-offset-horizontal']
  } else {
    delete style['--arrow-x']
    delete style['--arrow-offset-horizontal']
  }

  if (arrowPosition.value.y != null) {
    style['--arrow-y'] = `${arrowPosition.value.y}px`
  } else {
    delete style['--arrow-y']
  }

  return style
})

const innerStyles = computed(() => {
  return {
    ...colorInfo.value.overlayStyle,
    ...props.overlayInnerStyle,
    ...props.styles?.body,
  }
})

const innerClasses = computed(() => {
  return classNames(
    `${prefixCls.value}-inner`,
    props.classNames?.body,
  )
})

// Arrow styles - 让 CSS 完全控制箭头的位置和样式
const arrowStyles = computed(() => {
  if (!props.arrow) {
    return { display: 'none' }
  }

  const style: CssVars = {
    ...colorInfo.value.arrowStyle,
  }

  if (arrowPosition.value.x != null) {
    style.left = `${arrowPosition.value.x}px`
    style.right = 'auto'
  } else {
    delete style.left
    delete style.right
  }

  if (arrowPosition.value.y != null) {
    style.top = `${arrowPosition.value.y}px`
    style.bottom = 'auto'
  } else {
    delete style.top
    delete style.bottom
  }

  return style
})

const InlineRender = defineComponent({
  name: 'ATooltipInlineRender',
  props: {
    content: {
      type: [Function, Object, String, Number, Boolean] as PropType<any>,
      default: undefined,
    },
  },
  setup(props) {
    return () => {
      const value = props.content
      if (typeof value === 'function')
        return value()
      return value ?? null
    }
  },
})

// Expose API for ref
const tooltipRef = {
  forceAlign: () => {
    // floating-ui auto updates, no manual align needed
  },
  get nativeElement() {
    return reference.value || null
  },
  get popupElement() {
    return floating.value || null
  },
}

defineExpose(tooltipRef)

onClickOutside(
  floating,
  () => {
    if (mergedOpen.value) {
      setOpen(false)
    }
  },
  {
    ignore: [reference, arrowRef],
  },
)
</script>

<template>
  <component :is="$slots.default" :ref="getReferenceDom" />
  <Teleport :disabled="!reference" :to="props.getPopupContainer?.(reference!) || 'body'">
    <Transition
      appear
      :enter-active-class="transitionClasses.enterActive"
      :enter-from-class="transitionClasses.enterFrom"
      :enter-to-class="transitionClasses.enterTo"
      :leave-active-class="transitionClasses.leaveActive"
      :leave-from-class="transitionClasses.leaveFrom"
      :leave-to-class="transitionClasses.leaveTo"
      :appear-active-class="transitionClasses.appearActive"
      :appear-from-class="transitionClasses.appearFrom"
      :appear-to-class="transitionClasses.appearTo"
    >
      <div
        v-if="mergedOpen"
        ref="floating"
        :class="cls"
        :style="tooltipStyles"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <!-- Arrow -->
        <div
          v-if="props.arrow"
          ref="arrowRef"
          :class="`${prefixCls}-arrow`"
          :style="arrowStyles"
        >
          <span :class="`${prefixCls}-arrow-content`" />
        </div>

        <!-- Content -->
        <div :class="innerClasses" :style="innerStyles">
          <template v-if="$slots.title">
            <slot name="title" />
          </template>
          <template v-else-if="$slots.overlay">
            <slot name="overlay" />
          </template>
          <template v-else>
            <InlineRender :content="tooltipContent" />
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
