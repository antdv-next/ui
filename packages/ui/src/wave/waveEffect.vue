<script setup lang="ts">
import type { CSSProperties } from 'vue'
import raf from '@v-c/util/dist/raf'
import { useResizeObserver } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { TARGET_CLS } from './interface.ts'
import { getTargetWaveColor } from './util.ts'

const { target, component } = defineProps<{
  target: HTMLElement
  component?: string
  className?: any
  registerUnmount?: () => void
}>()

function validateNum(value: number) {
  return Number.isNaN(value) ? 0 : value
}
const divRef = shallowRef<HTMLDivElement>()
const color = shallowRef<string | null>(null)
const borderRadius = ref<number[]>([])
const left = shallowRef(0)
const top = shallowRef(0)
const width = shallowRef(0)
const height = shallowRef(0)
const enabled = shallowRef(false)
const show = shallowRef(true)
const waveStyle = computed(() => {
  return {
    left: `${left.value}px`,
    top: `${top.value}px`,
    width: `${width.value}px`,
    height: `${height.value}px`,
    borderRadius: borderRadius.value.map(radius => `${radius}px`).join(' '),
    '--wave-color': color.value,
  } as CSSProperties
})

function syncPos() {
  const nodeStyle = getComputedStyle(target)

  // Get wave color from target
  color.value = getTargetWaveColor(target)

  const isStatic = nodeStyle.position === 'static'
  const { borderLeftWidth, borderTopWidth } = nodeStyle
  left.value = isStatic ? target.offsetLeft : validateNum(-Number.parseFloat(borderLeftWidth))
  top.value = isStatic ? target.offsetTop : validateNum(-Number.parseFloat(borderTopWidth))
  width.value = target.offsetWidth
  height.value = target.offsetHeight

  // Get border radius
  const {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = nodeStyle

  borderRadius.value = [
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  ].map(radius => validateNum(Number.parseFloat(radius)))
}

// Add resize observer to follow size
let id: any
useResizeObserver(target, () => {
  if (id) {
    raf.cancel(id)
    id = null
  }
  id = raf(() => {
    syncPos()
  })
})

onMounted(() => {
  if (target) {
    enabled.value = true
  }
})

onBeforeUnmount(() => {
  raf.cancel(id)
})
const isSmallComponent = computed(() => (component === 'Checkbox' || component === 'Radio') && target?.classList.contains(TARGET_CLS))
function handleAfterLeave() {
  if (divRef.value) {
    const holder = divRef.value.parentElement
    if (holder) {
      holder.remove()
    }
  }
}
</script>

<template>
  <Transition
    v-if="enabled"
    appear
    name="wave-motion"
    appear-active-class="wave-motion-appear"
    appear-from-class="wave-motion-appear"
    appear-to-class="wave-motion-appear wave-motion-appear-active"
  >
    <div
      v-if="show"
      ref="divRef"
      :style="waveStyle"
      :class="[
        className,
        {
          'wave-quick': isSmallComponent,
        },
      ]"
      @transitionend="handleAfterLeave"
    />
  </Transition>
</template>

<style scoped>

</style>
