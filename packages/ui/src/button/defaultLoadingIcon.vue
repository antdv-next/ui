<script setup lang="ts">
import type { DefaultLoadingIconProps } from './define.ts'
import { computed } from 'vue'
import InnerLoadingIcon from './InnerLoadingIcon.vue'

const props = defineProps<DefaultLoadingIconProps>()

const visible = computed(() => !!props.loading)

function onBeforeEnter(el: Element) {
  const element = el as HTMLElement
  element.style.width = '0px'
  element.style.opacity = '0'
  element.style.transform = 'scale(0)'
}

function onEnter(el: Element, done: () => void) {
  const element = el as HTMLElement
  // Force reflow
  element.style.width = `${element.scrollWidth}px`
  element.style.opacity = '1'
  element.style.transform = 'scale(1)'
  done()
}

function onBeforeLeave(el: Element) {
  const element = el as HTMLElement
  element.style.width = `${element.scrollWidth}px`
  element.style.opacity = '1'
  element.style.transform = 'scale(1)'
}

function onLeave(el: Element, done: () => void) {
  const element = el as HTMLElement
  // Force reflow
  void element.offsetHeight
  element.style.width = '0px'
  element.style.opacity = '0'
  element.style.transform = 'scale(0)'
  done()
}
</script>

<template>
  <!-- If existIcon is true, render without animation -->
  <InnerLoadingIcon
    v-if="existIcon"
    :prefix-cls="prefixCls"
    :class="$attrs.class"
    :style="$attrs.style"
  />

  <!-- Otherwise render with animation -->
  <Transition
    v-else
    :name="`${prefixCls}-loading-icon-motion`"
    :appear="!mount"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
  >
    <InnerLoadingIcon
      v-if="visible"
      :prefix-cls="prefixCls"
      :class="$attrs.class"
      :style="$attrs.style"
    />
  </Transition>
</template>

<style scoped>

</style>
