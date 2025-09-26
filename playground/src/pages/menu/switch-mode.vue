<script setup lang="ts">
import type { MenuItemType } from 'antdv-next'
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { h, ref } from 'vue'

type MenuMode = 'inline' | 'vertical'
type MenuTheme = 'light' | 'dark'

const items: MenuItemType[] = [
  {
    key: '1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
  },
  {
    key: '2',
    icon: () => h(CalendarOutlined),
    label: 'Navigation Two',
  },
  {
    key: 'sub1',
    label: 'Navigation Two',
    icon: () => h(AppstoreOutlined),
    type: 'submenu',
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
      {
        key: 'sub1-2',
        label: 'Submenu',
        type: 'submenu',
        children: [
          { key: '5', label: 'Option 5' },
          { key: '6', label: 'Option 6' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Three',
    icon: () => h(SettingOutlined),
    type: 'submenu',
    children: [
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
    ],
  },
  {
    key: 'link',
    icon: () => h(LinkOutlined),
    label: () => h('a', { href: 'https://ant.design', target: '_blank', rel: 'noopener noreferrer' }, 'Ant Design'),
  },
]

const mode = ref<MenuMode>('inline')
const theme = ref<MenuTheme>('light')

function changeMode() {
  mode.value = mode.value === 'inline' ? 'vertical' : 'inline'
}

function changeTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div>
    <!--    <a-switch :checked="mode === 'vertical'" @change="changeMode" /> Change Mode -->
    <a-button @click="changeMode">
      Change Mod: {{ mode }}
    </a-button>
    <a-divider type="vertical" />
    <!--    <a-switch :checked="theme === 'dark'" @change="changeTheme" /> Change Style -->
    <a-button @click="changeTheme">
      Change Style: {{ theme }}
    </a-button>
    <div class="mt-16px">
      <a-menu
        :items="items"
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        :mode="mode"
        :theme="theme"
        style="width: 256px"
      />
    </div>
  </div>
</template>
