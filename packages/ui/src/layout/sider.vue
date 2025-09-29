<script lang="ts">
import type { CSSProperties, PropType, StyleValue } from 'vue'
import type { Breakpoint, CollapseType, LayoutSiderProps, LayoutSiderTheme } from './define'
import { BarsOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent, h, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { classNames } from '../_utils/classNames'
import { addMediaQueryListener, removeMediaQueryListener } from '../_utils/mediaQueryUtil'
import { useConfigContext } from '../config-provider/context'
import { useLayoutContext, useProviderLayoutSider } from './context'
import { dimensionMaxMap } from './define'

let siderId = 0

function generateId(prefix = 'ant-layout-sider-') {
  siderId += 1
  return `${prefix}${siderId}`
}

function isNumeric(value: number | string | undefined): boolean {
  if (value === undefined || value === null) {
    return false
  }
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }
  const str = String(value).trim()
  if (!str || str.endsWith('%')) {
    return false
  }
  if (/^-?\d+(?:\.\d+)?(?:px)?$/.test(str)) {
    return true
  }
  return false
}

export default defineComponent({
  name: 'ALayoutSider',
  inheritAttrs: false,
  props: {
    prefixCls: String,
    className: String,
    rootClassName: String,
    style: Object as PropType<CSSProperties>,
    collapsible: {
      type: Boolean,
      default: false,
    },
    collapsed: {
      type: Boolean as PropType<LayoutSiderProps['collapsed']>,
      default: undefined,
    },
    defaultCollapsed: {
      type: Boolean,
      default: false,
    },
    reverseArrow: {
      type: Boolean,
      default: false,
    },
    trigger: {
      type: [Object, Array, String, Number, Function] as PropType<LayoutSiderProps['trigger']>,
      default: undefined,
    },
    width: {
      type: [Number, String] as PropType<LayoutSiderProps['width']>,
      default: 200,
    },
    collapsedWidth: {
      type: [Number, String] as PropType<LayoutSiderProps['collapsedWidth']>,
      default: 80,
    },
    zeroWidthTriggerStyle: {
      type: Object as PropType<CSSProperties>,
    },
    breakpoint: String as PropType<Breakpoint>,
    theme: {
      type: String as PropType<LayoutSiderTheme>,
      default: 'dark',
    },
  },
  emits: {
    collapse: (_collapsed: boolean, _type: CollapseType) => true,
    breakpoint: (_broken: boolean) => true,
    'update:collapsed': (_collapsed: boolean) => true,
  },
  setup(props, { slots, emit, attrs, expose }) {
    const configCtx = useConfigContext()
    const layoutCtx = useLayoutContext()

    const mergedCollapsed = ref<boolean>(props.collapsed ?? props.defaultCollapsed)
    const below = ref(false)
    const mql = shallowRef<MediaQueryList | null>(null)

    const uniqueId = generateId()

    watch(
      () => props.collapsed,
      (val) => {
        if (typeof val === 'boolean') {
          mergedCollapsed.value = val
        }
      },
    )

    function handleSetCollapsed(value: boolean, type: CollapseType) {
      if (props.collapsed === undefined) {
        mergedCollapsed.value = value
      }
      emit('update:collapsed', value)
      emit('collapse', value, type)
    }

    function toggle() {
      handleSetCollapsed(!mergedCollapsed.value, 'clickTrigger')
    }

    const prefixCls = computed(() => configCtx.getPrefixCls('layout-sider', props.prefixCls))
    const direction = computed(() => configCtx.direction)

    const rawWidth = computed(() => {
      const result = mergedCollapsed.value ? props.collapsedWidth : props.width
      return result
    })

    const siderWidth = computed(() => {
      const width = rawWidth.value ?? (mergedCollapsed.value ? 80 : 200)
      if (isNumeric(width)) {
        return `${Number.parseFloat(width as any)}px`
      }
      return String(width)
    })

    const zeroWidth = computed(() => Number.parseFloat(String(props.collapsedWidth ?? 0)) === 0)

    const responsiveHandler = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = 'matches' in e ? e.matches : (e as MediaQueryList).matches
      below.value = matches
      emit('breakpoint', matches)
      if (mergedCollapsed.value !== matches) {
        handleSetCollapsed(matches, 'responsive')
      }
    }

    watch(
      () => props.breakpoint,
      (bp, _prev, onCleanup) => {
        if (mql.value) {
          removeMediaQueryListener(mql.value, responsiveHandler)
          mql.value = null
        }
        if (typeof window === 'undefined' || !bp || !(bp in dimensionMaxMap)) {
          return
        }
        const query = `screen and (max-width: ${dimensionMaxMap[bp]})`
        const matchMedia = window.matchMedia ? window.matchMedia(query) : null
        if (!matchMedia) {
          return
        }
        responsiveHandler(matchMedia)
        addMediaQueryListener(matchMedia, responsiveHandler)
        mql.value = matchMedia
        onCleanup?.(() => {
          removeMediaQueryListener(matchMedia, responsiveHandler)
        })
      },
      { immediate: true },
    )

    layoutCtx?.siderHook?.addSider?.(uniqueId)

    onBeforeUnmount(() => {
      layoutCtx?.siderHook?.removeSider?.(uniqueId)
      if (mql.value) {
        removeMediaQueryListener(mql.value, responsiveHandler)
      }
    })

    const attrClass = computed(() => attrs.class)
    const attrStyle = computed(() => attrs.style as StyleValue | undefined)

    expose({
      get collapsed() {
        return mergedCollapsed.value
      },
    })

    useProviderLayoutSider({
      siderCollapsed: mergedCollapsed,
    })

    return () => {
      const baseCls = prefixCls.value
      const directionIsRtl = direction.value === 'rtl'
      const reverseIcon = directionIsRtl === !props.reverseArrow

      const defaultTrigger = mergedCollapsed.value
        ? (reverseIcon ? h(LeftOutlined) : h(RightOutlined))
        : (reverseIcon ? h(RightOutlined) : h(LeftOutlined))

      const triggerSlot = slots.trigger?.()
      const hasTriggerSlot = !!(triggerSlot && triggerSlot.length)

      const resolvedTrigger = () => {
        if (hasTriggerSlot) {
          return triggerSlot
        }
        const triggerProp = props.trigger
        if (triggerProp === null) {
          return null
        }
        if (typeof triggerProp === 'function') {
          return (triggerProp as any)()
        }
        if (triggerProp !== undefined) {
          return triggerProp
        }
        return defaultTrigger
      }

      const resolvedZeroWidthTrigger = () => {
        if (hasTriggerSlot) {
          return triggerSlot
        }
        const triggerProp = props.trigger
        if (triggerProp === null) {
          return null
        }
        if (typeof triggerProp === 'function') {
          return (triggerProp as any)()
        }
        if (triggerProp !== undefined) {
          return triggerProp
        }
        return h(BarsOutlined)
      }

      const zeroWidthTriggerNode = zeroWidth.value
        ? (() => {
            const content = resolvedZeroWidthTrigger()
            if (!content) {
              return null
            }
            return h(
              'span',
              {
                class: [
                  `${baseCls}-zero-width-trigger`,
                  `${baseCls}-zero-width-trigger-${props.reverseArrow ? 'right' : 'left'}`,
                ],
                style: props.zeroWidthTriggerStyle,
                onClick: toggle,
              },
              content,
            )
          })()
        : null

      let triggerDom = null

      if (props.trigger !== null) {
        const content = resolvedTrigger()
        if (zeroWidthTriggerNode) {
          triggerDom = zeroWidthTriggerNode
        } else if (props.collapsible) {
          triggerDom = h(
            'div',
            {
              class: `${baseCls}-trigger`,
              style: { width: siderWidth.value },
              onClick: toggle,
            },
            content,
          )
        }
      }

      const shouldRenderTrigger = (props.collapsible || (below.value && !!zeroWidthTriggerNode)) && triggerDom

      const styleList = [] as StyleValue[]
      if (attrStyle.value) {
        styleList.push(attrStyle.value)
      }
      if (props.style) {
        styleList.push(props.style)
      }
      const widthStyle: CSSProperties = {
        flex: `0 0 ${siderWidth.value}`,
        maxWidth: siderWidth.value,
        minWidth: siderWidth.value,
        width: siderWidth.value,
      }
      styleList.push(widthStyle)
      const mergedStyle = styleList.length === 1 ? styleList[0] : styleList

      const siderCls = classNames(
        baseCls,
        `${baseCls}-${props.theme}`,
        {
          [`${baseCls}-collapsed`]: !!mergedCollapsed.value,
          [`${baseCls}-has-trigger`]: props.collapsible && props.trigger !== null && !zeroWidthTriggerNode,
          [`${baseCls}-below`]: !!below.value,
          [`${baseCls}-zero-width`]: Number.parseFloat(siderWidth.value) === 0,
        },
        props.className,
        props.rootClassName,
        attrClass.value,
      )

      const restAttrs = Object.fromEntries(
        Object.entries(attrs).filter(([key]) => key !== 'class' && key !== 'style'),
      )

      const children = slots.default?.()

      return h(
        'aside',
        {
          ...restAttrs,
          class: siderCls,
          style: mergedStyle,
        },
        [
          h('div', { class: `${baseCls}-children` }, children),
          shouldRenderTrigger ? triggerDom : null,
        ],
      )
    }
  },
})
</script>
