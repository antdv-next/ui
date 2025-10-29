<script setup lang="ts">
import type { ItemType } from 'antdv-next/menu'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const colorBgContainer = 'var(--ant-color-bg-container)'
const colorBgLayout = 'var(--ant-color-bg-layout)'
const borderRadiusLG = 'var(--ant-border-radius-lg)'

const outerTheme = {
  theme: {
    components: {
      Layout: {
        bodyBg: '#fff',
        headerBg: '#1677ff',
        headerHeight: 64,
        headerPadding: '0 24px',
        headerColor: colorBgContainer,
        siderBg: '#800080',
      },
    },
  },
} as Record<string, any>

const innerSiderTheme = {
  theme: {
    components: {
      Layout: {
        siderBg: 'red',
      },
    },
  },
} as Record<string, any>

const menuItems: ItemType[] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = index + 1
  return {
    key: `sub${key}`,
    icon: () => h(icon),
    label: `subnav ${key}`,
    children: Array.from({ length: 4 }).map((_, j) => {
      const subKey = index * 4 + j + 1
      return {
        key: subKey,
        label: `option${subKey}`,
      }
    }),
  }
})

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
}

const innerLayoutStyle = {
  padding: '0 24px 24px',
}

const breadcrumbStyle = {
  margin: '16px 0',
}

const contentStyle = {
  padding: '24px',
  margin: 0,
  minHeight: '280px',
  background: colorBgLayout,
  borderRadius: borderRadiusLG,
}
</script>

<template>
  <a-config-provider v-bind="outerTheme">
    <a-layout>
      <a-layout-header :style="headerStyle">
        <div class="demo-logo" />
        <div style="margin-inline-start: 24px; font-size: 24px">
          Ant Design
        </div>
      </a-layout-header>
      <a-layout>
        <a-config-provider v-bind="innerSiderTheme">
          <a-layout-sider :width="32" />
        </a-config-provider>
        <a-layout-sider :width="200">
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            style="border-inline-end: 0"
            :items="menuItems"
          />
        </a-layout-sider>
        <a-layout :style="innerLayoutStyle">
          <a-breadcrumb :style="breadcrumbStyle">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
          </a-breadcrumb>
          <a-layout-content :style="contentStyle">
            Content
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
