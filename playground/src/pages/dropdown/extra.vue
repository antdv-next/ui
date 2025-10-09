<script setup lang="ts">
import { DownOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const items = [
  {
    key: '1',
    label: 'My Account',
    disabled: true,
  },
  {
    type: 'divider' as const,
  },
  {
    key: '2',
    label: 'Profile',
    extra: '⌘P',
  },
  {
    key: '3',
    label: 'Billing',
    extra: '⌘B',
  },
  {
    key: '4',
    label: 'Settings',
    icon: () => h(SettingOutlined),
    extra: '⌘S',
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
