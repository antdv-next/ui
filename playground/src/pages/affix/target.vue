<script setup lang="ts">
import { shallowRef } from 'vue'

const container = shallowRef<HTMLDivElement | null>(null)

const containerStyle = {
  width: '100%',
  height: '100px',
  overflow: 'auto',
  boxShadow: '0 0 0 1px #1677ff',
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
} as const

const style = {
  width: '100%',
  height: '1000px',
} as const
</script>

<template>
  <div ref="container" :style="containerStyle">
    <div :style="style">
      <a-affix :target="() => container">
        <a-button type="primary">
          Fixed at the top of container
        </a-button>
      </a-affix>
    </div>
  </div>
</template>
