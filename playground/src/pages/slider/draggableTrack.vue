<script setup lang="ts">
import { ref } from 'vue'

const data = ref([20, 50])
</script>

<template>
  <a-slider v-model:value="data" :range="{ draggableTrack: true }" />
</template>

<style scoped>

</style>
