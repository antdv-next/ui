<script setup lang="ts">
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons-vue'
import { h, ref } from 'vue'

const items = [
  { key: '1', icon: () => h(PieChartOutlined), label: 'Option 1' },
  { key: '2', icon: () => h(DesktopOutlined), label: 'Option 2' },
  { key: '3', icon: () => h(ContainerOutlined), label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: () => h(MailOutlined),
    type: 'submenu',
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
    type: 'submenu',
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        type: 'submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
]

const collapsed = ref(false)

function toggleCollapsed() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <div style="width: 256px">
    <a-button type="primary" class="mb-16px" @click="toggleCollapsed">
      <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
    </a-button>
    <a-menu
      theme="dark"
      mode="inline"
      :inline-collapsed="collapsed"
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      :items="items"
    />
  </div>
</template>
