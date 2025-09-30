<script setup lang="ts">
const items = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' },
]
</script>

<template>
  <a-dropdown :menu="{ items }" :trigger="['contextMenu']">
    <div class="context-area">
      Right Click on here
    </div>
  </a-dropdown>
</template>

<style scoped>
.context-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: var(--ant-color-bg-layout, #fafafa);
  color: var(--ant-color-text-tertiary, #999);
}
</style>
