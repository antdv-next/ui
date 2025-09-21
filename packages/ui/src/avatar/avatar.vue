<script lang="ts" setup>
import type { Breakpoint } from '../_utils/responsiveObserve'
import type { AvatarProps } from './define'
import { computed, h, nextTick, onMounted, ref, shallowRef, toRefs, useAttrs, useSlots, watch } from 'vue'
import eagerComputed from '../_utils/eagerComputed'
import useBreakpoints from '../_utils/hooks/useBreakpoint'
import { responsiveArray } from '../_utils/responsiveObserve'
import { useConfigContext } from '../config-provider/context'
import { useAvatarInjectContext } from './define'

defineOptions({
  name: 'AAvatar',
  inheritAttrs: false,
})

const props = defineProps<AvatarProps>()

const { size: _size, shape, src, alt, srcset, draggable, crossOrigin } = toRefs(props)

const isImgExist = ref(true)
const isMounted = ref(false)
const scale = shallowRef(1)

const avatarChildrenRef = shallowRef<HTMLElement | null>(null)
const avatarNodeRef = shallowRef<HTMLElement | null>(null)

const ctx = useConfigContext()
const prefixCls = computed(() => ctx.getPrefixCls('avatar', props.prefixCls))

const avatarCtx = useAvatarInjectContext()

const mergeShape = computed(() => avatarCtx.shape ?? shape)

const size = computed(() => {
  return _size.value === 'default' ? avatarCtx.size : _size.value
})

const slots = useSlots()
const attrs = useAttrs()
const icon = computed(() => props.icon ?? slots.icon?.())
const classString = computed(() => {
  return {
    [`${attrs.class}`]: !!attrs.class,
    [prefixCls.value]: true,
    [`${prefixCls.value}-lg`]: size.value === 'large',
    [`${prefixCls.value}-sm`]: size.value === 'small',
    [`${prefixCls.value}-${mergeShape.value}`]: true,
    [`${prefixCls.value}-image`]: src.value && isImgExist.value,
    [`${prefixCls.value}-icon`]: !!icon.value,
  }
})

const sizeStyle = computed(() => {
  return typeof size.value === 'number'
    ? {
        width: `${size.value}px`,
        height: `${size.value}px`,
        lineHeight: `${size.value}px`,
        fontSize: icon.value ? `${size.value / 2}px` : '18px',
      }
    : {}
})

const childrenNode = computed(() => slots.default?.())

const childrenRedner = computed(() => {
  if (src.value && isImgExist.value) {
    return h('img', {
      draggable: draggable.value,
      src: src.value,
      srcset: srcset.value,
      onError: handleImgLoadError,
      alt: alt.value,
      crossorigin: crossOrigin.value,
    })
  }

  if (icon.value) {
    return icon.value
  }

  if (isMounted.value || scale.value !== 1) {
    // TODO: resize observer component
    return null
    // return h(Resiz)
  }

  return h('span', {
    ref: avatarChildrenRef,
    class: `${prefixCls.value}-string`,
    style: 'opcity:0',
  }, [childrenNode.value])
})

const screens = useBreakpoints()
const responsiveSize = eagerComputed(() => {
  if (typeof props.size !== 'object') {
    return undefined
  }
  const currentBreakpoint: Breakpoint = responsiveArray.find(screen => screens.value[screen])!
  const currentSize = props.size[currentBreakpoint]

  return currentSize
})

const responsiveSizeStyle = computed(() => {
  const hasIcon = !!icon.value

  if (responsiveSize.value) {
    return {
      width: `${responsiveSize.value}px`,
      height: `${responsiveSize.value}px`,
      lineHeight: `${responsiveSize.value}px`,
      fontSize: `${hasIcon ? responsiveSize.value / 2 : 18}px`,
    }
  }
  return {}
})

function setScaleParam() {
  if (!avatarChildrenRef.value || !avatarNodeRef.value) {
    return
  }
  const childrenWidth = avatarChildrenRef.value.offsetWidth // offsetWidth avoid affecting be transform scale
  const nodeWidth = avatarNodeRef.value.offsetWidth
  // denominator is 0 is no meaning
  if (childrenWidth !== 0 && nodeWidth !== 0) {
    const { gap = 4 } = props
    if (gap * 2 < nodeWidth) {
      scale.value
        = nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1
    }
  }
}

function handleImgLoadError() {
  const { loadError } = props
  const errorFlag = loadError?.()
  if (errorFlag !== false) {
    isImgExist.value = false
  }
}

watch(
  () => props.src,
  () => {
    nextTick(() => {
      isImgExist.value = true
      scale.value = 1
    })
  },
)

watch(
  () => props.gap,
  () => {
    nextTick(() => {
      setScaleParam()
    })
  },
)

onMounted(() => {
  nextTick(() => {
    setScaleParam()
    isMounted.value = true
  })
})
</script>

<template>
  <span
    v-bind="$attrs" ref="avatarNodeRef" :class="classString"
    :style="{ ...sizeStyle, ...responsiveSizeStyle, ...($attrs.style || {}) }"
  >
    <component :is="childrenRedner" />
  </span>
</template>
