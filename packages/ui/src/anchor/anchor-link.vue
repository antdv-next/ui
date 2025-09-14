<script setup lang="ts">
import type { AnchorLinkBaseProps } from './define.ts'
import { computed, onMounted, onUnmounted } from 'vue'
import { classNames } from '../_utils/classNames.ts'
import { useComponentConfig } from '../config-provider/context.ts'
import { useAnchorContext } from './context.ts'

interface AnchorLinkProps extends AnchorLinkBaseProps {
  // No additional props needed beyond base
}

const props = defineProps<AnchorLinkProps>()

const context = useAnchorContext()
const { registerLink, unregisterLink, scrollTo, onClick, activeLink, direction } = context

const compCtx = useComponentConfig('anchor')
const prefixCls = computed(() => compCtx.value?.getPrefixCls?.('anchor', props.prefixCls))

const active = computed(() => activeLink.value === props.href)

const wrapperClassName = computed(() => {
  return classNames(`${prefixCls.value}-link`, props.className, {
    [`${prefixCls.value}-link-active`]: active.value,
  })
})

const titleClassName = computed(() => {
  return classNames(`${prefixCls.value}-link-title`, {
    [`${prefixCls.value}-link-title-active`]: active.value,
  })
})

function handleClick(e: MouseEvent) {
  onClick?.(e, { title: props.title, href: props.href })
  scrollTo?.(props.href)

  // Support clicking on an anchor does not record history.
  if (e.defaultPrevented) {
    return
  }

  const isExternalLink = props.href.startsWith('http://') || props.href.startsWith('https://')
  // Support external link
  if (isExternalLink) {
    if (props.replace) {
      e.preventDefault()
      window.location.replace(props.href)
    }
    return
  }

  // Handling internal anchor link
  e.preventDefault()
  const historyMethod = props.replace ? 'replaceState' : 'pushState'
  window.history[historyMethod](null, '', props.href)
}

onMounted(() => {
  registerLink?.(props.href)
})

onUnmounted(() => {
  unregisterLink?.(props.href)
})
</script>

<template>
  <div :class="wrapperClassName">
    <a
      :class="titleClassName"
      :href="href"
      :title="typeof title === 'string' ? title : ''"
      :target="target"
      @click="handleClick"
    >
      <component :is="title" v-if="typeof title === 'function'" />
      <template v-else>
        {{ title }}
      </template>
    </a>
    <template v-if="direction !== 'horizontal'">
      <slot />
    </template>
  </div>
</template>
