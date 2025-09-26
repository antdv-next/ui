<script setup lang="ts">
import type { VNode } from 'vue'
import type { DropdownButtonProps } from './define'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { computed, h, useAttrs, useSlots } from 'vue'
import { classNames } from '../_utils/classNames.ts'
import Button from '../button/button.vue'
import { useConfigContext } from '../config-provider/context.ts'
import Compact from '../space/compact.vue'
import { useCompactItemContext } from '../space/define.ts'
import Dropdown from './dropdown.vue'

defineOptions({
  name: 'ADropdownButton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownButtonProps>(), {
  type: 'default',
  danger: false,
  disabled: false,
  autoFocus: false,
  block: false,
  buttonsRender: (buttons: any[]) => buttons,
})

const slots = useSlots()
const attrs = useAttrs()

const configCtx = useConfigContext()

const dropdownPrefixCls = computed(() => configCtx.getPrefixCls('dropdown', props.prefixCls))
const buttonPrefixCls = computed(() => `${dropdownPrefixCls.value}-button`)
const direction = computed(() => configCtx.direction ?? 'ltr')

const { compactSize, compactItemClassnames } = useCompactItemContext(dropdownPrefixCls, direction)

const iconNode = computed(() => props.icon ?? h(EllipsisOutlined))

const dropdownBindings = computed(() => ({
  menu: props.menu,
  arrow: props.arrow,
  autoFocus: props.autoFocus,
  align: props.align,
  trigger: props.disabled ? [] : props.trigger,
  popupRender: props.popupRender ?? props.dropdownRender,
  // onOpenChange: props.onOpenChange,
  // onVisibleChange: props.onVisibleChange,
  open: props.open,
  visible: props.visible,
  disabled: props.disabled,
  destroyOnHidden: props.destroyOnHidden,
  destroyPopupOnHide: props.destroyPopupOnHide,
  forceRender: props.forceRender,
  getPopupContainer: props.getPopupContainer,
  prefixCls: props.prefixCls,
  rootClassName: props.rootClassName,
  transitionName: props.transitionName,
  placement: props.placement ?? (direction.value === 'rtl' ? 'bottomLeft' : 'bottomRight'),
  overlayClassName: props.overlayClassName,
  overlayStyle: props.overlayStyle,
  mouseEnterDelay: props.mouseEnterDelay,
  mouseLeaveDelay: props.mouseLeaveDelay,
  openClassName: props.openClassName,
  overlay: props.overlay,
  autoAdjustOverflow: props.autoAdjustOverflow,
}))

const leftButton = computed(() => h(
  Button,
  {
    type: props.type,
    danger: props.danger,
    disabled: props.disabled,
    loading: props.loading,
    onClick: (props as any).onClick,
    htmlType: props.htmlType,
    href: props.href,
    title: props.title,
  },
  {
    default: () => slots.default?.(),
  },
))

const rightButton = computed(() => h(Button, {
  type: props.type,
  danger: props.danger,
  disabled: props.disabled,
  icon: iconNode.value,
}))

const renderedButtons = computed(() => {
  const buttons = props.buttonsRender([leftButton.value, rightButton.value])
  if (!Array.isArray(buttons) || buttons.length < 2)
    return [leftButton.value, rightButton.value]
  return buttons as VNode[]
})

const wrapperClass = computed(() => classNames(
  buttonPrefixCls.value,
  compactItemClassnames.value,
))
</script>

<template>
  <Compact
    v-bind="attrs"
    :class="wrapperClass"
    :size="props.size ?? compactSize"
    :block="props.block"
  >
    <component :is="renderedButtons[0]" />
    <Dropdown v-bind="dropdownBindings">
      <component :is="renderedButtons[1]" />
    </Dropdown>
  </Compact>
</template>
