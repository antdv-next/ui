<script setup lang="ts">
// Import components if needed
</script>

<template>
  <div class="tooltip-demo">
    <h1>Tooltip Demo</h1>

    <section>
      <h2>Basic Usage</h2>
      <div class="demo-row">
        <a-tooltip title="This is a tooltip">
          <a-button>Hover me</a-button>
        </a-tooltip>
      </div>
    </section>

    <section>
      <h2>Placement</h2>
      <div class="demo-grid">
        <a-tooltip placement="top" title="Top" trigger="click">
          <a-button>Top</a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="Top Left">
          <a-button>Top Left</a-button>
        </a-tooltip>
        <a-tooltip placement="topRight" title="Top Right">
          <a-button>Top Right</a-button>
        </a-tooltip>
        <a-tooltip placement="bottom" title="Bottom">
          <a-button>Bottom</a-button>
        </a-tooltip>
        <a-tooltip placement="bottomLeft" title="Bottom Left">
          <a-button>Bottom Left</a-button>
        </a-tooltip>
        <a-tooltip placement="bottomRight" title="Bottom Right">
          <a-button>Bottom Right</a-button>
        </a-tooltip>
        <a-tooltip placement="left" title="Left" trigger="click">
          <a-button>Left</a-button>
        </a-tooltip>
        <a-tooltip placement="right" title="Right" trigger="click">
          <a-button>Right</a-button>
        </a-tooltip>
      </div>
    </section>

    <section>
      <h2>Colors</h2>
      <div class="demo-row">
        <a-tooltip title="Default color">
          <a-button>Default</a-button>
        </a-tooltip>
        <a-tooltip color="blue" title="Blue tooltip">
          <a-button>Blue</a-button>
        </a-tooltip>
        <a-tooltip color="green" title="Green tooltip">
          <a-button>Green</a-button>
        </a-tooltip>
        <a-tooltip color="red" title="Red tooltip">
          <a-button>Red</a-button>
        </a-tooltip>
        <a-tooltip color="#ff6b35" title="Custom color" trigger="click">
          <a-button>Custom</a-button>
        </a-tooltip>
      </div>
    </section>

    <section>
      <h2>Trigger Methods</h2>
      <div class="demo-row">
        <a-tooltip trigger="hover" title="Hover to show">
          <a-button>Hover</a-button>
        </a-tooltip>
        <a-tooltip trigger="click" title="Click to show">
          <a-button>Click</a-button>
        </a-tooltip>
        <a-tooltip trigger="focus" title="Focus to show">
          <a-button>Focus</a-button>
        </a-tooltip>
      </div>
    </section>

    <section>
      <h2>No Arrow</h2>
      <div class="demo-row">
        <a-tooltip :arrow="false" title="Tooltip without arrow">
          <a-button>No Arrow</a-button>
        </a-tooltip>
      </div>
    </section>

    <section>
      <h2>Delay</h2>
      <div class="demo-row">
        <a-tooltip
          :mouse-enter-delay="1"
          :mouse-leave-delay="0.5"
          title="Tooltip with delay"
        >
          <a-button>Delayed Tooltip (1s enter, 0.5s leave)</a-button>
        </a-tooltip>
      </div>
    </section>

    <section>
      <h2>Custom Motion</h2>
      <div class="demo-row">
        <a-tooltip title="Default motion (zoom-big-fast)">
          <a-button>Default Motion</a-button>
        </a-tooltip>
        <a-tooltip
          :motion="{
            name: 'custom-fade',
            appear: true,
            enterActiveClass: 'custom-fade-enter-active',
            enterFromClass: 'custom-fade-enter-from',
            enterToClass: 'custom-fade-enter-to',
            leaveActiveClass: 'custom-fade-leave-active',
            leaveFromClass: 'custom-fade-leave-from',
            leaveToClass: 'custom-fade-leave-to',
          } as any"
          title="Custom fade motion"
        >
          <a-button>Custom Motion</a-button>
        </a-tooltip>
        <a-tooltip
          transition-name="ant-zoom-big"
          title="Custom transition name"
        >
          <a-button>Custom Transition Name</a-button>
        </a-tooltip>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tooltip-demo {
  padding: 20px;
}

section {
  margin-bottom: 40px;
}

h1 {
  color: #1890ff;
  margin-bottom: 20px;
}

h2 {
  color: #666;
  margin-bottom: 15px;
}

.demo-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  max-width: 600px;
}

/* Custom fade animation for motion demo */
:global(.custom-fade-enter-active),
:global(.custom-fade-leave-active) {
  transition: opacity 0.5s ease;
}

:global(.custom-fade-enter-from),
:global(.custom-fade-leave-to) {
  opacity: 0;
}

:global(.custom-fade-enter-to),
:global(.custom-fade-leave-from) {
  opacity: 1;
}
</style>
