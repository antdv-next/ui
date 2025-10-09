<script setup lang="ts">
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { h, ref } from 'vue'

type MenuMode = 'inline' | 'vertical'

const items = [
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
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    children: [
      {
        key: '3',
        label: () => h(
          'span',
          {
            style: 'display:inline-block; max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
          },
          'Ant Design, a design language for background applications, is refined by Ant UED Team',
        ),
      },
      {
        key: '4',
        label: 'Option 4',
      },
      {
        key: 'sub1-2',
        label: 'Submenu',
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

const menuThemeConfig = {
  theme: {
    components: {
      Menu: {
        itemBorderRadius: 0,
        subMenuItemBorderRadius: 0,
        itemHoverColor: '#1890ff',
        itemSelectedColor: '#1890ff',
        itemSelectedBg: '#e6f7ff',
        activeBarWidth: 3,
        itemMarginInline: 0,
        itemHoverBg: 'transparent',
      },
    },
  },
} as Record<string, any>

const mode = ref<MenuMode>('inline')

function changeMode(value: boolean) {
  mode.value = value ? 'vertical' : 'inline'
}
</script>

<template>
  <div>
    <a-switch :checked="mode === 'vertical'" @change="changeMode" /> Change Mode
    <div class="mt-16px">
      <a-config-provider v-bind="menuThemeConfig">
        <a-menu
          style="width: 256px"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          :mode="mode"
          :items="items"
        />
      </a-config-provider>
    </div>
  </div>
</template>
