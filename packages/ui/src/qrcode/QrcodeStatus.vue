<script setup lang="ts">
import type { QRCodeEmits, QRcodeStatusProps } from './define'
import { Button } from '../button'
import { Spin } from '../spin'

defineProps<QRcodeStatusProps>()
defineEmits<QRCodeEmits>()
</script>

<template>
  <slot name="statusRender">
    <template v-if="status === 'expired'">
      <p :class="`${prefixCls}-expired`">
        expired
      </p>
      <Button v-if="onRefresh" type="link" @click="$emit('refresh')">
        refresh
      </Button>
    </template>
    <template v-else-if="status === 'loading'">
      <Spin />
    </template>
    <template v-else-if="status === 'scanned'">
      <p :class="`${prefixCls}-scanned`">
        scanned
      </p>
    </template>
  </slot>
</template>

<style scoped>

</style>
