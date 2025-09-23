<script setup lang="ts">
const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: '100°C',
  },
}
</script>

<template>
  <div style="padding: 20px;">
    <h4>included=true</h4>
    <a-slider :marks="marks" :value="37">
      <template #mark="{ point, label }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </template>
    </a-slider>
    <a-slider range :marks="marks" :value="[26, 37]">
      <template #mark="{ point, label }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </template>
    </a-slider>

    <h4>included=false</h4>
    <a-slider :marks="marks" :included="false" :value="37">
      <template #mark="{ point, label }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </template>
    </a-slider>

    <h4>marks & step</h4>
    <a-slider :marks="marks" :step="10" :value="37">
      <template #mark="{ point, label }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </template>
    </a-slider>

    <h4>step=null</h4>
    <a-slider :marks="marks" :step="null" :value="37">
      <template #mark="{ point, label }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </template>
    </a-slider>
  </div>
</template>

<style scoped>

</style>