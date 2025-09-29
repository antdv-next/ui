<script setup lang="ts">
import type { ItemType } from 'antdv-next/menu'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons-vue'
import { h } from 'vue'

const colorBgContainer = 'var(--ant-color-bg-container)'
const borderRadiusLG = 'var(--ant-border-radius-lg)'

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
}

const menuItems: ItemType[] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: () => h(icon),
  label: `nav ${index + 1}`,
}))

const contentWrapperStyle = {
  margin: '24px 16px 0',
  overflow: 'initial',
}

const contentStyle = {
  padding: 24,
  textAlign: 'center',
  background: colorBgContainer,
  borderRadius: borderRadiusLG,
}

const headerStyle = {
  padding: 0,
  background: colorBgContainer,
}

const longContent = Array.from({ length: 100 }, (_, index) => ({
  key: index,
  text: index % 20 === 0 && index !== 0 ? 'more' : '...',
}))

const footerText = `Ant Design ©${new Date().getFullYear()} Created by Ant UED`
</script>

<template>
  <a-layout has-sider>
    <a-layout-sider :style="siderStyle">
      <div class="demo-logo-vertical" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['4']" :items="menuItems" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="headerStyle" />
      <a-layout-content :style="contentWrapperStyle">
        <div :style="contentStyle">
          <p>long content</p>
          <template v-for="item in longContent" :key="item.key">
            {{ item.text }}
            <br>
          </template>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        {{ footerText }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
