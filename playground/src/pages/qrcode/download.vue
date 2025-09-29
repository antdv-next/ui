<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const qrcodeRef = useTemplateRef('qrcode')
function doDownload(url: string, fileName: string) {
  const a = document.createElement('a')
  a.download = fileName
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function downloadCanvasQRCode() {
  if (qrcodeRef.value) {
    const url = qrcodeRef.value.toDataURL()
    doDownload(url, 'QRCode.png')
  }
}

function downloadSvgQRCode() {
  const svg = qrcodeRef.value.$el?.querySelector<SVGElement>('svg')
  const svgData = new XMLSerializer().serializeToString(svg!)
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  doDownload(url, 'QRCode.svg')
}
const selectType = ref('canvas')
</script>

<template>
  <select v-model="selectType">
    <option value="canvas">
      Canvas
    </option>
    <option value="svg">
      SVG
    </option>
  </select>
  <a-qrcode
    ref="qrcode"
    value="https://www.baidu.com"
    icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    :type="selectType"
    style="margin-bottom: 16px"
    bg-coloe="#fff"
  />
  <a-button type="primary" @click="selectType === 'canvas' ? downloadCanvasQRCode() : downloadSvgQRCode()">
    Download
  </a-button>
</template>

<style scoped>

</style>
