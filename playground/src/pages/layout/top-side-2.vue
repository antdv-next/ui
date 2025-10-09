<script setup lang="ts">
import type { ItemType } from 'antdv-next/menu'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const colorBgContainer = 'var(--ant-color-bg-container)'
const borderRadiusLG = 'var(--ant-border-radius-lg)'

const topMenuItems = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}))

const sideMenuItems: ItemType[] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
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

const headerMenuStyle = {
  flex: 1,
  minWidth: 0,
}

const siderStyle = {
  background: colorBgContainer,
}

const innerLayoutStyle = {
  padding: '0 24px 24px',
}

const breadcrumbStyle = {
  margin: '16px 0',
}

const contentStyle = {
  padding: 24,
  margin: 0,
  minHeight: '280px',
  background: colorBgContainer,
  borderRadius: borderRadiusLG,
}
</script>

<template>
  <a-layout>
    <a-layout-header :style="headerStyle">
      <div class="demo-logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :items="topMenuItems"
        :style="headerMenuStyle"
      />
    </a-layout-header>
    <a-layout>
      <a-layout-sider :width="200" :style="siderStyle">
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          style="height: 100%; border-inline-end: 0"
          :items="sideMenuItems"
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
</template>
