<script setup lang="ts">
// 测试页面，无需额外逻辑
</script>

<template>
  <div class="arrow-test">
    <h1>Tooltip Arrow Centering Test</h1>

    <section>
      <h2>Top & Bottom Placements (重点测试)</h2>
      <div class="test-grid">
        <div class="test-item">
          <h3>Top</h3>
          <a-tooltip placement="top" title="箭头应该居中" trigger="click">
            <a-button type="primary">
              Top Tooltip
            </a-button>
          </a-tooltip>
        </div>

        <div class="test-item">
          <h3>Bottom</h3>
          <a-tooltip placement="bottom" title="箭头应该居中" trigger="click">
            <a-button type="primary">
              Bottom Tooltip
            </a-button>
          </a-tooltip>
        </div>

        <div class="test-item">
          <h3>Top Left</h3>
          <a-tooltip placement="topLeft" title="箭头应该在左侧" trigger="click">
            <a-button type="primary">
              Top Left
            </a-button>
          </a-tooltip>
        </div>

        <div class="test-item">
          <h3>Top Right</h3>
          <a-tooltip placement="topRight" title="箭头应该在右侧" trigger="click">
            <a-button type="primary">
              Top Right
            </a-button>
          </a-tooltip>
        </div>

        <div class="test-item">
          <h3>Bottom Left</h3>
          <a-tooltip placement="bottomLeft" title="箭头应该在左侧" trigger="click">
            <a-button type="primary">
              Bottom Left
            </a-button>
          </a-tooltip>
        </div>

        <div class="test-item">
          <h3>Bottom Right</h3>
          <a-tooltip placement="bottomRight" title="箭头应该在右侧" trigger="click">
            <a-button type="primary">
              Bottom Right
            </a-button>
          </a-tooltip>
        </div>
      </div>
    </section>

    <section style="margin-top: 100px;">
      <h2>Left & Right Placements (对比测试)</h2>
      <div class="test-grid">
        <div class="test-item">
          <h3>Left</h3>
          <a-tooltip placement="left" title="箭头应该居中" trigger="click">
            <a-button type="primary">
              Left Tooltip
            </a-button>
          </a-tooltip>
        </div>

        <div class="test-item">
          <h3>Right</h3>
          <a-tooltip placement="right" title="箭头应该居中" trigger="click">
            <a-button type="primary">
              Right Tooltip
            </a-button>
          </a-tooltip>
        </div>

        <div class="test-item">
          <h3>Left Top</h3>
          <a-tooltip placement="leftTop" title="箭头应该在上方" trigger="click">
            <a-button type="primary">
              Left Top
            </a-button>
          </a-tooltip>
        </div>

        <div class="test-item">
          <h3>Left Bottom</h3>
          <a-tooltip placement="leftBottom" title="箭头应该在下方" trigger="click">
            <a-button type="primary">
              Left Bottom
            </a-button>
          </a-tooltip>
        </div>

        <div class="test-item">
          <h3>Right Top</h3>
          <a-tooltip placement="rightTop" title="箭头应该在上方" trigger="click">
            <a-button type="primary">
              Right Top
            </a-button>
          </a-tooltip>
        </div>

        <div class="test-item">
          <h3>Right Bottom</h3>
          <a-tooltip placement="rightBottom" title="箭头应该在下方" trigger="click">
            <a-button type="primary">
              Right Bottom
            </a-button>
          </a-tooltip>
        </div>
      </div>
    </section>

    <section style="margin-top: 100px;">
      <h2>不同大小的按钮测试</h2>
      <div class="size-test">
        <a-tooltip placement="top" title="小按钮的 tooltip" trigger="click">
          <a-button size="small">
            小
          </a-button>
        </a-tooltip>

        <a-tooltip placement="top" title="中等按钮的 tooltip" trigger="click">
          <a-button>中</a-button>
        </a-tooltip>

        <a-tooltip placement="top" title="大按钮的 tooltip" trigger="click">
          <a-button size="large">
            大
          </a-button>
        </a-tooltip>

        <a-tooltip placement="bottom" title="超长按钮的 tooltip" trigger="click">
          <a-button style="width: 200px;">
            超长按钮测试箭头居中
          </a-button>
        </a-tooltip>
      </div>
    </section>

    <div class="instructions">
      <h3>测试说明：</h3>
      <ul>
        <li>点击按钮显示 tooltip</li>
        <li>检查箭头是否正确居中对准按钮</li>
        <li>特别关注 top 和 bottom 位置的箭头居中效果</li>
        <li>检查不同大小按钮的箭头对齐情况</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.arrow-test {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #1890ff;
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  color: #666;
  margin: 30px 0 15px 0;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

h3 {
  color: #999;
  font-size: 14px;
  margin-bottom: 8px;
  text-align: center;
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 20px;
}

.test-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #fafafa;
}

.size-test {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 6px;
}

.instructions {
  margin-top: 40px;
  padding: 20px;
  background: #f0f8ff;
  border-radius: 6px;
  border-left: 4px solid #1890ff;
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
  margin-bottom: 5px;
  color: #666;
}
</style>
