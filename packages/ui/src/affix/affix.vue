<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { AffixExpose, AffixProps } from './define'
import { unrefElement, useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import throttleByAnimationFrame from '../_utils/throttleByAnimationFrame'
import { useConfigContext } from '../config-provider/context'
import { AFFIX_STATUS_NONE, AFFIX_STATUS_PREPARE, getDefaultTarget, TRIGGER_EVENTS } from './define'
import { getFixedBottom, getFixedTop, getTargetRect } from './utils'

type InternalAffixProps = AffixProps & { onTestUpdatePosition?: any }
const props = withDefaults(defineProps<InternalAffixProps>(), {
  offsetTop: undefined,
  offsetBottom: undefined,
  target: undefined,
  prefixCls: undefined,
  onChange: undefined,
  onTestUpdatePosition: undefined,
})

const context = useConfigContext()
const affixPrefixCls = context.getPrefixCls('affix', props.prefixCls)

const lastAffix = shallowRef(false)
const affixStyle = ref<CSSProperties>()
const placeholderStyle = ref<CSSProperties>()
const status = shallowRef(AFFIX_STATUS_NONE)
const prevTarget = shallowRef<Window | HTMLElement | null>(null)
const prevListener = shallowRef<EventListener | null>(null)

const placeholderNodeRef = shallowRef<HTMLDivElement>()
const fixedNodeRef = shallowRef<HTMLDivElement>()
const contentRef = shallowRef<HTMLElement>()
const timer = shallowRef<ReturnType<typeof setTimeout> | null>(null)

function targetFunc() {
  const _target = props?.target ?? context.getTargetContainer ?? getDefaultTarget
  return _target?.()
}

const internalOffsetTop = computed(() => {
  const { offsetBottom, offsetTop } = props
  return offsetBottom === undefined && offsetTop === undefined ? 0 : offsetTop
})

// =================== Measure ===================
function measure() {
  if (
    status.value !== AFFIX_STATUS_PREPARE
    || !fixedNodeRef.value
    || !placeholderNodeRef.value
    || !targetFunc
  ) {
    return
  }

  const targetNode = targetFunc()
  if (targetNode) {
    const newState = {
      status: AFFIX_STATUS_NONE,
      affixStyle: undefined as CSSProperties | undefined,
      placeholderStyle: undefined as CSSProperties | undefined,
      lastAffix: false,
    }

    const placeholderRect = getTargetRect(unrefElement(placeholderNodeRef))

    if (
      placeholderRect.top === 0
      && placeholderRect.left === 0
      && placeholderRect.width === 0
      && placeholderRect.height === 0
    ) {
      return
    }

    const targetRect = getTargetRect(targetNode)
    const fixedTop = getFixedTop(placeholderRect, targetRect, internalOffsetTop.value)
    const fixedBottom = getFixedBottom(placeholderRect, targetRect, props.offsetBottom)
    if (fixedTop !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        top: `${fixedTop}px`,
        width: `${placeholderRect.width}px`,
        height: `${placeholderRect.height}px`,
      }
      newState.placeholderStyle = {
        width: `${placeholderRect.width}px`,
        height: `${placeholderRect.height}px`,
      }
    } else if (fixedBottom !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        bottom: `${fixedBottom}px`,
        width: `${placeholderRect.width}px`,
        height: `${placeholderRect.height}px`,
      }
      newState.placeholderStyle = {
        width: `${placeholderRect.width}px`,
        height: `${placeholderRect.height}px`,
      }
    }

    newState.lastAffix = !!newState.affixStyle

    if (lastAffix.value !== newState.lastAffix) {
      props.onChange?.(newState.lastAffix)
    }

    status.value = newState.status
    affixStyle.value = newState.affixStyle
    placeholderStyle.value = newState.placeholderStyle
    lastAffix.value = newState.lastAffix
  }
}

function prepareMeasure() {
  status.value = AFFIX_STATUS_PREPARE
  measure()
  if (process.env.NODE_ENV === 'test') {
    props.onTestUpdatePosition?.()
  }
}

const updatePosition = throttleByAnimationFrame(() => {
  prepareMeasure()
})

const lazyUpdatePosition = throttleByAnimationFrame(() => {
  // Check position change before measure to make Safari smooth
  if (targetFunc && affixStyle.value) {
    const targetNode = targetFunc()
    if (targetNode && placeholderNodeRef.value) {
      const targetRect = getTargetRect(targetNode)
      const placeholderRect = getTargetRect(placeholderNodeRef.value)
      const fixedTop = getFixedTop(placeholderRect, targetRect, internalOffsetTop.value)
      const fixedBottom = getFixedBottom(placeholderRect, targetRect, props.offsetBottom)

      if (
        (fixedTop !== undefined && affixStyle.value.top === `${fixedTop}px`)
        || (fixedBottom !== undefined && affixStyle.value.bottom === `${fixedBottom}px`)
      ) {
        return
      }
    }
  }

  // Directly call prepare measure since it's already throttled.
  prepareMeasure()
})

function addListeners() {
  const listenerTarget = targetFunc?.()
  if (!listenerTarget) {
    return
  }
  TRIGGER_EVENTS.forEach((eventName) => {
    if (prevListener.value) {
      prevTarget.value?.removeEventListener(eventName, prevListener.value)
    }
    listenerTarget?.addEventListener(eventName, lazyUpdatePosition)
  })
  prevTarget.value = listenerTarget
  prevListener.value = lazyUpdatePosition
}

function removeListeners() {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
  const newTarget = targetFunc?.()
  TRIGGER_EVENTS.forEach((eventName) => {
    newTarget?.removeEventListener(eventName, lazyUpdatePosition)
    if (prevListener.value) {
      prevTarget.value?.removeEventListener(eventName, prevListener.value)
    }
  })
  updatePosition.cancel()
  lazyUpdatePosition.cancel()
}

// Expose methods
defineExpose<AffixExpose>({
  updatePosition,
})

// Lifecycle
onMounted(() => {
  // [Legacy] Wait for parent component ref has its value.
  // We should use target as directly element instead of function which makes element check hard.
  timer.value = setTimeout(addListeners)
})

onUnmounted(() => {
  removeListeners()
})

// Watch for prop changes
watch(
  [() => props.target, () => affixStyle.value, () => lastAffix.value, () => props.offsetTop, () => props.offsetBottom],
  (_n, _o, onCleanup) => {
    onCleanup(removeListeners)
    nextTick(() => {
      addListeners()
    })
  },
  { flush: 'post' },
)

watch(
  [() => props.target, () => props.offsetTop, () => props.offsetBottom],
  () => {
    updatePosition()
  },
  { flush: 'post' },
)

const rootCls = computed(() => {
  return [
    props.rootClassName,
    affixPrefixCls,
  ].filter(Boolean)
})

const mergedCls = computed(() => {
  if (affixStyle.value) {
    return rootCls.value
  }
  return []
})

useResizeObserver(placeholderNodeRef, () => {
  updatePosition()
})
useResizeObserver(contentRef, () => {
  updatePosition()
})

function getContext(ref: Element) {
  if (!ref)
    return
  const el = ref.nextSibling
  if (el) {
    contentRef.value = el as HTMLElement
  } else {
    contentRef.value = ref as HTMLElement
  }
}
</script>

<template>
  <div ref="placeholderNodeRef" :style="props.style">
    <template v-if="affixStyle">
      <div :style="placeholderStyle" aria-hidden="true" />
    </template>
    <div ref="fixedNodeRef" :class="mergedCls" :style="affixStyle">
      <component :is="$slots.default" :ref="getContext" />
    </div>
  </div>
</template>
