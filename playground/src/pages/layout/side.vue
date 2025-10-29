<script setup lang="ts">
import type { ItemType } from 'antdv-next/menu'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { h, ref } from 'vue'

const colorBgContainer = 'var(--ant-color-bg-container)'
const borderRadiusLG = 'var(--ant-border-radius-lg)'

const collapsed = ref(false)

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
    children: [
      { key: '6', label: 'Team 1' },
      { key: '8', label: 'Team 2' },
    ],
  },
  {
    key: '9',
    icon: () => h(FileOutlined),
    label: 'Files',
  },
]

const layoutStyle = {
  minHeight: '100vh',
}

const headerStyle = {
  padding: 0,
  background: colorBgContainer,
}

const contentWrapperStyle = {
  margin: '0 16px',
}

const breadcrumbStyle = {
  margin: '16px 0',
}

const contentStyle = {
  padding: 24,
  minHeight: '360px',
  background: colorBgContainer,
  borderRadius: borderRadiusLG,
}

const footerText = `Ant Design ©${new Date().getFullYear()} Created by Ant UED`
</script>

<template>
  <a-layout :style="layoutStyle">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="demo-logo-vertical" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" :items="menuItems" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="headerStyle" />
      <a-layout-content :style="contentWrapperStyle">
        <a-breadcrumb :style="breadcrumbStyle">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="contentStyle">
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        {{ footerText }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
