<script setup lang="ts">
import type { MenuItemType } from 'antdv-next'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { h, ref } from 'vue'

type MenuTheme = 'light' | 'dark'

const items: MenuItemType[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: () => h(MailOutlined),
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: () => h(AppstoreOutlined),
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: () => h(SettingOutlined),
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
]

const theme = ref<MenuTheme>('dark')
const selectedKeys = ref<string[]>(['1'])

function changeTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

function handleClick(info: { key: string | number }) {
  selectedKeys.value = [String(info.key)]
}
</script>

<template>
  <div>
    <!--    <a-switch -->
    <!--      :checked="theme === 'dark'" -->
    <!--      checked-children="Dark" -->
    <!--      un-checked-children="Light" -->
    <!--      @change="changeTheme" -->
    <!--    /> -->
    <a-button @click="changeTheme">
      {{ theme === 'dark' ? 'Dark' : 'Light' }}
    </a-button>
    <div class="mt-16px">
      <a-menu
        v-model:selected-keys="selectedKeys"
        :theme="theme"
        mode="inline"
        style="width: 256px"
        :items="items"
        :default-open-keys="['sub1']"
        @click="handleClick"
      />
    </div>
  </div>
</template>
