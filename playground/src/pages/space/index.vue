<script lang="ts">
import { defineComponent } from 'vue'
import Align from './align.vue'
import Base from './base.vue'
import CompactButtonVertical from './compact-button-vertical.vue'
import CompactButtons from './compact-buttons.vue'
import Compact from './compact.vue'
import Customize from './customize.vue'
import Size from './size.vue'
import Split from './split.vue'
import Vertical from './vertical.vue'
import Wrap from './wrap.vue'

export default defineComponent({
  components: {
    Basic: Base,
    Customize,
    Vertical,
    Align,
    Wrap,
    Split,
    Compact,
    CompactButtons,
    CompactButtonVertical,
    Size,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <demo-sort :cols="1">
    <Basic />
    <Customize />
    <Size />
    <Vertical />
    <Align />
    <Split />
    <Compact />
    <CompactButtons />
    <CompactButtonVertical />

    <Wrap />
  </demo-sort>
</template>
