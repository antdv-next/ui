<script setup lang="ts">
import type { CSSProperties } from 'vue'

const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: '64px',
  paddingInline: '48px',
  lineHeight: '64px',
  backgroundColor: '#4096ff',
}

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: '120px',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
}

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
}

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
}

const layoutStyle: CSSProperties = {
  borderRadius: '8px',
  overflow: 'hidden',
  width: 'calc(50% - 8px)',
  maxWidth: 'calc(50% - 8px)',
}
</script>

<template>
  <a-flex gap="middle" wrap="wrap">
    <a-layout :style="layoutStyle">
      <a-layout-header :style="headerStyle">
        Header
      </a-layout-header>
      <a-layout-content :style="contentStyle">
        Content
      </a-layout-content>
      <a-layout-footer :style="footerStyle">
        Footer
      </a-layout-footer>
    </a-layout>

    <a-layout :style="layoutStyle">
      <a-layout-header :style="headerStyle">
        Header
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="25%" :style="siderStyle">
          Sider
        </a-layout-sider>
        <a-layout-content :style="contentStyle">
          Content
        </a-layout-content>
      </a-layout>
      <a-layout-footer :style="footerStyle">
        Footer
      </a-layout-footer>
    </a-layout>

    <a-layout :style="layoutStyle">
      <a-layout-header :style="headerStyle">
        Header
      </a-layout-header>
      <a-layout>
        <a-layout-content :style="contentStyle">
          Content
        </a-layout-content>
        <a-layout-sider width="25%" :style="siderStyle">
          Sider
        </a-layout-sider>
      </a-layout>
      <a-layout-footer :style="footerStyle">
        Footer
      </a-layout-footer>
    </a-layout>

    <a-layout :style="layoutStyle">
      <a-layout-sider width="25%" :style="siderStyle">
        Sider
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="headerStyle">
          Header
        </a-layout-header>
        <a-layout-content :style="contentStyle">
          Content
        </a-layout-content>
        <a-layout-footer :style="footerStyle">
          Footer
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-flex>
</template>
