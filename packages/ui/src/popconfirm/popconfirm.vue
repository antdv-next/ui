<script setup lang="ts">
import type { PopoverProps } from '../popover'
import type { PopconfirmEmits, PopconfirmProps, PopconfirmSlots } from './define'
import { omit } from 'es-toolkit'
import { computed, defineOptions, h, ref, useSlots, watch } from 'vue'
import { classNames } from '../_utils/classNames.ts'
import { useComponentConfig } from '../config-provider/context.ts'
import { Popover } from '../popover'
import Overlay from './overlay.vue'

defineOptions({
  name: 'APopconfirm',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopconfirmProps>(), {
  placement: 'top',
  trigger: 'click',
  okType: 'primary',
  showCancel: true,
  open: undefined,
  visible: undefined,
})

const emit = defineEmits<PopconfirmEmits>()
defineSlots<PopconfirmSlots>()
const slots = useSlots() as PopconfirmSlots

const componentConfig = useComponentConfig('popconfirm')

const prefixCls = computed(() => {
  const getPrefixCls = componentConfig.value?.getPrefixCls
  return getPrefixCls?.('popconfirm', props.prefixCls) ?? props.prefixCls ?? 'ant-popconfirm'
})

const innerOpen = ref<boolean>(props.defaultOpen ?? props.defaultVisible ?? false)

watch(() => props.open, (value) => {
  if (value !== undefined) {
    innerOpen.value = value
  }
})

watch(() => props.visible, (value) => {
  if (props.open === undefined && value !== undefined) {
    innerOpen.value = value
  }
})

const mergedOpen = computed(() => {
  if (props.open !== undefined) {
    return props.open
  }
  if (props.visible !== undefined) {
    return props.visible
  }
  return innerOpen.value
})

const displayOpen = computed(() => (props.disabled ? false : mergedOpen.value))

function syncOpen(open: boolean) {
  if (props.open === undefined && props.visible === undefined) {
    innerOpen.value = open
  }
  emit('update:open', open)
  emit('update:visible', open)
}

function notifyOpenChange(open: boolean, _event?: MouseEvent | KeyboardEvent) {
  emit('openChange', open)
  emit('visibleChange', open)
  props.onOpenChange?.(open)
  props.onVisibleChange?.(open)
}

function close(event?: MouseEvent) {
  syncOpen(false)
  notifyOpenChange(false, event)
}

function handleConfirm(event: MouseEvent) {
  props.onConfirm?.(event)
  emit('confirm', event)
}

function handleCancel(event: MouseEvent) {
  close(event)
  props.onCancel?.(event)
  emit('cancel', event)
}

const overlayVNode = computed(() => {
  const overlayProps = {
    prefixCls: prefixCls.value,
    icon: props.icon,
    okButtonProps: props.okButtonProps,
    cancelButtonProps: props.cancelButtonProps,
    cancelText: props.cancelText,
    okText: props.okText,
    okType: props.okType,
    showCancel: props.showCancel,
    title: props.title,
    description: props.description,
    onPopupClick: props.onPopupClick,
    close,
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  }

  const overlaySlots: Record<string, any> = {}
  if (slots.icon)
    overlaySlots.icon = slots.icon
  if (slots.title)
    overlaySlots.title = slots.title
  if (slots.description)
    overlaySlots.description = slots.description
  if (slots.cancelText)
    overlaySlots.cancelText = slots.cancelText
  if (slots.okText)
    overlaySlots.okText = slots.okText

  return h(Overlay, overlayProps, overlaySlots)
})

const mergedClassNames = computed(() => {
  const contextClassNames = componentConfig.value?.classNames ?? {}
  return {
    root: classNames(
      prefixCls.value,
      componentConfig.value?.className,
      props.overlayClassName,
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
  return {
    root: {
      ...contextStyles.root,
      ...componentConfig.value?.style,
      ...props.overlayStyle,
      ...props.styles?.root,
    },
    body: {
      ...contextStyles.body,
      ...props.styles?.body,
    },
  } as PopoverProps['styles']
})

const popoverBindings = computed(() => {
  const base: Record<string, any> = {
    ...props,
    prefixCls: prefixCls.value,
    classNames: mergedClassNames.value,
    styles: mergedStyles.value,
    content: overlayVNode.value,
    open: displayOpen.value,
  }

  return omit(base, ['title', 'description', 'icon', 'okText', 'okType', 'cancelText', 'okButtonProps', 'cancelButtonProps', 'showCancel', 'onConfirm', 'onCancel', 'onPopupClick', 'disabled', 'onOpenChange', 'onVisibleChange'])
})

function handleUpdateOpen(open: boolean) {
  if (props.disabled && open) {
    syncOpen(false)
    return
  }
  syncOpen(open)
}

function handleOpenChange(open: boolean) {
  if (props.disabled && open) {
    return
  }
  notifyOpenChange(open)
}
</script>

<template>
  <Popover
    v-bind="popoverBindings"
    @update:open="handleUpdateOpen"
    @open-change="handleOpenChange"
  >
    <slot />
  </Popover>
</template>
