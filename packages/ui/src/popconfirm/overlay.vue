<script lang="ts">
import type { PropType } from 'vue'
import type { LegacyButtonType } from '../button/buttonHelpers'
import type { OverlayProps, PopconfirmLocale } from './define'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import { computed, defineComponent, h } from 'vue'
import ActionButton from '../_utils/ActionButton'
import { Button } from '../button'
import { useConfigContext } from '../config-provider/context'
import { useLocale } from '../locale'
import defaultLocale from '../locale/en_US'

function getRenderPropValue(value?: OverlayProps['title']) {
  if (typeof value === 'function') {
    return (value as () => any)()
  }
  return value
}

export default defineComponent({
  name: 'PopconfirmOverlay',
  props: {
    prefixCls: {
      type: String,
      required: true,
    },
    icon: {
      type: [Object, Function] as PropType<OverlayProps['icon']>,
    },
    okButtonProps: {
      type: Object as PropType<OverlayProps['okButtonProps']>,
    },
    cancelButtonProps: {
      type: Object as PropType<OverlayProps['cancelButtonProps']>,
    },
    cancelText: {
      type: [String, Number, Object, Function] as PropType<OverlayProps['cancelText']>,
    },
    okText: {
      type: [String, Number, Object, Function] as PropType<OverlayProps['okText']>,
    },
    okType: {
      type: String as PropType<LegacyButtonType>,
      default: 'primary',
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    title: {
      type: [String, Number, Object, Function] as PropType<OverlayProps['title']>,
    },
    description: {
      type: [String, Number, Object, Function] as PropType<OverlayProps['description']>,
    },
    onPopupClick: Function as PropType<OverlayProps['onPopupClick']>,
    close: Function as PropType<OverlayProps['close']>,
    onConfirm: Function as PropType<OverlayProps['onConfirm']>,
    onCancel: Function as PropType<OverlayProps['onCancel']>,
  },
  setup(props, { slots }) {
    const configContext = useConfigContext()
    const [contextLocale] = useLocale<PopconfirmLocale>('Popconfirm', defaultLocale.Popconfirm)

    const iconNode = computed(() => {
      if (slots.icon) {
        return slots.icon()
      }
      const icon = props.icon
      if (typeof icon === 'function') {
        return (icon as any)()
      }
      if (icon !== undefined) {
        return icon
      }
      return h(ExclamationCircleFilled)
    })

    const titleNode = computed(() => slots.title?.() ?? getRenderPropValue(props.title))
    const descriptionNode = computed(() => slots.description?.() ?? getRenderPropValue(props.description))

    const cancelTextNode = computed(() => {
      const slot = slots.cancelText?.()
      if (slot && slot.length) {
        return slot
      }
      const value = getRenderPropValue(props.cancelText)
      return value ?? contextLocale.value.cancelText
    })

    const okTextNode = computed(() => {
      const slot = slots.okText?.()
      if (slot && slot.length) {
        return slot
      }
      const value = getRenderPropValue(props.okText)
      return value ?? contextLocale.value.okText
    })

    const showCancel = computed(() => props.showCancel !== false)

    const buttonPrefixCls = computed(() => configContext.getPrefixCls?.('btn') ?? 'ant-btn')

    const handleCancel = (event: MouseEvent) => {
      props.onCancel?.(event)
    }

    return () => {
      const children = [] as any[]

      const messageChildren = [] as any[]
      if (iconNode.value) {
        messageChildren.push(
          h('span', { class: `${props.prefixCls}-message-icon` }, iconNode.value),
        )
      }

      const textChildren = [] as any[]
      if (titleNode.value) {
        textChildren.push(h('div', { class: `${props.prefixCls}-title` }, titleNode.value))
      }
      if (descriptionNode.value) {
        textChildren.push(h('div', { class: `${props.prefixCls}-description` }, descriptionNode.value))
      }

      messageChildren.push(
        h('div', { class: `${props.prefixCls}-message-text` }, textChildren),
      )

      const buttons: any[] = []
      if (showCancel.value) {
        buttons.push(
          h(
            Button,
            {
              size: 'small',
              ...(props.cancelButtonProps ?? {}),
              onClick: handleCancel as any,
            },
            () => cancelTextNode.value,
          ),
        )
      }

      buttons.push(
        h(
          ActionButton,
          {
            type: props.okType,
            buttonProps: {
              size: 'small',
              ...(props.okButtonProps ?? {}),
            },
            actionFn: props.onConfirm as any,
            close: props.close as any,
            prefixCls: buttonPrefixCls.value,
            quitOnNullishReturnValue: true,
            emitEvent: true,
          },
          () => okTextNode.value,
        ),
      )

      children.push(
        h('div', { class: `${props.prefixCls}-message` }, messageChildren),
        h('div', { class: `${props.prefixCls}-buttons` }, buttons),
      )

      return h(
        'div',
        {
          class: `${props.prefixCls}-inner-content`,
          onClick: props.onPopupClick,
        },
        children,
      )
    }
  },
})
</script>
