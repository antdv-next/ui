<script setup lang="ts">
import { MailOutlined } from '@ant-design/icons-vue'
import { computed, h, ref } from 'vue'

type MenuTheme = 'light' | 'dark'

const menuTheme = ref<MenuTheme>('light')
const selectedKeys = ref<string[]>(['1'])
const constantOpenKeys = ['sub1']

const items = computed(() => [
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    theme: menuTheme.value,
    type: 'submenu',
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
    ],
  },
  { key: '5', label: 'Option 5' },
  { key: '6', label: 'Option 6' },
])

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
        mode="vertical"
        theme="dark"
        :items="items"
        :open-keys="constantOpenKeys"
        v-model:selected-keys="selectedKeys"
        style="width: 256px"
        @click="handleClick"
      />
    </div>
  </div>
</template>
