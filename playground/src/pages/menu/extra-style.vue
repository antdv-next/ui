<script setup lang="ts">
import { DownOutlined, MailOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const items1 = [
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    type: 'submenu',
    children: [
      {
        key: '1',
        label: () => h(
          'div',
          { class: 'flex items-center justify-between w-full gap-2' },
          [h('span', 'Option 1'), h(DownOutlined)],
        ),
      },
      {
        key: '2',
        label: () => h(
          'div',
          { class: 'flex items-center justify-between w-full gap-2' },
          [h('span', 'Option 2'), h('span', { style: 'font-size: 12px; color: rgba(0, 0, 0, 0.45)' }, '⌘P')],
        ),
      },
      {
        key: '3',
        label: () => h(
          'a',
          {
            class: 'flex justify-between w-full',
            style: 'color: #1677ff',
            href: 'https://www.baidu.com',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          [h('span', 'Link Option'), h('span', { style: 'font-size: 12px; color: rgba(0, 0, 0, 0.45)' }, '↗')],
        ),
        disabled: true,
      },
    ],
  },
]

const items2 = [
  {
    key: '1',
    label: () => h(
      'div',
      { class: 'flex items-center justify-between w-full gap-2' },
      [h('span', 'Users'), h('span', { style: 'font-size: 12px; color: rgba(255, 255, 255, 0.65)' }, '⌘U')],
    ),
  },
  {
    key: '2',
    label: () => h(
      'div',
      { class: 'flex items-center justify-between w-full gap-2' },
      [h('span', 'Profile'), h('span', { style: 'font-size: 12px; color: rgba(255, 255, 255, 0.65)' }, '⌘P')],
    ),
  },
]
</script>

<template>
  <a-space direction="vertical" size="large">
    <a-menu
      mode="inline"
      :default-open-keys="['sub1']"
      :default-selected-keys="['1']"
      :items="items1"
      style="width: 256px"
    />
    <a-menu theme="dark" style="width: 256px" :items="items2" />
  </a-space>
</template>
