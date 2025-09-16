<script setup lang="ts">
interface Props {
  prefixCls: string
  dotClassName: string
}

defineProps<Props>()
</script>

<template>
  <span :class="[dotClassName, `${prefixCls}-dot-spin`]">
    <i v-for="item in 4" :key="item" :class="[`${prefixCls}-dot-item`]" />
  </span>
</template>
