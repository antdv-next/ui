<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue'
import { shallowRef } from 'vue'

const iconsPosition = shallowRef<'start' | 'end'>('start')
</script>

<template>
  <div class="flex flex-col gap-2 p-3">
    <div class="flex flex-wrap gap-2">
      <a-button @click="iconsPosition = 'start'">
        start
      </a-button>
      <a-button @click="iconsPosition = 'end'">
        end
      </a-button>
      {{ iconsPosition }}
    </div>
    <div class="flex flex-wrap gap-2">
      <a-button type="primary" shape="circle">
        <template #icon>
          <SearchOutlined />
        </template>
      </a-button>
      <a-button type="primary" shape="circle">
        A
      </a-button>
      <a-button type="primary" :icon-position="iconsPosition">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </a-button>

      <a-button shape="circle">
        <template #icon>
          <SearchOutlined />
        </template>
      </a-button>

      <a-button :icon-position="iconsPosition">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </a-button>
    </div>
    <div class="flex flex-wrap gap-2">
      <a-button shape="circle">
        <template #icon>
          <SearchOutlined />
        </template>
      </a-button>
      <a-button type="text" :icon-position="iconsPosition">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </a-button>
      <a-button shape="circle" type="dashed">
        <template #icon>
          <SearchOutlined />
        </template>
      </a-button>

      <a-button type="dashed" :icon-position="iconsPosition">
        <template #icon>
          <SearchOutlined />
        </template>
        Search
      </a-button>
      <a-button href="https://www.google.com" target="_blank">
        <template #icon>
          <SearchOutlined />
        </template>
      </a-button>
      <a-button type="primary" loading :icon-position="iconsPosition">
        Loading
      </a-button>
    </div>
  </div>
</template>

<style scoped>

</style>
