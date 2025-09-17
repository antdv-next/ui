<script setup lang="ts">
import { shallowRef } from 'vue'

const open = shallowRef(false)
function hide() {
  open.value = false
}
</script>

<template>
  <div class="popover-demo">
    <a-popover
      v-model:open="open"
      title="Title"
      trigger="click"
    >
      <a-button type="primary">
        Click me
      </a-button>
      <template #content>
        <a @click="hide">Close</a>
      </template>
    </a-popover>
  </div>
</template>

<style scoped>
.popover-demo {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding: 24px;
}
</style>
