<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'

const items = [
  {
    key: '1',
    type: 'group',
    label: 'Group title',
    children: [
      { key: '1-1', label: '1st menu item' },
      { key: '1-2', label: '2nd menu item' },
    ],
  },
  {
    key: '2',
    label: 'sub menu',
    children: [
      { key: '2-1', label: '3rd menu item' },
      { key: '2-2', label: '4th menu item' },
    ],
  },
  {
    key: '3',
    label: 'disabled sub menu',
    disabled: true,
    children: [
      { key: '3-1', label: '5th menu item' },
      { key: '3-2', label: '6th menu item' },
    ],
  },
]
</script>

<template>
  <div class="dropdown-submenu-debug">
    <a-dropdown :menu="{ items, openKeys: ['2'] }" :open="true" :auto-adjust-overflow="false">
      <a class="dropdown-link" @click.prevent>
        <a-space>
          Cascading menu
          <DownOutlined />
        </a-space>
      </a>
    </a-dropdown>
  </div>
</template>

<style scoped>
.dropdown-submenu-debug {
  height: 200px;
  background: var(--ant-color-bg-layout);
  padding: 24px;
  border-radius: var(--ant-border-radius-lg);
}

.dropdown-link {
  color: var(--ant-color-primary);
}
</style>
