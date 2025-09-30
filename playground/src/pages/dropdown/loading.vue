<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { h, onBeforeUnmount, ref } from 'vue'

const items = [
  {
    key: '1',
    label: 'Submit and continue',
  },
]

const loadings = ref<boolean[]>([])
const timers: number[] = []

function setLoading(index: number, value: boolean) {
  const next = [...loadings.value]
  next[index] = value
  loadings.value = next
}

function enterLoading(index: number) {
  setLoading(index, true)
  if (timers[index])
    clearTimeout(timers[index])
  timers[index] = window.setTimeout(() => {
    setLoading(index, false)
    timers[index] = 0 as any
  }, 6000)
}

onBeforeUnmount(() => {
  timers.forEach((timer) => {
    if (timer)
      clearTimeout(timer)
  })
})
</script>

<template>
  <a-space direction="vertical">
    <a-dropdown-button type="primary" loading :menu="{ items }">
      Submit
    </a-dropdown-button>
    <a-dropdown-button type="primary" size="small" loading :menu="{ items }">
      Submit
    </a-dropdown-button>
    <a-dropdown-button
      type="primary"
      :loading="loadings[0]"
      :menu="{ items }"
      @click="() => enterLoading(0)"
    >
      Submit
    </a-dropdown-button>
    <a-dropdown-button
      :icon="() => h(DownOutlined)"
      :loading="loadings[1]"
      :menu="{ items }"
      @click="() => enterLoading(1)"
    >
      Submit
    </a-dropdown-button>
  </a-space>
</template>
