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
    type: 'submenu',
    children: Array.from({ length: 4 }).map((_, j) => {
      const subKey = index * 4 + j + 1
      return {
        key: subKey,
        label: `option${subKey}`,
      }
    }),
  }
})

const breadcrumbStyle = {
  margin: '16px 0',
}

const innerLayoutStyle = {
  padding: '24px 0',
  background: colorBgContainer,
  borderRadius: borderRadiusLG,
}

const siderStyle = {
  background: colorBgContainer,
}

const contentStyle = {
  padding: '0 24px',
  minHeight: '280px',
}

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
}

const headerMenuStyle = {
  flex: 1,
  minWidth: 0,
}

const wrapperPaddingStyle = {
  padding: '0 48px',
}

const footerText = `Ant Design ©${new Date().getFullYear()} Created by Ant UED`
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
    <div :style="wrapperPaddingStyle">
      <a-breadcrumb :style="breadcrumbStyle">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout :style="innerLayoutStyle">
        <a-layout-sider :style="siderStyle" :width="200">
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            style="height: 100%"
            :items="sideMenuItems"
          />
        </a-layout-sider>
        <a-layout-content :style="contentStyle">
          Content
        </a-layout-content>
      </a-layout>
    </div>
    <a-layout-footer style="text-align: center">
      {{ footerText }}
    </a-layout-footer>
  </a-layout>
</template>
