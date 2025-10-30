<script lang="ts" setup>
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
</script>

<template>
  <h4 style="margin-bottom: 16px">
    Presets:
  </h4>
  <div>
    <div v-for="color in colors" :key="color">
      <a-badge :color="color" :text="color" />
    </div>
  </div>
  <a-divider orientation="left">
    Custom
  </a-divider>
  <a-badge color="#f50" text="#f50" />
  <br>
  <a-badge color="#2db7f5" text="#2db7f5" />
  <br>
  <a-badge color="#87d068" text="#87d068" />
  <br>
  <a-badge color="#108ee9" text="#108ee9" />
</template>
