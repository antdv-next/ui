<script lang="ts" setup>
import { ref } from 'vue'

const size = ref('small' as const)
</script>

<template>
  <div>
    <div role="radiogroup" aria-label="size">
      <label class="radio">
        <input v-model="size" type="radio" name="size" value="small">
        <span class="radio-btn">Small</span>
      </label>

      <label class="radio">
        <input v-model="size" type="radio" name="size" value="middle">
        <span class="radio-btn">Middle</span>
      </label>

      <label class="radio">
        <input v-model="size" type="radio" name="size" value="large">
        <span class="radio-btn">Large</span>
      </label>
    </div>
    <!-- <a-radio-group v-model:value="size"> -->
    <!--   <a-radio value="small"> -->
    <!--     Small -->
    <!--   </a-radio> -->
    <!--   <a-radio value="middle"> -->
    <!--     Middle -->
    <!--   </a-radio> -->
    <!--   <a-radio value="large"> -->
    <!--     Large -->
    <!--   </a-radio> -->
    <!-- </a-radio-group> -->
    <br>
    <br>
    <a-space :size="size">
      <a-button type="primary">
        Primary
      </a-button>
      <a-button>Default</a-button>
      <a-button type="dashed">
        Dashed
      </a-button>
      <a-button type="link">
        Link
      </a-button>
    </a-space>
  </div>
</template>
