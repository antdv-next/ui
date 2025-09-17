<script setup lang="ts">
import { ref } from 'vue'

const controlledOpen = ref(false)

function handleControlledChange(open: boolean) {
  controlledOpen.value = open
}
</script>

<template>
  <div class="popover-demo">
    <section>
      <h2>Basic Usage</h2>
      <a-popover title="Title" content="This is the popover content.">
        <a-button type="primary">
          Hover me
        </a-button>
      </a-popover>
    </section>

    <section>
      <h2>Slots</h2>
      <a-popover>
        <template #title>
          <div class="slot-title">
            Slot Title
          </div>
        </template>
        <template #content>
          <div>
            <p>Content rendered through the slot.</p>
            <a-button type="link" size="small">
              Action
            </a-button>
          </div>
        </template>
        <a-button>
          Hover for slots
        </a-button>
      </a-popover>
    </section>

    <section>
      <h2>Controlled</h2>
      <a-popover
        :open="controlledOpen"
        trigger="click"
        title="Controlled title"
        content="Click trigger with external control"
        @open-change="handleControlledChange"
      >
        <a-button type="dashed">
          Click me
        </a-button>
      </a-popover>
    </section>
  </div>
</template>

<style scoped>
.popover-demo {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding: 24px;
}

section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.slot-title {
  font-weight: 600;
}
</style>
