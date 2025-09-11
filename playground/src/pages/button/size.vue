<script setup lang="ts">
import type { SizeType } from 'antdv-next'
import { DownloadOutlined } from '@ant-design/icons-vue'
import { shallowRef } from 'vue'

const size = shallowRef<SizeType>('middle')
const sizes = ['large', 'middle', 'small']
function toggleSize() {
  const index = sizes.indexOf(size.value as any)
  size.value = sizes[(index + 1) % sizes.length] as SizeType
}
</script>

<template>
  <div class="flex flex-col gap-2 p-3">
    <div class="flex">
      <a-button @click="toggleSize">
        {{ size }}
      </a-button>
    </div>
    <div class="flex flex-wrap gap-2">
      <a-button type="primary" :size="size">
        Primary
      </a-button>

      <a-button :size="size">
        Default
      </a-button>
      <a-button type="dashed" :size="size">
        Dashed
      </a-button>

      <a-button type="text" :size="size">
        Text
      </a-button>
      <a-button type="link" :size="size">
        Link
      </a-button>
    </div>
    <div class="flex flex-wrap gap-2">
      <a-button type="primary" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <a-button type="primary" :size="size" shape="circle">
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <a-button type="primary" :size="size" shape="round">
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <a-button type="primary" :size="size" shape="round">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </a-button>
      <a-button type="primary" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </a-button>
    </div>
  </div>
</template>

<style scoped>

</style>
