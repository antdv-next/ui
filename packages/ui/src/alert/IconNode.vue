<script setup lang="ts">
import type { IconNodeProps } from './define.ts'
import { computed } from 'vue'
import { iconMapFilled } from './define.ts'

const { icon, prefixCls, type } = defineProps<IconNodeProps>()
const iconType = computed(() => iconMapFilled[type!] || null)
</script>

<template>
  <!-- 优先使用传入的icon prop，然后是默认类型图标 -->
  <template v-if="icon">
    <span :class="`${prefixCls}-icon`">
      <component :is="icon" v-if="typeof icon === 'function'" />
      <template v-else>
        {{ icon }}
      </template>
    </span>
  </template>
  <template v-else-if="iconType">
    <component :is="iconType" :class="[`${prefixCls}-icon`]" />
  </template>
</template>
