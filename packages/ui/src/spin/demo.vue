<script setup>
import { ref } from 'vue'
import DemoWatchCleanup from './DemoWatchCleanup.vue'

const showDemo = ref(true)
</script>

<template>
  <DemoWatchCleanup v-if="showDemo" />
  <button @click="showDemo = false">
    Unmount Demo Component
  </button>
</template>
