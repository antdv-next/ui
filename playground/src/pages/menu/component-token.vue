<script setup lang="ts">
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { h, ref } from 'vue'

const horizontalItems = [
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

const inlineItems = [
  { key: '1', icon: () => h(PieChartOutlined), label: 'Option 1' },
  { key: '2', icon: () => h(DesktopOutlined), label: 'Option 2' },
  { key: '3', icon: () => h(ContainerOutlined), label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: () => h(MailOutlined),
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: () => h(AppstoreOutlined),
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
]

const selectedKeys = ref<string[]>(['mail'])

function handleClick(info: { key: string | number }) {
  selectedKeys.value = [String(info.key)]
}

const darkPopupConfig = {
  theme: {
    components: {
      Menu: {
        popupBg: 'yellow',
        darkPopupBg: 'red',
      },
    },
  },
} as Record<string, any>

const roundedHorizontalConfig = {
  theme: {
    components: {
      Menu: {
        horizontalItemBorderRadius: 6,
        popupBg: 'red',
        horizontalItemHoverBg: '#f5f5f5',
      },
    },
  },
} as Record<string, any>

const customDarkInlineConfig = {
  theme: {
    components: {
      Menu: {
        darkItemColor: '#91daff',
        darkItemBg: '#d48806',
        darkSubMenuItemBg: '#faad14',
        darkItemSelectedColor: '#ffccc7',
        darkItemSelectedBg: '#52c41a',
      },
    },
  },
} as Record<string, any>
</script>

<template>
  <a-space direction="vertical" size="large">
    <a-config-provider v-bind="darkPopupConfig">
      <a-menu
        v-model:selected-keys="selectedKeys"
        mode="horizontal"
        :items="horizontalItems"
        @click="handleClick"
      />
      <a-menu
        theme="dark"
        mode="inline"
        inline-collapsed
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        :items="inlineItems"
        style="width: 56px"
      />
    </a-config-provider>

    <a-config-provider v-bind="roundedHorizontalConfig">
      <a-menu
        v-model:selected-keys="selectedKeys"
        mode="horizontal"
        :items="horizontalItems"
        @click="handleClick"
      />
    </a-config-provider>

    <a-config-provider v-bind="customDarkInlineConfig">
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        :items="inlineItems"
        style="width: 256px"
      />
    </a-config-provider>
  </a-space>
</template>
