<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { ref } from 'vue'

const style: CSSProperties = {
  display: 'inline-block',
  height: '300px',
  marginInlineStart: '70px',
}
const data = ref(0)
const data1 = ref([20, 50])
const data2 = ref([26, 37])
const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: { color: '#f50' },
    label: '100°C',
  },
}
</script>

<template>
  <div :style="style">
    <a-slider v-model:value="data" vertical />
  </div>
  <div :style="style">
    <a-slider v-model:value="data1" vertical rang :step="10" />
  </div>
  <div :style="style">
    <a-slider v-model:value="data2" vertical rang :marks="marks" />
  </div>
</template>

<style scoped>

</style>
