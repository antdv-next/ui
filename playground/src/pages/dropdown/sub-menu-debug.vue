<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'

const items = [
  {
    key: '1',
    type: 'group' as const,
    label: 'Group title',
    children: [
      {
        key: '1-1',
        label: '1st menu item',
      },
      {
        key: '1-2',
        label: '2nd menu item',
      },
    ],
  },
  {
    key: '2',
    label: 'sub menu',
    children: [
      {
        key: '2-1',
        label: '3rd menu item',
      },
      {
        key: '2-2',
        label: '4th menu item',
      },
    ],
  },
  {
    key: '3',
    label: 'disabled sub menu',
    disabled: true,
    children: [
      {
        key: '3-1',
        label: '5d menu item',
      },
      {
        key: '3-2',
        label: '6th menu item',
      },
    ],
  },
]
</script>

<template>
  <div style="height: 200px">
    <a-dropdown
      :menu="{ items, openKeys: ['2'] }"
      :open="true"
      :auto-adjust-overflow="false"
    >
      <a @click.prevent>
        <a-space>
          Cascading menu
          <DownOutlined />
        </a-space>
      </a>
    </a-dropdown>
  </div>
</template>
