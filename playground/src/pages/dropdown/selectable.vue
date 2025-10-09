<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'

const items = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
  {
    key: '3',
    label: 'Item 3',
  },
]
</script>

<template>
  <a-dropdown
    :menu="{
      items,
      selectable: true,
      defaultSelectedKeys: ['3'],
    }"
  >
    <a-typography-link @click.prevent>
      <a-space>
        Selectable
        <DownOutlined />
      </a-space>
    </a-typography-link>
  </a-dropdown>
</template>
