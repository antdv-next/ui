<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const items = [
  {
    key: '0',
    label: () =>
      h(
        'a',
        {
          href: 'https://www.antgroup.com',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        '1st menu item',
      ),
  },
  {
    key: '1',
    label: () =>
      h(
        'a',
        {
          href: 'https://www.aliyun.com',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        '2nd menu item',
      ),
  },
  {
    type: 'divider' as const,
  },
  {
    key: '3',
    label: '3rd menu item（disabled）',
    disabled: true,
  },
]
</script>

<template>
  <a-dropdown :menu="{ items }">
    <a @click.prevent>
      <a-space>
        Hover me
        <DownOutlined />
      </a-space>
    </a>
  </a-dropdown>
</template>
