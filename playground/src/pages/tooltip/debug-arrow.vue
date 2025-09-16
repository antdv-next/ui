<script setup lang="ts">
import { ref } from 'vue'

const openTooltip = ref(false)
</script>

<template>
  <div style="padding: 100px; display: flex; flex-direction: column; gap: 50px; align-items: center;">
    <h1>Debug Arrow CSS Variables</h1>

    <div>
      <a-tooltip
        v-model:open="openTooltip"
        placement="top"
        title="Check CSS variables in DevTools"
        trigger="click"
      >
        <a-button type="primary">
          Click to test arrow positioning
        </a-button>
      </a-tooltip>
    </div>

    <div>
      <p>Instructions:</p>
      <ol>
        <li>Click the button to open tooltip</li>
        <li>Open browser DevTools</li>
        <li>Inspect the tooltip element (div with class "ant-tooltip")</li>
        <li>Check computed styles for --arrow-x and --arrow-y variables</li>
      </ol>
    </div>

    <div>
      <h3>Different placements for testing:</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0;">
        <a-tooltip placement="top" title="Top placement" trigger="click">
          <a-button>Top</a-button>
        </a-tooltip>
        <a-tooltip placement="bottom" title="Bottom placement" trigger="click">
          <a-button>Bottom</a-button>
        </a-tooltip>
        <a-tooltip placement="left" title="Left placement" trigger="click">
          <a-button>Left</a-button>
        </a-tooltip>
        <a-tooltip placement="right" title="Right placement" trigger="click">
          <a-button>Right</a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="Top left placement" trigger="click">
          <a-button>TopLeft</a-button>
        </a-tooltip>
        <a-tooltip placement="bottomRight" title="Bottom right placement" trigger="click">
          <a-button>BottomRight</a-button>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>
