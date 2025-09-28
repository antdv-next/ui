<script setup lang="ts">
import type { MenuItemType } from 'antdv-next'
import { DownOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const items: MenuItemType[] = [
  { key: '1', label: 'My Account', disabled: true },
  { type: 'divider' },
  { key: '2', label: 'Profile', extra: '⌘P' },
  { key: '3', label: 'Billing', extra: '⌘B' },
  {
    key: '4',
    label: 'Settings',
    icon: () => h(SettingOutlined),
    extra: '⌘S',
  },
]

function handleClick(event: MouseEvent) {
  event.preventDefault()
}
</script>

<template>
  <a-dropdown :menu="{ items }">
    <a class="dropdown-link" @click="handleClick">
      <a-space>
        Hover me
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
