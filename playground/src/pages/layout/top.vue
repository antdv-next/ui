<script setup lang="ts">
const colorBgContainer = 'var(--ant-color-bg-container)'
const borderRadiusLG = 'var(--ant-border-radius-lg)'

const menuItems = Array.from({ length: 15 }).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}))

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
}

const headerMenuStyle = {
  flex: 1,
  minWidth: 0,
}

const contentWrapperStyle = {
  padding: '0 48px',
}

const breadcrumbStyle = {
  margin: '16px 0',
}

const contentStyle = {
  background: colorBgContainer,
  minHeight: '280px',
  padding: 24,
  borderRadius: borderRadiusLG,
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
        :items="menuItems"
        :style="headerMenuStyle"
      />
    </a-layout-header>
    <a-layout-content :style="contentWrapperStyle">
      <a-breadcrumb :style="breadcrumbStyle">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="contentStyle">
        Content
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      {{ footerText }}
    </a-layout-footer>
  </a-layout>
</template>
