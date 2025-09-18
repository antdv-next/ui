<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { QRCodeEmits, QRCodeProps, QRCodeSlots, QRProps } from './define.ts'
import { QRCodeCanvas, QRCodeSVG } from '@v-c/qrcode'
import { computed, useAttrs, useTemplateRef } from 'vue'
import { useLocale } from '../locale'
import { QRCodeDefaultProps } from './define.ts'
import QrcodeStatus from './QrcodeStatus.vue'

defineOptions({ name: 'AQRCode', inheritAttrs: false })
const props = withDefaults(defineProps<QRCodeProps>(), QRCodeDefaultProps)
defineEmits<QRCodeEmits>()
defineSlots<QRCodeSlots>()
const attrs = useAttrs()
const canvasRef = useTemplateRef('canvas')
defineExpose({
  toDataURL: () => canvasRef.value?.toDataURL(),
})

const [localeContext] = useLocale('QRCode')
const prefixCls = props.prefixCls
const qrCodeProps = computed(() => {
  const { value, size, errorLevel, bgColor, color, icon, iconSize } = props

  const imageSettings: QRProps['imageSettings'] = {
    src: icon,
    x: undefined,
    y: undefined,
    height: typeof iconSize === 'number' ? iconSize : (iconSize?.height ?? 40),
    width: typeof iconSize === 'number' ? iconSize : (iconSize?.width ?? 40),
    excavate: true,
    crossOrigin: 'anonymous',
  }

  return {
    value,
    size,
    level: errorLevel,
    bgColor,
    fgColor: color,
    style: { width: attrs.style?.width, height: attrs.style?.height },
    imageSettings: icon ? imageSettings : undefined,
  }
})
const mergedCls = computed(() => {
  return {
    [`${prefixCls}`]: true,
    [`${prefixCls}-borderless`]: !props.bordered,
  }
})
const mergedStyle = computed<CSSProperties>(() => {
  const { size, bgColor } = props
  return {
    backgroundColor: bgColor,
    width: `${size}px`,
    height: `${size}px`,
  }
})
</script>

<template>
  <div :class="mergedCls" :style="mergedStyle" v-bind="$attrs">
    <template v-if="status !== 'active'">
      <div :class="`${prefixCls}-mask`">
        <slot name="statusRender" v-bind="{ status, locale: localeContext, onRefresh }">
          <QrcodeStatus
            :prefix-cls="prefixCls"
            :status="status"
            @refresh="$emit('refresh')"
          />
        </slot>
      </div>
    </template>
    <template v-if="type === 'canvas'">
      <QRCodeCanvas ref="canvas" v-bind="qrCodeProps" />
    </template>
    <template v-else>
      <QRCodeSVG v-bind="qrCodeProps" />
    </template>
  </div>
</template>

<style scoped>

</style>
