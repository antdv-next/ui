<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue'

const items = [
  {
    label: '1st menu item',
    key: '0',
  },
  {
    label: '2nd menu item',
    key: '1',
  },
  {
    type: 'divider' as const,
  },
  {
    label: '3rd menu item',
    key: '3',
  },
]
</script>

<template>
  <a-dropdown :menu="{ items }" :trigger="['click']">
    <a @click.prevent>
      <a-space>
        Click me
        <DownOutlined />
      </a-space>
    </a>
  </a-dropdown>
</template>
