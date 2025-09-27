<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'

const items = [
  { key: '1', label: 'Item 1' },
  { key: '2', label: 'Item 2' },
  { key: '3', label: 'Item 3' },
]
</script>

<template>
  <a-dropdown :menu="{ items, selectable: true, defaultSelectedKeys: ['3'] }">
    <a class="dropdown-link" @click.prevent>
      <a-space>
        Selectable
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
