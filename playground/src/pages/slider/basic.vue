<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)
function onChange() {
  disabled.value = !disabled.value
}
const data1 = ref(30)
const data2 = ref([20, 50])
</script>

<template>
  <a-slider v-model:value="data1" :disabled="disabled" />
  <a-slider v-model:value="data2" range :disabled="disabled" />
  <a-button @click="onChange">
    Toggle
  </a-button>
</template>

<style scoped>

</style>
