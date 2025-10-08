<script setup lang="ts">
import type { DropdownButtonEmits, DropdownButtonProps, DropdownButtonSlots } from './define'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { computed, h, useSlots } from 'vue'
import { classNames } from '../_utils/classNames'
import { Button } from '../button'
import { useConfigContext } from '../config-provider/context'
import { Compact } from '../space'
import Dropdown from './dropdown.vue'

defineOptions({
  name: 'ADropdownButton',
})

const props = withDefaults(defineProps<DropdownButtonProps>(), {
  type: 'default',
  trigger: () => ['hover'],
  placement: undefined,
  disabled: false,
  danger: false,
  loading: false,
  open: undefined,
})

const emit = defineEmits<DropdownButtonEmits>()

defineSlots<DropdownButtonSlots>()
const slots = useSlots()

const configCtx = useConfigContext()
const prefixCls = computed(() => configCtx.getPrefixCls('dropdown', props.prefixCls))
const direction = computed(() => configCtx.direction)
const buttonPrefixCls = computed(() => `${prefixCls.value}-button`)

// Compute dropdown placement - default to bottomRight for LTR, bottomLeft for RTL
const dropdownPlacement = computed(() => {
  if (props.placement) {
    return props.placement
  }
  return direction.value === 'rtl' ? 'bottomLeft' : 'bottomRight'
})

// Dropdown props
const dropdownProps = computed(() => {
  return {
    menu: props.menu,
    arrow: props.arrow,
    autoFocus: props.autoFocus,
    disabled: props.disabled,
    trigger: props.disabled ? [] : props.trigger,
    open: props.open,
    mouseEnterDelay: props.mouseEnterDelay,
    mouseLeaveDelay: props.mouseLeaveDelay,
    overlayClassName: props.overlayClassName,
    overlayStyle: props.overlayStyle,
    destroyOnHidden: props.destroyOnHidden,
    getPopupContainer: props.getPopupContainer,
    placement: dropdownPlacement.value,
    popupRender: props.popupRender,
    rootClassName: props.rootClassName,
    transitionName: props.transitionName,
    autoAdjustOverflow: props.autoAdjustOverflow,
    openClassName: props.openClassName,
  }
})

// Handle button click
function handleButtonClick(e: MouseEvent) {
  emit('click', e)
}

// Handle dropdown open change
function handleOpenChange(open: boolean, info: { source: 'trigger' | 'menu' }) {
  emit('openChange', open, info)
  emit('update:open', open)
}

// Render icon
function renderIcon() {
  if (slots.icon) {
    return slots.icon()
  }
  if (props.icon) {
    if (typeof props.icon === 'function') {
      return (props.icon as () => any)()
    }
    return props.icon
  }
  return h(EllipsisOutlined)
}

// Render left button
function renderLeftButton() {
  return h(Button, {
    type: props.type,
    danger: props.danger,
    disabled: props.disabled,
    loading: props.loading,
    htmlType: props.htmlType,
    href: props.href,
    title: props.title,
    size: props.size,
    onClick: handleButtonClick as any,
  }, {
    default: () => slots.default?.(),
  })
}

// Render right button (dropdown trigger)
function renderRightButton() {
  return h(Dropdown, {
    ...dropdownProps.value,
    onOpenChange: handleOpenChange,
  }, {
    default: () => h(Button, {
      type: props.type,
      danger: props.danger,
      size: props.size,
      disabled: props.disabled,
    }, {
      icon: renderIcon,
    }),
    overlay: slots.overlay,
  })
}

// Render buttons with custom renderer if provided
function renderButtons() {
  const leftButton = renderLeftButton()
  const rightButton = renderRightButton()

  if (props.buttonsRender) {
    const [left, right] = props.buttonsRender([leftButton, rightButton])
    return [left, right]
  }

  return [leftButton, rightButton]
}

const rootClassName = computed(() => {
  return classNames(
    buttonPrefixCls.value,
  )
})
</script>

<template>
  <Compact :class="rootClassName" block>
    <component
      :is="button"
      v-for="(button, index) in renderButtons()"
      :key="index"
    />
  </Compact>
</template>
