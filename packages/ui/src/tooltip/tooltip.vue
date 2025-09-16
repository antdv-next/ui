<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import type { TooltipEmits, TooltipProps } from './define'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
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

// 内部状态
const isOpen = ref(props.open ?? props.defaultOpen)
const parentContext = useComponentConfig('tooltip')
const delayTimer = ref<ReturnType<typeof setTimeout>>()

// DOM 引用
const reference = shallowRef<HTMLElement>()
const floating = shallowRef<HTMLDivElement>()

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

  // 自动调整位置
  if (props.autoAdjustOverflow) {
    middlewares.push(flip())
    middlewares.push(shift({ padding: 5 }))
  }

  return middlewares
})

// floating-ui
const { floatingStyles, placement: actualPlacement } = useFloating(reference, floating, {
  placement: floatingPlacement,
  middleware,
  whileElementsMounted: autoUpdate,
})

const colorInfo = computed(() => {
  return parseColor(prefixCls.value, props.color)
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
  const hasContent = !!(tooltipContent.value || tooltipContent.value === 0)
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

const tooltipStyles = computed(() => {
  return {
    ...floatingStyles.value,
    zIndex: props.zIndex || 1070,
    ...colorInfo.value.overlayStyle,
    ...props.overlayStyle,
    ...props.styles?.root,
  }
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

  return {
    ...colorInfo.value.arrowStyle,
  }
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
  <Teleport :to="props.getPopupContainer?.(reference!) || 'body'" :disabled="!mergedOpen">
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
