<script setup lang="ts">
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons-vue'
import { h, ref } from 'vue'

type MenuTheme = 'light' | 'dark'

const items = [
  {
    key: 'sub1',
    label: 'Navigation One Long Long Long Long',
    icon: () => h(MailOutlined),
    type: 'submenu',
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
    type: 'submenu',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        type: 'submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  { key: '11', label: 'Option 11' },
  { key: '12', label: 'Option 12' },
]

const menuTheme = ref<MenuTheme>('dark')
const selectedKeys = ref<string[]>(['1'])

function changeTheme(value: boolean) {
  menuTheme.value = value ? 'dark' : 'light'
}

function handleClick(info: { key: string | number }) {
  selectedKeys.value = [String(info.key)]
}
</script>

<template>
  <div>
    <a-switch
      :checked="menuTheme === 'dark'"
      checked-children="Dark"
      un-checked-children="Light"
      @change="changeTheme"
    />
    <div class="mt-16px">
      <a-menu
        v-model:selected-keys="selectedKeys"
        :theme="menuTheme"
        mode="inline"
        inline-collapsed
        :items="items"
        root-class-name="debug-menu"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.debug-menu .ant-menu-item) {
  text-decoration: underline;
}

:deep(.debug-menu .ant-menu-submenu-title) {
  background: rgba(255, 255, 255, 0.3);
}

:deep(.ant-menu-light.debug-menu .ant-menu-submenu-title) {
  background: rgba(0, 0, 0, 0.05);
}
</style>
