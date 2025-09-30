<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const items = [
  {
    key: '0',
    label: () => h('a', { href: 'https://www.antgroup.com', target: '_blank', rel: 'noopener noreferrer' }, '1st menu item'),
  },
  {
    key: '1',
    label: () => h('a', { href: 'https://www.aliyun.com', target: '_blank', rel: 'noopener noreferrer' }, '2nd menu item'),
  },
  { type: 'divider' },
  {
    key: '3',
    disabled: true,
    label: '3rd menu item（disabled）',
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
