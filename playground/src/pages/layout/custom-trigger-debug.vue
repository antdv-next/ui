<script setup lang="ts">
import type { ItemType } from 'antdv-next/menu'
import {
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { computed, h, ref } from 'vue'

const colorBgContainer = 'var(--ant-color-bg-container)'
const borderRadiusLG = 'var(--ant-border-radius-lg)'

const collapsed = ref(true)

const menuItems: ItemType[] = [
  {
    key: '1',
    icon: () => h(PieChartOutlined),
    label: 'Option 1',
  },
  {
    key: '2',
    icon: () => h(DesktopOutlined),
    label: 'Option 2',
  },
  {
    key: 'sub1',
    icon: () => h(UserOutlined),
    label: 'User',
    type: 'submenu',
    children: [
      { key: '3', label: 'Tom' },
      { key: '4', label: 'Bill' },
      { key: '5', label: 'Alex' },
    ],
  },
  {
    key: 'sub2',
    icon: () => h(TeamOutlined),
    label: 'Team',
    type: 'submenu',
    children: [
      { key: '6', label: 'Team 1' },
      { key: '7', label: 'Team 2' },
    ],
  },
  {
    key: '9',
    icon: () => h(FileOutlined),
    label: 'File',
  },
]

const triggerIcon = computed(() => (collapsed.value ? MenuUnfoldOutlined : MenuFoldOutlined))

const headerStyle = {
  padding: 0,
  background: colorBgContainer,
}

const contentStyle = {
  margin: '24px 16px',
  padding: 24,
  minHeight: '280px',
  background: colorBgContainer,
  borderRadius: borderRadiusLG,
}

const buttonStyle = {
  fontSize: '16px',
  width: '64px',
  height: '64px',
}

function toggleCollapsed() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="demo-logo-vertical" />
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['3']"
        :default-open-keys="['sub1']"
        :items="menuItems"
      />
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="headerStyle">
        <a-button type="text" :style="buttonStyle" @click="toggleCollapsed">
          <template #icon>
            <component :is="triggerIcon" />
          </template>
        </a-button>
      </a-layout-header>
      <a-layout-content :style="contentStyle">
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
