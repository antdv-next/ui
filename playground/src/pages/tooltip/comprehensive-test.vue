<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

function toggleVisible() {
  visible.value = !visible.value
}
</script>

<template>
  <div class="tooltip-test">
    <h1>Tooltip 综合测试</h1>

    <!-- 基础用法 -->
    <section class="test-section">
      <h2>基础用法</h2>
      <div class="demo-row">
        <a-tooltip title="这是一个提示信息">
          <a-button>悬停显示</a-button>
        </a-tooltip>

        <a-tooltip title="点击切换显示" trigger="click">
          <a-button>点击显示</a-button>
        </a-tooltip>

        <a-tooltip title="聚焦显示" trigger="focus">
          <a-button>聚焦显示</a-button>
        </a-tooltip>
      </div>
    </section>

    <!-- 受控模式 -->
    <section class="test-section">
      <h2>受控模式</h2>
      <div class="demo-row">
        <a-button @click="toggleVisible">
          {{ visible ? '隐藏' : '显示' }} Tooltip
        </a-button>
        <a-tooltip v-model:open="visible" title="受控的 Tooltip">
          <a-button>受控组件</a-button>
        </a-tooltip>
      </div>
    </section>

    <!-- 12个方向 -->
    <section class="test-section">
      <h2>12个方向</h2>
      <div class="placement-grid">
        <div class="row">
          <a-tooltip placement="topLeft" title="Top Left">
            <a-button>TL</a-button>
          </a-tooltip>
          <a-tooltip placement="top" title="Top">
            <a-button>Top</a-button>
          </a-tooltip>
          <a-tooltip placement="topRight" title="Top Right">
            <a-button>TR</a-button>
          </a-tooltip>
        </div>

        <div class="row">
          <a-tooltip placement="leftTop" title="Left Top">
            <a-button>LT</a-button>
          </a-tooltip>
          <div class="center">
            中心区域
          </div>
          <a-tooltip placement="rightTop" title="Right Top">
            <a-button>RT</a-button>
          </a-tooltip>
        </div>

        <div class="row">
          <a-tooltip placement="left" title="Left">
            <a-button>Left</a-button>
          </a-tooltip>
          <div class="center" />
          <a-tooltip placement="right" title="Right">
            <a-button>Right</a-button>
          </a-tooltip>
        </div>

        <div class="row">
          <a-tooltip placement="leftBottom" title="Left Bottom">
            <a-button>LB</a-button>
          </a-tooltip>
          <div class="center" />
          <a-tooltip placement="rightBottom" title="Right Bottom">
            <a-button>RB</a-button>
          </a-tooltip>
        </div>

        <div class="row">
          <a-tooltip placement="bottomLeft" title="Bottom Left">
            <a-button>BL</a-button>
          </a-tooltip>
          <a-tooltip placement="bottom" title="Bottom">
            <a-button>Bottom</a-button>
          </a-tooltip>
          <a-tooltip placement="bottomRight" title="Bottom Right">
            <a-button>BR</a-button>
          </a-tooltip>
        </div>
      </div>
    </section>

    <!-- 不同颜色 -->
    <section class="test-section">
      <h2>预设颜色</h2>
      <div class="demo-row">
        <a-tooltip title="Pink" color="pink">
          <a-button>Pink</a-button>
        </a-tooltip>
        <a-tooltip title="Red" color="red">
          <a-button>Red</a-button>
        </a-tooltip>
        <a-tooltip title="Orange" color="orange">
          <a-button>Orange</a-button>
        </a-tooltip>
        <a-tooltip title="Green" color="green">
          <a-button>Green</a-button>
        </a-tooltip>
        <a-tooltip title="Blue" color="blue">
          <a-button>Blue</a-button>
        </a-tooltip>
        <a-tooltip title="Purple" color="purple">
          <a-button>Purple</a-button>
        </a-tooltip>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="test-section">
      <h2>自定义颜色</h2>
      <div class="demo-row">
        <a-tooltip title="自定义颜色" color="#f50">
          <a-button>橙红色</a-button>
        </a-tooltip>
        <a-tooltip title="自定义颜色" color="#2db7f5">
          <a-button>天蓝色</a-button>
        </a-tooltip>
        <a-tooltip title="自定义颜色" color="#87d068">
          <a-button>浅绿色</a-button>
        </a-tooltip>
      </div>
    </section>

    <!-- 箭头设置 -->
    <section class="test-section">
      <h2>箭头设置</h2>
      <div class="demo-row">
        <a-tooltip title="有箭头" :arrow="true">
          <a-button>有箭头</a-button>
        </a-tooltip>
        <a-tooltip title="无箭头" :arrow="false">
          <a-button>无箭头</a-button>
        </a-tooltip>
        <a-tooltip title="指向中心" :arrow="{ pointAtCenter: true }">
          <a-button>指向中心</a-button>
        </a-tooltip>
      </div>
    </section>

    <!-- 延迟设置 -->
    <section class="test-section">
      <h2>延迟设置</h2>
      <div class="demo-row">
        <a-tooltip title="延迟0.5秒显示" :mouse-enter-delay="0.5">
          <a-button>延迟显示</a-button>
        </a-tooltip>
        <a-tooltip title="延迟1秒隐藏" :mouse-leave-delay="1">
          <a-button>延迟隐藏</a-button>
        </a-tooltip>
      </div>
    </section>

    <!-- 多种触发器 -->
    <section class="test-section">
      <h2>多种触发器</h2>
      <div class="demo-row">
        <a-tooltip title="悬停和聚焦" :trigger="['hover', 'focus']">
          <a-button>悬停+聚焦</a-button>
        </a-tooltip>
        <a-tooltip title="点击和悬停" :trigger="['click', 'hover']">
          <a-button>点击+悬停</a-button>
        </a-tooltip>
        <a-tooltip title="右键菜单" trigger="contextMenu">
          <a-button>右键显示</a-button>
        </a-tooltip>
      </div>
    </section>

    <!-- Slot 内容 -->
    <section class="test-section">
      <h2>Slot 内容</h2>
      <div class="demo-row">
        <a-tooltip>
          <template #title>
            <div>
              <strong>富文本内容</strong>
              <br>
              <span style="color: #1890ff;">支持多种格式</span>
            </div>
          </template>
          <a-button>富文本提示</a-button>
        </a-tooltip>

        <a-tooltip>
          <template #title>
            <ul style="margin: 0; padding-left: 16px;">
              <li>列表项 1</li>
              <li>列表项 2</li>
              <li>列表项 3</li>
            </ul>
          </template>
          <a-button>列表内容</a-button>
        </a-tooltip>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="test-section">
      <h2>禁用状态</h2>
      <div class="demo-row">
        <a-tooltip title="禁用状态的按钮">
          <span>
            <a-button disabled>禁用按钮</a-button>
          </span>
        </a-tooltip>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tooltip-test {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.test-section {
  margin-bottom: 48px;
  padding: 24px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
}

.test-section h2 {
  margin: 0 0 16px 0;
  color: #1890ff;
  font-size: 18px;
}

.demo-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}

.placement-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
}

.placement-grid .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.placement-grid .center {
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 12px;
}

.placement-grid button {
  width: 60px;
  height: 40px;
  font-size: 12px;
}
</style>
