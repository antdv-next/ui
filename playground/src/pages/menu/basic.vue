<script setup lang="ts">
import { computed, ref } from 'vue'

const inlineItems = [
  {
    key: '1',
    label: 'Navigation One',
  },
  {
    key: '2',
    label: 'Navigation Two',
  },
  {
    key: '3',
    label: 'Navigation Three',
  },
  {
    key: 'sub1',
    label: 'Navigation Four',
    children: [
      { key: '4', label: 'Option 1' },
      { key: '5', label: 'Option 2' },
      { key: '6', label: 'Option 3' },
    ],
  },
]

const horizontalItems = [
  { key: 'h1', label: 'Navigation One' },
  { key: 'h2', label: 'Navigation Two' },
  {
    key: 'h-sub',
    label: 'Sub Menu',
    children: [
      { key: 'h3', label: 'Option 1' },
      { key: 'h4', label: 'Option 2' },
      { key: 'h5', label: 'Option 3' },
    ],
  },
]

const inlineSelectedKeys = ref<string[]>(['1'])
const inlineOpenKeys = ref<string[]>(['sub1'])
const collapsed = ref(false)

const collapsedItems = computed(() => inlineItems)
</script>

<template>
  <a-flex gap="middle" wrap="wrap">
    <div class="w-200px">
      <a-menu
        v-model:selected-keys="inlineSelectedKeys"
        v-model:open-keys="inlineOpenKeys"
        mode="inline"
        :items="inlineItems"
      />
    </div>

    <div class="w-full">
      <a-menu mode="horizontal" :items="horizontalItems" />
    </div>

    <div>
      <a-button class="mb-16px" @click="collapsed = !collapsed">
        {{ collapsed ? 'Expand' : 'Collapse' }}
      </a-button>
      <a-menu
        :inline-collapsed="collapsed"
        mode="inline"
        :items="collapsedItems"
        style="width: 200px"
      />
    </div>
  </a-flex>
</template>
