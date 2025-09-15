<script setup lang="ts">
// 详细测试页面
</script>

<template>
  <div class="detailed-test" style="padding: 100px; background: #f5f5f5;">
    <h1 style="text-align: center; color: #1890ff;">
      箭头居中详细测试
    </h1>

    <!-- 测试基础位置的居中 -->
    <div class="test-section">
      <h2>基础位置测试（应该完全居中）</h2>
      <div class="center-grid">
        <div class="test-box">
          <h3>Top</h3>
          <div class="button-container">
            <a-tooltip placement="top" title="Top tooltip - 检查箭头是否居中" trigger="click">
              <div class="test-button">
                TOP
              </div>
            </a-tooltip>
          </div>
        </div>

        <div class="test-box">
          <h3>Bottom</h3>
          <div class="button-container">
            <a-tooltip placement="bottom" title="Bottom tooltip - 检查箭头是否居中" trigger="click">
              <div class="test-button">
                BOTTOM
              </div>
            </a-tooltip>
          </div>
        </div>

        <div class="test-box">
          <h3>Left</h3>
          <div class="button-container">
            <a-tooltip placement="left" title="Left tooltip - 检查箭头是否居中" trigger="click">
              <div class="test-button">
                LEFT
              </div>
            </a-tooltip>
          </div>
        </div>

        <div class="test-box">
          <h3>Right</h3>
          <div class="button-container">
            <a-tooltip placement="right" title="Right tooltip - 检查箭头是否居中" trigger="click">
              <div class="test-button">
                RIGHT
              </div>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>

    <!-- 测试边缘位置的偏移 -->
    <div class="test-section" style="margin-top: 100px;">
      <h2>边缘位置测试（应该有正确偏移）</h2>
      <div class="edge-grid">
        <div class="test-box">
          <h3>Top Left</h3>
          <a-tooltip placement="topLeft" title="Top Left - 箭头应该在左侧" trigger="click">
            <div class="test-button">
              TOP LEFT
            </div>
          </a-tooltip>
        </div>

        <div class="test-box">
          <h3>Top Right</h3>
          <a-tooltip placement="topRight" title="Top Right - 箭头应该在右侧" trigger="click">
            <div class="test-button">
              TOP RIGHT
            </div>
          </a-tooltip>
        </div>

        <div class="test-box">
          <h3>Bottom Left</h3>
          <a-tooltip placement="bottomLeft" title="Bottom Left - 箭头应该在左侧" trigger="click">
            <div class="test-button">
              BOTTOM LEFT
            </div>
          </a-tooltip>
        </div>

        <div class="test-box">
          <h3>Bottom Right</h3>
          <a-tooltip placement="bottomRight" title="Bottom Right - 箭头应该在右侧" trigger="click">
            <div class="test-button">
              BOTTOM RIGHT
            </div>
          </a-tooltip>
        </div>

        <div class="test-box">
          <h3>Left Top</h3>
          <a-tooltip placement="leftTop" title="Left Top - 箭头应该在上方" trigger="click">
            <div class="test-button">
              LEFT TOP
            </div>
          </a-tooltip>
        </div>

        <div class="test-box">
          <h3>Left Bottom</h3>
          <a-tooltip placement="leftBottom" title="Left Bottom - 箭头应该在下方" trigger="click">
            <div class="test-button">
              LEFT BOTTOM
            </div>
          </a-tooltip>
        </div>

        <div class="test-box">
          <h3>Right Top</h3>
          <a-tooltip placement="rightTop" title="Right Top - 箭头应该在上方" trigger="click">
            <div class="test-button">
              RIGHT TOP
            </div>
          </a-tooltip>
        </div>

        <div class="test-box">
          <h3>Right Bottom</h3>
          <a-tooltip placement="rightBottom" title="Right Bottom - 箭头应该在下方" trigger="click">
            <div class="test-button">
              RIGHT BOTTOM
            </div>
          </a-tooltip>
        </div>
      </div>
    </div>

    <!-- 不同大小的元素测试 -->
    <div class="test-section" style="margin-top: 100px;">
      <h2>不同大小元素测试</h2>
      <div class="size-tests">
        <a-tooltip placement="top" title="小元素" trigger="click">
          <div class="test-button small">
            小
          </div>
        </a-tooltip>

        <a-tooltip placement="top" title="正常元素" trigger="click">
          <div class="test-button">
            正常
          </div>
        </a-tooltip>

        <a-tooltip placement="top" title="大元素" trigger="click">
          <div class="test-button large">
            大元素测试
          </div>
        </a-tooltip>

        <a-tooltip placement="top" title="超大元素" trigger="click">
          <div class="test-button xlarge">
            超大元素测试箭头居中效果
          </div>
        </a-tooltip>
      </div>
    </div>

    <!-- 垂直测试 -->
    <div class="test-section" style="margin-top: 100px;">
      <h2>垂直方向测试</h2>
      <div class="vertical-tests">
        <a-tooltip placement="bottom" title="底部箭头居中测试" trigger="click">
          <div class="test-button">
            底部测试
          </div>
        </a-tooltip>

        <a-tooltip placement="left" title="左侧箭头居中测试" trigger="click">
          <div class="test-button">
            左侧测试
          </div>
        </a-tooltip>

        <a-tooltip placement="right" title="右侧箭头居中测试" trigger="click">
          <div class="test-button">
            右侧测试
          </div>
        </a-tooltip>
      </div>
    </div>

    <div class="instructions">
      <h3>测试说明：</h3>
      <ul>
        <li><strong>重点检查</strong>：基础位置 (top, bottom, left, right) 的箭头必须完全居中</li>
        <li><strong>边缘位置</strong>：topLeft, topRight 等应该有适当的偏移</li>
        <li><strong>不同大小</strong>：无论元素大小，箭头都应该正确对齐</li>
        <li><strong>调试提示</strong>：打开浏览器开发者工具检查箭头元素的样式</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.detailed-test {
  max-width: 1200px;
  margin: 0 auto;
}

.test-section {
  margin-bottom: 60px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

h3 {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
}

.center-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 600px;
  margin: 0 auto;
}

.edge-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.test-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px dashed #ddd;
  border-radius: 4px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
}

.test-button {
  background: #1890ff;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  transition: all 0.3s;
  font-weight: 500;
}

.test-button:hover {
  background: #40a9ff;
  transform: translateY(-1px);
}

.test-button.small {
  padding: 4px 8px;
  font-size: 12px;
}

.test-button.large {
  padding: 12px 24px;
  font-size: 16px;
}

.test-button.xlarge {
  padding: 16px 32px;
  font-size: 18px;
  min-width: 200px;
}

.size-tests {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

.vertical-tests {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
}

.instructions {
  background: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #1890ff;
  margin-top: 40px;
}

.instructions h3 {
  text-align: left;
  color: #1890ff;
  margin-bottom: 10px;
}

.instructions ul {
  margin: 0;
  padding-left: 20px;
}

.instructions li {
  margin-bottom: 8px;
  color: #666;
  line-height: 1.5;
}

.instructions strong {
  color: #1890ff;
}
</style>
