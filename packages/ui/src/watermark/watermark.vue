<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { WatermarkFontType, WatermarkProps } from './define'
import { useMutationObserver } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, shallowRef, toRefs, watch } from 'vue'
import { getCssVar, getCssVarNumber } from '../_utils/css'
import { BaseSize, FontGap } from './define'
import { getPixelRatio, getStyleStr, reRendering, rotateWatermark } from './utils'

defineOptions({
  name: 'AWatermark',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<WatermarkProps>(), {
  zIndex: 9,
  rotate: -22,
  font: () => ({} as WatermarkFontType),
  gap: () => [100, 100],
})

const { gap, font, offset } = toRefs(props)

// ========= FIXME: relace reactive css var ========================
const colorFill = getCssVar('--ant-color-fill')
const fontSizeLG = getCssVarNumber('--ant-font-size-lg')

// =================================================================

const containerRef = shallowRef<HTMLDivElement>()
const watermarkRef = shallowRef<HTMLDivElement>()
const stopObservation = shallowRef(false)
const gapX = computed(() => gap.value?.[0] ?? 100)
const gapY = computed(() => gap.value?.[1] ?? 100)
const gapXCenter = computed(() => gapX.value / 2)
const gapYCenter = computed(() => gapY.value / 2)
const offsetLeft = computed(() => offset.value?.[0] ?? gapXCenter.value)
const offsetTop = computed(() => offset.value?.[1] ?? gapYCenter.value)
const fontSize = computed(() => font.value?.fontSize ?? fontSizeLG)
const fontWeight = computed(() => font.value?.fontWeight ?? 'normal')
const fontStyle = computed(() => font.value?.fontStyle ?? 'normal')
const fontFamily = computed(() => font.value?.fontFamily ?? 'sans-serif')
const color = computed(() => font.value?.color ?? colorFill)
const markStyle = computed(() => {
  const markStyle: CSSProperties = {
    zIndex: props.zIndex ?? 9,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    backgroundRepeat: 'repeat',
  }

  /** Calculate the style of the offset */
  let positionLeft = offsetLeft.value - gapXCenter.value
  let positionTop = offsetTop.value - gapYCenter.value
  if (positionLeft > 0) {
    markStyle.left = `${positionLeft}px`
    markStyle.width = `calc(100% - ${positionLeft}px)`
    positionLeft = 0
  }
  if (positionTop > 0) {
    markStyle.top = `${positionTop}px`
    markStyle.height = `calc(100% - ${positionTop}px)`
    positionTop = 0
  }
  markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`

  return markStyle
})

function destroyWatermark() {
  if (watermarkRef.value) {
    watermarkRef.value.remove()
    watermarkRef.value = undefined
  }
}

function appendWatermark(base64Url: string, markWidth: number) {
  if (containerRef.value && watermarkRef.value) {
    stopObservation.value = true
    watermarkRef.value.setAttribute(
      'style',
      getStyleStr({
        ...markStyle.value,
        backgroundImage: `url('${base64Url}')`,
        backgroundSize: `${(gapX.value + markWidth) * BaseSize}px`,
      }),
    )
    containerRef.value?.append(watermarkRef.value)
    // Delayed execution
    setTimeout(() => {
      stopObservation.value = false
    })
  }
}

/**
 * Get the width and height of the watermark. The default values are as follows
 * Image: [120, 64]; Content: It's calculated by content;
 */
function getMarkSize(ctx: CanvasRenderingContext2D) {
  let defaultWidth = 120
  let defaultHeight = 64
  const content = props.content
  const image = props.image
  const width = props.width
  const height = props.height
  if (!image && ctx.measureText) {
    ctx.font = `${Number(fontSize.value)}px ${fontFamily.value}`
    const contents = Array.isArray(content) ? content : [content]
    const widths = contents.map(item => ctx.measureText(item!).width)
    defaultWidth = Math.ceil(Math.max(...widths))
    defaultHeight = Number(fontSize.value) * contents.length + (contents.length - 1) * FontGap
  }
  return [width ?? defaultWidth, height ?? defaultHeight] as const
}
function fillTexts(ctx: CanvasRenderingContext2D, drawX: number, drawY: number, drawWidth: number, drawHeight: number) {
  const ratio = getPixelRatio()
  const content = props.content
  const mergedFontSize = Number(fontSize.value) * ratio
  ctx.font = `${fontStyle.value} normal ${fontWeight.value} ${mergedFontSize}px/${drawHeight}px ${fontFamily.value}`
  ctx.fillStyle = color.value
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.translate(drawWidth / 2, 0)
  const contents = Array.isArray(content) ? content : [content]
  contents?.forEach((item, index) => {
    ctx.fillText(item ?? '', drawX, drawY + index * (mergedFontSize + FontGap * ratio))
  })
}
function renderWatermark() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const image = props.image
  const rotate = props.rotate ?? -22

  if (ctx) {
    if (!watermarkRef.value) {
      watermarkRef.value = document.createElement('div')
    }

    const ratio = getPixelRatio()
    const [markWidth, markHeight] = getMarkSize(ctx)
    const canvasWidth = (gapX.value + markWidth) * ratio
    const canvasHeight = (gapY.value + markHeight) * ratio
    canvas.setAttribute('width', `${canvasWidth * BaseSize}px`)
    canvas.setAttribute('height', `${canvasHeight * BaseSize}px`)

    const drawX = (gapX.value * ratio) / 2
    const drawY = (gapY.value * ratio) / 2
    const drawWidth = markWidth * ratio
    const drawHeight = markHeight * ratio
    const rotateX = (drawWidth + gapX.value * ratio) / 2
    const rotateY = (drawHeight + gapY.value * ratio) / 2
    /** Alternate drawing parameters */
    const alternateDrawX = drawX + canvasWidth
    const alternateDrawY = drawY + canvasHeight
    const alternateRotateX = rotateX + canvasWidth
    const alternateRotateY = rotateY + canvasHeight

    ctx.save()
    rotateWatermark(ctx, rotateX, rotateY, rotate)

    if (image) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
        /** Draw interleaved pictures after rotation */
        ctx.restore()
        rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate)
        ctx.drawImage(img, alternateDrawX, alternateDrawY, drawWidth, drawHeight)
        appendWatermark(canvas.toDataURL(), markWidth)
      }
      img.crossOrigin = 'anonymous'
      img.referrerPolicy = 'no-referrer'
      img.src = image
    } else {
      fillTexts(ctx, drawX, drawY, drawWidth, drawHeight)
      /** Fill the interleaved text after rotation */
      ctx.restore()
      rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate)
      fillTexts(ctx, alternateDrawX, alternateDrawY, drawWidth, drawHeight)
      appendWatermark(canvas.toDataURL(), markWidth)
    }
  }
}
onMounted(() => {
  renderWatermark()
})
watch(
  () => [props, colorFill, fontSizeLG],
  () => {
    renderWatermark()
  },
  {
    deep: true,
    flush: 'post',
  },
)
onBeforeUnmount(() => {
  destroyWatermark()
})
function onMutate(mutations: MutationRecord[]) {
  if (stopObservation.value) {
    return
  }
  mutations.forEach((mutation) => {
    if (reRendering(mutation, watermarkRef.value)) {
      destroyWatermark()
      renderWatermark()
    }
  })
}

useMutationObserver(containerRef, onMutate, {
  attributes: true,
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class'],
})
</script>

<template>
  <div v-bind="$attrs" ref="containerRef" :class="[$attrs.class, rootClassName]" :style="{ position: 'relative', ...($attrs.style || {}) }">
    <slot />
  </div>
</template>
