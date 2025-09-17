<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import type { CSSProperties } from 'vue'
import type { TooltipEmits, TooltipProps } from './define'
import { arrow, autoUpdate, flip, limitShift, offset, shift, useFloating } from '@floating-ui/vue'
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, useSlots, watch } from 'vue'
import { classNames } from '../_utils/classNames.ts'
import { useComponentConfig } from '../config-provider/context'
import { convertPlacement, parseColor } from './util.ts'

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
const slots = useSlots()

const ARROW_EDGE_BUFFER = 10

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
  return parentContext.value?.getPrefixCls?.('tooltip') || 'ant-tooltip'
})

const floatingPlacement = computed(() => {
  return convertPlacement(props.placement) as Placement
})

const mergedOpen = computed(() => props.open ?? isOpen.value)
const mergedTrigger = computed(() => Array.isArray(props.trigger) ? props.trigger : [props.trigger])

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
          const basePlacement = placement.split('-')[0]
          const arrowEl = arrowRef.value
          const arrowSize = (arrowEl?.offsetWidth ?? 16) / 2
          const limit = basePlacement === 'top' || basePlacement === 'bottom'
            ? rects.floating.width / 2 - arrowSize
            : rects.floating.height / 2 - arrowSize

          const constrainedLimit = Math.max(limit, 0)
          const releaseBuffer = Math.min(ARROW_EDGE_BUFFER, constrainedLimit)

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
      padding: 4,
    }))
  }

  return middlewares
})

// floating-ui
const { floatingStyles, placement: actualPlacement, middlewareData } = useFloating(reference, floating, {
  placement: floatingPlacement,
  middleware,
  whileElementsMounted: autoUpdate,
})

const basePlacement = computed(() => {
  const placement = actualPlacement.value || floatingPlacement.value
  return (placement || 'top').split('-')[0]
})

const isVerticalPlacement = computed(() => basePlacement.value === 'top' || basePlacement.value === 'bottom')
const isHorizontalPlacement = computed(() => basePlacement.value === 'left' || basePlacement.value === 'right')

const colorInfo = computed(() => {
  return parseColor(prefixCls.value, props.color)
})

const arrowX = computed(() => {
  const value = middlewareData.value?.arrow?.x
  return typeof value === 'number' ? value : null
})

const arrowY = computed(() => {
  const value = middlewareData.value?.arrow?.y
  return typeof value === 'number' ? value : null
})

function clampValue(value: number, min: number, max: number) {
  if (Number.isNaN(value))
    return value

  if (min > max)
    return value

  return Math.min(Math.max(value, min), max)
}

const resolvedArrowX = computed(() => {
  if (arrowX.value == null)
    return null

  const floatingEl = floating.value
  const arrowEl = arrowRef.value
  if (!floatingEl || !arrowEl)
    return arrowX.value

  if (!isVerticalPlacement.value)
    return arrowX.value

  const floatingWidth = floatingEl.offsetWidth
  const arrowWidth = arrowEl.offsetWidth || 0
  if (!floatingWidth || !arrowWidth)
    return arrowX.value

  if (floatingWidth <= arrowWidth)
    return floatingWidth / 2

  const halfArrow = arrowWidth / 2
  const available = Math.max((floatingWidth - arrowWidth) / 2, 0)
  const inset = Math.min(ARROW_EDGE_BUFFER, available)
  const min = halfArrow + inset
  const max = floatingWidth - halfArrow - inset

  if (min > max)
    return floatingWidth / 2

  return clampValue(arrowX.value, min, max)
})

const resolvedArrowY = computed(() => {
  if (arrowY.value == null)
    return null

  const floatingEl = floating.value
  const arrowEl = arrowRef.value
  if (!floatingEl || !arrowEl)
    return arrowY.value

  if (!isHorizontalPlacement.value)
    return arrowY.value

  const floatingHeight = floatingEl.offsetHeight
  const arrowHeight = arrowEl.offsetHeight || 0
  if (!floatingHeight || !arrowHeight)
    return arrowY.value

  if (floatingHeight <= arrowHeight)
    return floatingHeight / 2

  const halfArrow = arrowHeight / 2
  const available = Math.max((floatingHeight - arrowHeight) / 2, 0)
  const inset = Math.min(ARROW_EDGE_BUFFER, available)
  const min = halfArrow + inset
  const max = floatingHeight - halfArrow - inset

  if (min > max)
    return floatingHeight / 2

  return clampValue(arrowY.value, min, max)
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
  const hasContent = !!(tooltipContent.value || tooltipContent.value === 0 || slots?.title)
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
  if (el?.nextSibling) {
    reference.value = el.nextSibling as HTMLElement
    addEventListeners(reference.value)
  }
}

onBeforeUnmount(() => {
  clearDelayTimer()
  if (reference.value) {
    removeEventListeners(reference.value)
  }
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
    zIndex: props.zIndex || 1070,
    ...colorInfo.value.overlayStyle,
    ...props.overlayStyle,
    ...props.styles?.root,
  }

  if (resolvedArrowX.value != null) {
    style['--arrow-x'] = `${resolvedArrowX.value}px`
    if (isVerticalPlacement.value)
      style['--arrow-offset-horizontal'] = `${resolvedArrowX.value}px`
    else
      delete style['--arrow-offset-horizontal']
  } else {
    delete style['--arrow-x']
    delete style['--arrow-offset-horizontal']
  }

  if (resolvedArrowY.value != null) {
    style['--arrow-y'] = `${resolvedArrowY.value}px`
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

  if (resolvedArrowX.value != null) {
    style.left = `${resolvedArrowX.value}px`
    style.right = 'auto'
  } else {
    delete style.left
    delete style.right
  }

  if (resolvedArrowY.value != null) {
    style.top = `${resolvedArrowY.value}px`
    style.bottom = 'auto'
  } else {
    delete style.top
    delete style.bottom
  }

  return style
})

// Render content
function renderContent() {
  const content = tooltipContent.value
  if (typeof content === 'function') {
    return (content as () => any)()
  }
  return content
}

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
</script>

<template>
  <component :is="$slots.default" :ref="getReferenceDom" />
  <Teleport :disabled="!reference" :to="props.getPopupContainer?.(reference!) || 'body'">
    <Transition name="ant-zoom-big-fast" appear>
      <div
        v-show="mergedOpen"
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
            {{ renderContent() }}
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
