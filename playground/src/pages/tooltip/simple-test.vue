<script setup lang="ts">
// 简单测试页面
</script>

<template>
  <div class="simple-test" style="padding: 100px; text-align: center;">
    <h2>箭头居中测试</h2>

    <div style="margin: 50px;">
      <a-tooltip placement="top" title="Top tooltip - 箭头应该居中" trigger="click">
        <a-button type="primary">
          点击测试 Top
        </a-button>
      </a-tooltip>
    </div>

    <div style="margin: 50px;">
      <a-tooltip placement="bottom" title="Bottom tooltip - 箭头应该居中" trigger="click">
        <a-button type="primary">
          点击测试 Bottom
        </a-button>
      </a-tooltip>
    </div>

    <div style="margin: 50px;">
      <a-tooltip placement="left" title="Left tooltip - 箭头应该居中" trigger="click">
        <a-button type="primary">
          点击测试 Left
        </a-button>
      </a-tooltip>
    </div>

    <div style="margin: 50px;">
      <a-tooltip placement="right" title="Right tooltip - 箭头应该居中" trigger="click">
        <a-button type="primary">
          点击测试 Right
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>
