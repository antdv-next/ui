<script setup lang="ts">
import type { ItemType } from 'antdv-next/menu'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const colorBgContainer = 'var(--ant-color-bg-container)'
const borderRadiusLG = 'var(--ant-border-radius-lg)'

const menuItems: ItemType[] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: () => h(icon),
  label: `nav ${index + 1}`,
}))

const contentWrapperStyle = {
  margin: '24px 16px 0',
}

const contentStyle = {
  padding: 24,
  minHeight: '360px',
  background: colorBgContainer,
  borderRadius: borderRadiusLG,
}

const footerText = `Ant Design ©${new Date().getFullYear()} Created by Ant UED`

function handleBreakpoint(broken: boolean) {
  console.log(broken)
}

function handleCollapse(collapsed: boolean, type: string) {
  console.log(collapsed, type)
}
</script>

<template>
  <a-layout>
    <a-layout-sider
      breakpoint="lg"
      :collapsed-width="0"
      @breakpoint="handleBreakpoint"
      @collapse="handleCollapse"
    >
      <div class="demo-logo-vertical" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['4']" :items="menuItems" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ padding: 0, background: colorBgContainer }" />
      <a-layout-content :style="contentWrapperStyle">
        <div :style="contentStyle">
          content
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        {{ footerText }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
