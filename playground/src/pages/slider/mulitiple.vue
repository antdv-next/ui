<script setup lang="ts">
import { computed, ref } from 'vue'

const data = ref([0, 10, 20])
function getGradientColor(percentage: number) {
  const startColor = [135, 208, 104]
  const endColor = [255, 204, 199]

  const midColor = startColor.map((start, i) => {
    const end = endColor[i]
    const delta = end - start
    return (start + delta * percentage).toFixed(0)
  })

  return `rgb(${midColor.join(',')})`
}
const start = computed(() => data.value[0] / 100)
const end = computed(() => data.value[data.value.length - 1] / 100)
</script>

<template>
  <a-slider
    v-model:value="data"
    range
    :styles="{
      track: {
        background: 'transparent',
      },
      tracks: {
        background: `linear-gradient(to right, ${getGradientColor(start)} 0%, ${getGradientColor(
          end,
        )} 100%)`,
      },
    }"
  />
</template>

<style scoped>

</style>
