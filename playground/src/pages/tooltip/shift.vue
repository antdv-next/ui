<script setup lang="ts">
import { onMounted } from 'vue'

const style = {
  width: '300vw',
  height: '300vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

onMounted(() => {
  document.documentElement.scrollTop = document.documentElement.clientHeight
  document.documentElement.scrollLeft = document.documentElement.clientWidth
})
</script>

<template>
  <div :style="style">
    <a-tooltip title="Thanks for using antd. Have a nice day !" :open="true">
      <a-button type="primary">
        Scroll The Window
      </a-button>
    </a-tooltip>
  </div>
</template>

<style scoped>

</style>
