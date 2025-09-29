<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-space :size="24">
    <a-badge :count="1">
      <a-avatar shape="square">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
    </a-badge>
    <a-badge dot>
      <a-avatar shape="square">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
    </a-badge>
  </a-space>
</template>
