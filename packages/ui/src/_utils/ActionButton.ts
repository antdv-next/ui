import type { PropType } from 'vue'
import type { ButtonProps } from '../button'
import type { LegacyButtonType } from '../button/buttonHelpers'
import { defineComponent, h, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { Button } from '../button'
import { convertLegacyProps } from '../button/buttonHelpers'

export interface ActionButtonProps {
  type?: LegacyButtonType
  actionFn?: (...args: any[]) => any | PromiseLike<any>
  close?: (...args: any[]) => void
  autoFocus?: boolean
  prefixCls: string
  buttonProps?: Partial<ButtonProps>
  emitEvent?: boolean
  quitOnNullishReturnValue?: boolean
  children?: any
  isSilent?: () => boolean
}

const isThenable = <T>(thing?: PromiseLike<T>): thing is PromiseLike<T> => typeof thing?.then === 'function'

export default defineComponent({
  name: 'ActionButton',
  props: {
    type: {
      type: String as PropType<LegacyButtonType>,
    },
    actionFn: Function as PropType<(...args: any[]) => any>,
    close: Function as PropType<(...args: any[]) => void>,
    autoFocus: Boolean,
    prefixCls: {
      type: String,
      required: true,
    },
    buttonProps: {
      type: Object as PropType<Partial<ButtonProps>>,
    },
    emitEvent: Boolean,
    quitOnNullishReturnValue: Boolean,
    isSilent: Function as PropType<() => boolean>,
  },
  setup(props, { slots }) {
    const clickedRef = ref(false)
    const buttonRef = shallowRef<any>()
    const loading = ref<ButtonProps['loading']>(false)
    let autoFocusTimer: ReturnType<typeof setTimeout> | null = null

    const onInternalClose = (...args: any[]) => {
      props.close?.(...args)
    }

    const focusButton = () => {
      const instance = buttonRef.value
      const el: HTMLElement | null = instance
        ? (instance.$el as HTMLElement | undefined) ?? (instance as HTMLElement | undefined) ?? null
        : null
      el?.focus({ preventScroll: true })
    }

    onMounted(() => {
      if (props.autoFocus) {
        autoFocusTimer = setTimeout(() => {
          focusButton()
        })
      }
    })

    onBeforeUnmount(() => {
      if (autoFocusTimer) {
        clearTimeout(autoFocusTimer)
        autoFocusTimer = null
      }
    })

    const handlePromiseOnOk = (returnValue?: PromiseLike<any>) => {
      if (!isThenable(returnValue)) {
        return
      }

      loading.value = true
      returnValue.then(
        (...args: any[]) => {
          loading.value = false
          onInternalClose(...args)
          clickedRef.value = false
        },
        (error: Error) => {
          loading.value = false
          clickedRef.value = false

          if (props.isSilent?.()) {
            return
          }

          return Promise.reject(error)
        },
      )
    }

    const onClick = (event: MouseEvent) => {
      if (clickedRef.value) {
        return
      }
      clickedRef.value = true

      const { actionFn } = props
      if (!actionFn) {
        onInternalClose()
        return
      }

      let returnValue: any
      if (props.emitEvent) {
        returnValue = actionFn(event)
        if (props.quitOnNullishReturnValue && !isThenable(returnValue)) {
          clickedRef.value = false
          onInternalClose(event)
          return
        }
      } else if (actionFn.length) {
        returnValue = actionFn(props.close)
        clickedRef.value = false
      } else {
        returnValue = actionFn()
        if (!isThenable(returnValue)) {
          onInternalClose()
          return
        }
      }

      handlePromiseOnOk(returnValue)
    }

    return () => {
      const slotChildren = slots.default?.()
      const baseProps: Record<string, any> = {
        ...convertLegacyProps(props.type),
        onClick,
        loading: loading.value,
        prefixCls: props.prefixCls,
      }

      Object.assign(baseProps, props.buttonProps ?? {})

      return h(Button, {
        ...baseProps,
        ref: (instance: any) => {
          buttonRef.value = instance
        },
      }, {
        default: () => slotChildren,
      })
    }
  },
})
