<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { ScrollNumberProps } from './define'

import { omit } from 'es-toolkit'

import { computed, h, toRef, useAttrs, useSlots } from 'vue'
import { filterEmpty } from '../_utils/checker'
import { cloneElement } from '../_utils/node'
import { useConfigContext } from '../config-provider/context'
import SingleNumber from './single-number.vue'

const props = defineProps<ScrollNumberProps>()

const Tag = toRef(props, 'component')
const ctx = useConfigContext()
const prefixCls = computed(() => ctx.getPrefixCls('space', props.prefixCls))

const attrs = useAttrs()

const newProps = computed(() => {
  const restProps = omit({ ...props, ...attrs }, ['prefixCls', 'count', 'title', 'show', 'component', 'class', 'style'])

  const styles = {
    ...restProps,
    style: props.style,
    'data-show': props.show,
    class: [prefixCls.value, props.class],
    title: props.title,
  }

  if (typeof props.style === 'object' && props.style.borderColor) {
    styles.style = {
      ...(props.style as CSSProperties),
      boxShadow: `0 0 0 1px ${props.style.borderColor} inset`,
    }
  }

  return styles
})

const numberNodes = computed(() => {
  const count = props.count
  if (count && Number(count) % 1 === 0) {
    const numberList = String(count).split('')

    return numberList.map((num, i) => {
      return h(SingleNumber, {
        prefixCls: prefixCls.value,
        count: Number(count),
        value: num,
        key: numberList.length - i,
      })
    })
  }

  return count
})

const slots = useSlots()
const childrenNodes = computed(() => {
  const children = filterEmpty(slots.default?.() ?? [])
  if (Array.isArray(children) && children.length) {
    return cloneElement(children, {
      class: [`${prefixCls.value}-custom-component`],
    }, false)
  }
  return null
})
</script>

<template>
  <RenderComponent v-if="!!childrenNodes" :render="childrenNodes" />

  <component :is="Tag" v-else v-bind="newProps">
    <RenderComponent :render="numberNodes" />
  </component>
</template>
