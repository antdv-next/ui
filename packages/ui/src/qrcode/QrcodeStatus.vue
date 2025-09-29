<script setup lang="ts">
import type { QRCodeEmits, QRcodeStatusProps } from './define'
import { Button } from '../button'
import { useLocale } from '../locale'
import { Spin } from '../spin'

defineProps<QRcodeStatusProps>()
defineEmits<QRCodeEmits>()

const [localeContext] = useLocale('QRCode')
const { expired, scanned, refresh } = localeContext.value
</script>

<template>
  <slot name="statusRender">
    <template v-if="status === 'expired'">
      <p :class="`${prefixCls}-expired`">
        {{ expired }}
      </p>
      <Button v-if="onRefresh" type="link" @click="$emit('refresh')">
        {{ refresh }}
      </Button>
    </template>
    <template v-else-if="status === 'loading'">
      <Spin />
    </template>
    <template v-else-if="status === 'scanned'">
      <p :class="`${prefixCls}-scanned`">
        {{ scanned }}
      </p>
    </template>
  </slot>
</template>

<style scoped>

</style>
