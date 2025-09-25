<script setup lang="ts">
import { CheckCircleFilled, CloseCircleFilled, ReloadOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-qrcode value="https://baidu.com" status="loading">
    <template #statusRender>
      <div>
        <a-spin />
        <p>Loading...</p>
      </div>
    </template>
  </a-qrcode>
  <a-qrcode value="https://baidu.com" status="expired" @refresh="console.log('refresh')">
    <template #statusRender="{ onRefresh, locale }">
      <div>
        <CloseCircleFilled style="color: red" />
        <span>二维码已过期</span>
        <a-button type="link" @click="onRefresh">
          <ReloadOutlined />
          {{ locale.refresh }}
        </a-button>
      </div>
    </template>
  </a-qrcode>
  <a-qrcode value="https://baidu.com" status="scanned">
    <template #statusRender>
      <div>
        <CheckCircleFilled style="color: green" />
        已扫描
      </div>
    </template>
  </a-qrcode>
</template>

<style scoped>

</style>
