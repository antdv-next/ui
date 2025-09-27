<script setup lang="ts">
import { DownOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

function renderExtraRow(label: string, extra: string) {
  return () => h('div', { class: 'dropdown-extra-item' }, [
    h('span', { class: 'dropdown-extra-item__label' }, label),
    h('span', { class: 'dropdown-extra-item__extra' }, extra),
  ])
}

const items = [
  { key: '1', label: 'My Account', disabled: true },
  { type: 'divider' },
  { key: '2', label: renderExtraRow('Profile', '⌘P') },
  { key: '3', label: renderExtraRow('Billing', '⌘B') },
  {
    key: '4',
    label: renderExtraRow('Settings', '⌘S'),
    icon: () => h(SettingOutlined),
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

.dropdown-extra-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 160px;
}

.dropdown-extra-item__extra {
  color: var(--ant-color-text-description);
}
</style>
