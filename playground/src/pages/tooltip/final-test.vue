<script setup lang="ts">
// 最终测试页面
</script>

<template>
  <div style="padding: 150px; text-align: center; background: #f8f9fa;">
    <h1>箭头居中最终测试</h1>

    <div style="margin: 80px 0;">
      <h2>基础位置（必须完全居中）</h2>
      <div style="display: flex; gap: 60px; justify-content: center; margin: 40px 0;">
        <a-tooltip placement="top" title="检查箭头是否在按钮正中央" trigger="click">
          <button style="padding: 10px 20px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Top
          </button>
        </a-tooltip>

        <a-tooltip placement="bottom" title="检查箭头是否在按钮正中央" trigger="click">
          <button style="padding: 10px 20px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Bottom
          </button>
        </a-tooltip>

        <a-tooltip placement="left" title="检查箭头是否在按钮正中央" trigger="click">
          <button style="padding: 10px 20px; background: #fa541c; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Left
          </button>
        </a-tooltip>

        <a-tooltip placement="right" title="检查箭头是否在按钮正中央" trigger="click">
          <button style="padding: 10px 20px; background: #722ed1; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Right
          </button>
        </a-tooltip>
      </div>
    </div>

    <div style="margin: 80px 0;">
      <h2>边缘位置（应该有偏移）</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; max-width: 800px; margin: 0 auto;">
        <a-tooltip placement="topLeft" title="箭头应该偏左" trigger="click">
          <button style="padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            TopLeft
          </button>
        </a-tooltip>

        <a-tooltip placement="topRight" title="箭头应该偏右" trigger="click">
          <button style="padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            TopRight
          </button>
        </a-tooltip>

        <a-tooltip placement="bottomLeft" title="箭头应该偏左" trigger="click">
          <button style="padding: 8px 16px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer;">
            BottomLeft
          </button>
        </a-tooltip>

        <a-tooltip placement="bottomRight" title="箭头应该偏右" trigger="click">
          <button style="padding: 8px 16px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer;">
            BottomRight
          </button>
        </a-tooltip>
      </div>
    </div>

    <div style="margin: 80px 0;">
      <h2>不同大小测试</h2>
      <div style="display: flex; gap: 40px; justify-content: center; align-items: center;">
        <a-tooltip placement="top" title="小按钮" trigger="click">
          <button style="padding: 4px 8px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
            小
          </button>
        </a-tooltip>

        <a-tooltip placement="top" title="正常按钮" trigger="click">
          <button style="padding: 10px 20px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            正常
          </button>
        </a-tooltip>

        <a-tooltip placement="top" title="大按钮" trigger="click">
          <button style="padding: 15px 30px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
            大按钮
          </button>
        </a-tooltip>

        <a-tooltip placement="top" title="超长按钮" trigger="click">
          <button style="padding: 12px 40px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; min-width: 200px;">
            超长按钮测试居中
          </button>
        </a-tooltip>
      </div>
    </div>

    <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-top: 40px; border: 1px solid #ffeaa7;">
      <h3 style="color: #856404; margin-bottom: 10px;">
        测试重点：
      </h3>
      <ul style="text-align: left; color: #856404; margin: 0; padding-left: 20px;">
        <li><strong>Top/Bottom/Left/Right</strong>：箭头必须完全居中对齐按钮</li>
        <li><strong>TopLeft/TopRight 等</strong>：箭头应该有适当的偏移</li>
        <li><strong>不同大小</strong>：箭头位置必须适应按钮大小</li>
        <li><strong>调试方法</strong>：右键检查元素，查看箭头的样式是否正确</li>
      </ul>
    </div>
  </div>
</template>
