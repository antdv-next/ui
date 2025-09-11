<script setup lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue'
import IconWrapper from './icon-wrapper.vue'

defineProps<{
  prefixCls?: string
  iconClassName?: string
}>()
</script>

<template>
  <IconWrapper
    :class="{
      [`${prefixCls}-loading-icon`]: true,
    }"
  >
    <LoadingOutlined :class="iconClassName" />
  </IconWrapper>
</template>

<style scoped>

</style>
