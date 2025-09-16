<script setup lang="ts">
const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
]

const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9']
</script>

<template>
  <div>
    <a-divider orientation="left">
      Presets
    </a-divider>
    <a-space wrap>
      <a-tooltip
        v-for="color in colors"
        :key="color"
        title="prompt text"
        :color="color"
      >
        <a-button>{{ color }}</a-button>
      </a-tooltip>
    </a-space>
    <a-divider orientation="left">
      Custom
    </a-divider>
    <a-space wrap>
      <a-tooltip
        v-for="color in customColors"
        :key="color"
        title="prompt text"
        :color="color"
      >
        <a-button>{{ color }}</a-button>
      </a-tooltip>
    </a-space>
  </div>
</template>
