<script lang="ts" setup>
import { AntDesignOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }">
    <template #icon>
      <AntDesignOutlined />
    </template>
  </a-avatar>
</template>
