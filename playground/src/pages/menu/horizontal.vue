<script setup lang="ts">
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { h, ref } from 'vue'

const items = [
  {
    key: 'mail',
    label: 'Navigation One',
    icon: () => h(MailOutlined),
  },
  {
    key: 'app',
    label: 'Navigation Two',
    icon: () => h(AppstoreOutlined),
    disabled: true,
  },
  {
    key: 'SubMenu',
    label: 'Navigation Three - Submenu',
    icon: () => h(SettingOutlined),
    type: 'submenu',
    children: [
      {
        key: 'group1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: 'setting:1', label: 'Option 1' },
          { key: 'setting:2', label: 'Option 2' },
        ],
      },
      {
        key: 'group2',
        label: 'Item 2',
        type: 'group',
        children: [
          { key: 'setting:3', label: 'Option 3' },
          { key: 'setting:4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: 'alipay',
    label: () => h('a', { href: 'https://ant.design', target: '_blank', rel: 'noopener noreferrer' }, 'Navigation Four - Link'),
  },
]

const selectedKeys = ref<string[]>(['mail'])

function handleClick(info: { key: string | number }) {
  selectedKeys.value = [String(info.key)]
}
</script>

<template>
  <a-menu
    v-model:selected-keys="selectedKeys"
    mode="horizontal"
    :items="items"
    @click="handleClick"
  />
</template>
