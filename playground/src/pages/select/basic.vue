<script setup lang="ts">
import { Select } from 'antdv-next'
import { ref } from 'vue'

const value = ref<string>()
const multipleValue = ref<string[]>([])

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
  { value: 'jerry', label: 'Jerry' },
]

const longLabelOptions = [
  { value: '1', label: 'This is a very long option label to test width matching' },
  { value: '2', label: 'Another long option label' },
  { value: '3', label: 'Short' },
]

function handleChange(val: any) {
  console.log('Change:', val)
}

function handleSelect(val: any) {
  console.log('Select:', val)
}
</script>

<template>
  <div class="select-demo">
    <h2>Select Basic</h2>
    <div class="demo-item">
      <h3>Basic</h3>
      <Select
        v-model:value="value"
        placeholder="Please select"
        style="width: 200px"
        :options="options"
        @change="handleChange"
        @select="handleSelect"
      />
      <div>Selected: {{ value }}</div>
    </div>

    <div class="demo-item">
      <h3>Multiple</h3>
      <Select
        v-model:value="multipleValue"
        mode="multiple"
        placeholder="Please select"
        style="width: 300px"
        :options="options"
        @change="handleChange"
      />
      <div>Selected: {{ multipleValue }}</div>
    </div>

    <div class="demo-item">
      <h3>Sizes</h3>
      <div style="display: flex; gap: 16px; flex-direction: column;">
        <Select
          placeholder="Large"
          size="large"
          style="width: 200px"
          :options="options"
        />
        <Select
          placeholder="Middle"
          size="middle"
          style="width: 200px"
          :options="options"
        />
        <Select
          placeholder="Small"
          size="small"
          style="width: 200px"
          :options="options"
        />
      </div>
    </div>

    <div class="demo-item">
      <h3>Variants</h3>
      <div style="display: flex; gap: 16px; flex-direction: column;">
        <Select
          placeholder="Outlined"
          variant="outlined"
          style="width: 200px"
          :options="options"
        />
        <Select
          placeholder="Filled"
          variant="filled"
          style="width: 200px"
          :options="options"
        />
        <Select
          placeholder="Borderless"
          variant="borderless"
          style="width: 200px"
          :options="options"
        />
      </div>
    </div>

    <div class="demo-item">
      <h3>Status</h3>
      <div style="display: flex; gap: 16px; flex-direction: column;">
        <Select
          placeholder="Error"
          status="error"
          style="width: 200px"
          :options="options"
        />
        <Select
          placeholder="Warning"
          status="warning"
          style="width: 200px"
          :options="options"
        />
      </div>
    </div>

    <div class="demo-item">
      <h3>Disabled</h3>
      <Select
        disabled
        placeholder="Disabled"
        style="width: 200px"
        :options="options"
      />
    </div>

    <div class="demo-item">
      <h3>Loading</h3>
      <Select
        loading
        placeholder="Loading"
        style="width: 200px"
        :options="options"
      />
    </div>

    <div class="demo-item">
      <h3>Allow Clear</h3>
      <Select
        v-model:value="value"
        allow-clear
        placeholder="Allow Clear"
        style="width: 200px"
        :options="options"
      />
    </div>

    <div class="demo-item">
      <h3>Show Search</h3>
      <Select
        show-search
        placeholder="Search"
        style="width: 200px"
        :options="options"
      />
    </div>

    <div class="demo-item">
      <h3>Width Matching (Default - matches select width)</h3>
      <Select
        v-model:value="value"
        placeholder="Dropdown matches select width"
        style="width: 300px"
        :options="longLabelOptions"
      />
    </div>

    <div class="demo-item">
      <h3>Custom Dropdown Width</h3>
      <Select
        v-model:value="value"
        placeholder="Custom dropdown width"
        style="width: 200px"
        :popup-match-select-width="400"
        :options="longLabelOptions"
      />
    </div>

    <div class="demo-item">
      <h3>Placement: Top</h3>
      <Select
        v-model:value="value"
        placement="topLeft"
        placeholder="Dropdown appears on top"
        style="width: 200px"
        :options="options"
      />
    </div>
  </div>
</template>

<style scoped>
.select-demo {
  padding: 24px;
}

.demo-item {
  margin-bottom: 32px;
}

.demo-item h3 {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
}
</style>
