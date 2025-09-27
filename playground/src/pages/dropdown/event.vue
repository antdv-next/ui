<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import type { MenuEmits } from 'antdv-next'

const items = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' },
]

function handleMenuClick(info: MenuEmits['click'][0]) {
  console.log(`Click on item ${info.key}`)
}

function handleClick(event: MouseEvent) {
  event.preventDefault()
}
</script>

<template>
  <a-dropdown :menu="{ items, onClick: handleMenuClick }">
    <a class="dropdown-link" @click="handleClick">
      <a-space>
        Hover me, Click menu item
        <DownOutlined />
      </a-space>
    </a>
  </a-dropdown>
</template>

<style scoped>
.dropdown-link {
  color: var(--ant-color-primary);
}
</style>
