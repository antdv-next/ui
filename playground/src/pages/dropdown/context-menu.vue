<script setup lang="ts">
const items = [
  {
    key: '1',
    label: '1st menu item',
  },
  {
    key: '2',
    label: '2nd menu item',
  },
  {
    key: '3',
    label: '3rd menu item',
  },
]

const boxStyle = {
  color: 'var(--ant-color-text-tertiary)',
  background: 'var(--ant-color-bg-layout)',
  height: '200px',
  textAlign: 'center',
  lineHeight: '200px',
} as const
</script>

<template>
  <a-dropdown :menu="{ items }" :trigger="['contextMenu']">
    <div :style="boxStyle">
      Right Click on here
    </div>
  </a-dropdown>
</template>
