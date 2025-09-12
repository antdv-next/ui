<script setup lang="ts">
import { shallowRef } from 'vue'

const top = shallowRef(100)
const bottom = shallowRef(100)
</script>

<template>
  <div class="h-200px bg-red" />
  <a-affix :offset-top="top">
    <a-button type="primary" @click="top += 10">
      Affix top
    </a-button>
  </a-affix>

  <div class="h-500px bg-amber w-full" />
  <div class="h-500px bg-blue w-full" />
  <div class="h-500px bg-red w-full" />
  <div class="h-500px bg-pink w-full" />
  <a-affix :offset-bottom="bottom">
    <a-button type="primary" @click="bottom += 10">
      Affix bottom
    </a-button>
  </a-affix>
  <div class="h-500px bg-purple w-full" />
</template>
