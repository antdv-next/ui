<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)
function onChange() {
  disabled.value = !disabled.value
}
</script>

<template>
  <a-slider :default-value="30" :disabled="disabled" />
  <a-slider range :default-value="[20, 50]" :disabled="disabled" />
  <a-button @click="onChange">Toggle</a-button>
</template>

<style scoped>

</style>
