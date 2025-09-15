<script setup lang="ts">
import type { TooltipEmits, TooltipProps, TooltipRef } from './define'
import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { useFloating } from '@floating-ui/vue'
import { unrefElement } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import { classNames } from '../_utils/classNames'
import { convertPlacement, parseColor } from './util'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrow: true,
  destroyOnHidden: false,
  autoAdjustOverflow: true,
  defaultOpen: false,
  open: undefined,
  visible: undefined,
})

const emit = defineEmits<TooltipEmits>()

// Refs
const reference = ref<HTMLElement>()
const floating = ref<HTMLDivElement>()
const arrowRef = ref<HTMLDivElement>()

// State
const isOpen = ref(props.open ?? props.visible ?? props.defaultOpen)
const delayTimer = ref<ReturnType<typeof setTimeout>>()

// Computed
const mergedOpen = computed(() => props.open ?? props.visible ?? isOpen.value)
const mergedTrigger = computed(() => Array.isArray(props.trigger) ? props.trigger : [props.trigger])

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

// Show arrow
const showArrow = computed(() => {
  if (typeof props.arrow === 'boolean')
    return props.arrow
  if (typeof props.arrow === 'object')
    return true
  return true
})

// Convert placement to floating-ui format
const floatingPlacement = computed(() => {
  return convertPlacement(props.placement) as any
})

// Floating UI
const middleware = computed(() => {
  const mw = [
    offset(8),
    flip(),
    shift({ padding: 8 }),
  ]

  if (showArrow.value && arrowRef.value) {
    mw.push(arrow({
      element: arrowRef.value,
      padding: 8,
    }))
  }

  return mw
})

const { floatingStyles, middlewareData, placement } = useFloating(reference, floating, {
  placement: floatingPlacement,
  middleware,
  whileElementsMounted: autoUpdate,
})

// Arrow styles
const arrowStyles = computed(() => {
  const arrowData = middlewareData.value.arrow
  if (!arrowData || !showArrow.value)
    return {}

  const currentPlacement = placement.value
  const side = currentPlacement.split('-')[0]
  const alignment = currentPlacement.split('-')[1]

  const styles: Record<string, string> = {}

  // 新策略：
  // 1. 基础位置（top, bottom, left, right）：完全不使用 floating-ui 的箭头位置
  // 2. 边缘位置：使用 floating-ui 的精确位置
  // 3. 这样可以确保基础位置始终居中

  if (!alignment) {
    // 基础位置：不应用任何 floating-ui 计算的位置，让 CSS 完全控制
    return {}
  }

  // 边缘位置：使用 floating-ui 的计算
  const { x, y } = arrowData

  if (side === 'top' || side === 'bottom') {
    if (x != null) {
      styles.left = `${x}px`
    }
  } else if (side === 'left' || side === 'right') {
    if (y != null) {
      styles.top = `${y}px`
    }
  }

  return styles
})
const prefixCls = 'ant-tooltip'

// Color and theme handling
const colorInfo = computed(() => {
  return parseColor(prefixCls, props.color)
})

// Classes
const tooltipClasses = computed(() => {
  return classNames(
    prefixCls,
    `${prefixCls}-placement-${props.placement}`,
    {
      [`${prefixCls}-hidden`]: !mergedOpen.value,
    },
    colorInfo.value.className,
    props.rootClassName,
    props.overlayClassName,
    props.classNames?.root,
  )
})

const innerClasses = computed(() => {
  return classNames(
    `${prefixCls}-inner`,
    props.classNames?.body,
  )
})

const arrowClasses = computed(() => {
  return classNames(`${prefixCls}-arrow`)
})

// Styles
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

  // props.onOpenChange?.(finalOpen)
  // props.onVisibleChange?.(finalOpen)

  nextTick(() => {
    props.afterOpenChange?.(finalOpen)
    props.afterVisibleChange?.(finalOpen)
  })
}

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

function onClick() {
  if (mergedTrigger.value.includes('click')) {
    setOpen(!mergedOpen.value)
  }
}

function onContextMenu() {
  if (mergedTrigger.value.includes('contextMenu')) {
    setOpen(!mergedOpen.value)
  }
}

// Watch external open state
watch(() => props.open ?? props.visible, (newOpen) => {
  if (newOpen !== undefined) {
    setOpenImmediately(newOpen)
  }
})

// Expose methods
const tooltipRef: TooltipRef = {
  forceAlign: () => {
    // Force recompute position
    nextTick(() => {
      if (floating.value && reference.value) {
        computePosition(reference.value, floating.value, {
          placement: floatingPlacement.value as any,
          middleware: middleware.value,
        })
      }
    })
  },
  forcePopupAlign: () => {
    tooltipRef.forceAlign()
  },
  get nativeElement() {
    return reference.value || null
  },
  get popupElement() {
    return floating.value || null
  },
}

defineExpose(tooltipRef)

// Render content
function renderContent() {
  const content = tooltipContent.value
  if (typeof content === 'function') {
    return (content as () => any)()
  }
  return content
}

function addEventListener(target: HTMLElement) {
  target.addEventListener('mouseenter', onMouseEnter)
  target.addEventListener('mouseleave', onMouseLeave)
  target.addEventListener('focus', onFocus)
  target.addEventListener('blur', onBlur)
  target.addEventListener('click', onClick)
  target.addEventListener('contextmenu', onContextMenu)
}

function removeEventListener(target: HTMLElement) {
  target.removeEventListener('mouseenter', onMouseEnter)
  target.removeEventListener('mouseleave', onMouseLeave)
  target.removeEventListener('focus', onFocus)
  target.removeEventListener('blur', onBlur)
  target.removeEventListener('click', onClick)
  target.removeEventListener('contextmenu', onContextMenu)
}

function getReference(el: any) {
  if (reference.value) {
    removeEventListener(reference.value)
  }
  const _el = unrefElement(el)
  if (_el?.nextElementSibling) {
    reference.value = _el?.nextElementSibling as HTMLElement
    addEventListener(reference.value)
  }
}
</script>

<template>
  <component
    :is="$slots.default"
    :ref="getReference"
    :class="mergedOpen && props.openClassName"
  />

  <!-- Teleport for popup -->
  <Teleport v-if="reference" :to="props.getPopupContainer?.(reference!) || 'body'" :disabled="!mergedOpen || !reference">
    <div
      v-if="mergedOpen && !props.destroyOnHidden"
      ref="floating"
      :class="tooltipClasses"
      :style="tooltipStyles"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <!-- Arrow -->
      <div
        v-if="showArrow"
        ref="arrowRef"
        :class="arrowClasses"
        :style="{
          ...arrowStyles,
          ...colorInfo.arrowStyle,
        }"
      >
        <span class="ant-tooltip-arrow-content" />
      </div>

      <!-- Content -->
      <div :class="innerClasses" :style="innerStyles">
        <div class="ant-tooltip-content">
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
    </div>
  </Teleport>
</template>
