<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { TooltipRef } from '../tooltip'
import type { PopoverEmits, PopoverProps, PopoverSlots } from './define'
import { computed, h, shallowRef, useSlots } from 'vue'
import { flattenChildren } from '../_utils/checker.ts'
import { classNames } from '../_utils/classNames.ts'
import { useComponentConfig } from '../config-provider/context'
import { Tooltip } from '../tooltip'

const props = withDefaults(defineProps<PopoverProps>(), {
  trigger: 'hover',
  placement: 'top',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrow: true,
  destroyOnHidden: false,
  autoAdjustOverflow: true,
})

const emit = defineEmits<PopoverEmits>()
const slots = useSlots() as PopoverSlots

const componentConfig = useComponentConfig('popover')

const prefixCls = computed(() => {
  const configPrefix = componentConfig.value?.getPrefixCls
  return configPrefix?.('popover', props.prefixCls) ?? props.prefixCls ?? 'ant-popover'
})

function resolveNode(propValue?: PopoverProps['title'], slot?: () => any) {
  if (slot)
    return slot()
  if (typeof propValue === 'function')
    return (propValue as any)()
  return propValue
}

function hasContent(node: any): boolean {
  if (node === null || node === undefined)
    return false
  const children = flattenChildren(node as any, true)
  return children.length > 0
}

const titleNode = computed(() => resolveNode(props.title, slots.title))
const contentNode = computed(() => resolveNode(props.content, slots.content))

const overlayContent = computed(() => {
  const title = titleNode.value
  const content = contentNode.value
  const hasTitle = hasContent(title)
  const hasBody = hasContent(content)

  if (!hasTitle && !hasBody)
    return null

  return () => h('div', { class: `${prefixCls.value}-content` }, [
    hasTitle ? h('div', { class: `${prefixCls.value}-title` }, title) : null,
    hasBody ? h('div', { class: `${prefixCls.value}-inner-content` }, content) : null,
  ])
})

const mergedClassNames = computed(() => {
  const contextClassNames = componentConfig.value?.classNames ?? {}
  return {
    root: classNames(
      props.overlayClassName,
      props.rootClassName,
      componentConfig.value?.className,
      contextClassNames.root,
      props.classNames?.root,
    ),
    body: classNames(
      contextClassNames.body,
      props.classNames?.body,
    ),
  }
})

const mergedStyles = computed(() => {
  const contextStyles = componentConfig.value?.styles ?? {}
  const style: Record<string, CSSProperties | undefined> = {}
  style.root = {
    ...contextStyles.root,
    ...componentConfig.value?.style,
    ...props.overlayStyle,
    ...props.styles?.root,
  }
  style.body = {
    ...contextStyles.body,
    ...props.styles?.body,
    ...props.overlayInnerStyle,
  }
  return style
})

const tooltipBindings = computed(() => {
  const base: Record<string, any> = {
    ...props,
    prefixCls: prefixCls.value,
    classNames: mergedClassNames.value,
    styles: mergedStyles.value,
    overlay: overlayContent.value ?? undefined,
  }
  delete base.content
  delete base.onOpenChange
  delete base.title
  return base
})

function handleUpdateOpen(open: boolean) {
  emit('update:open', open)
  emit('update:visible', open)
}

function handleOpenChange(open: boolean) {
  emit('openChange', open)
  emit('visibleChange', open)
  props.onOpenChange?.(open)
}

const tooltipRef = shallowRef<TooltipRef | null>(null)

defineExpose({
  forceAlign: () => tooltipRef.value?.forceAlign(),
  get nativeElement() {
    return tooltipRef.value?.nativeElement ?? null
  },
  get popupElement() {
    return tooltipRef.value?.popupElement ?? null
  },
})
</script>

<template>
  <Tooltip
    v-bind="tooltipBindings"
    ref="tooltipRef"
    @update:open="handleUpdateOpen"
    @open-change="handleOpenChange"
  >
    <slot />
  </Tooltip>
</template>
