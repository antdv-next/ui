import type { CSSProperties } from 'vue'

export function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function getStyleStr(style: CSSProperties): string {
  return Object.keys(style)
    .map((key: string) => `${toLowercaseSeparator(key)}: ${style[key as keyof CSSProperties]};`)
    .join(' ')
}

/** Rotate with the watermark as the center point */
export function rotateWatermark(
  ctx: CanvasRenderingContext2D,
  rotateX: number,
  rotateY: number,
  rotate: number,
) {
  ctx.translate(rotateX, rotateY)
  ctx.rotate((Math.PI / 180) * Number(rotate))
  ctx.translate(-rotateX, -rotateY)
}

/** Whether to re-render the watermark */
export function reRendering(mutation: MutationRecord, watermarkElement?: HTMLElement) {
  let flag = false
  // Whether to delete the watermark node
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).includes(watermarkElement!)
  }
  // Whether the watermark dom property value has been modified
  if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
    flag = true
  }
  return flag
}

/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
export function getPixelRatio() {
  return window.devicePixelRatio || 1
}
