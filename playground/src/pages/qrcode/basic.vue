<script setup lang="ts">
import Base from './base.vue'
import CustomColor from './customColor.vue'
import CustomSize from './customSize.vue'
import CustomStatusRender from './customStatusRender.vue'
import Download from './download.vue'
import ErrorLevel from './errorLevel.vue'
import Icon from './icon.vue'
import Status from './status.vue'
import Type from './type.vue'
</script>

<template>
  <Base />
  <a-divider>base</a-divider>
  <CustomColor />
  <a-divider>customColor</a-divider>
  <CustomSize />
  <a-divider>customSize</a-divider>
  <CustomStatusRender />
  <a-divider>customStatus</a-divider>
  <Download />
  <a-divider>download</a-divider>
  <ErrorLevel />
  <a-divider>errorLevel</a-divider>
  <Icon />
  <a-divider>icon</a-divider>
  <Status />
  <a-divider>status</a-divider>
  <Type />
  <a-divider>type</a-divider>
</template>

<style scoped>

</style>
