<script lang="ts" setup>
import type { AvatarProps } from './define'
import { computed, ref, shallowRef } from 'vue'
import { useConfigContext } from '../config-provider/context'

defineOptions({
  name: 'AAvatar',
  inheritAttrs: false,
})

const props = defineProps<AvatarProps>()

const isImgExist = ref(true)
const isMounted = ref(false)
const scale = shallowRef(1)

const avatarChildrenRef = shallowRef<HTMLElement | null>(null)
const avatarNodeRef = shallowRef<HTMLElement | null>(null)

const ctx = useConfigContext()
const prefixCls = computed(() => ctx.getPrefixCls('avatar', props.prefixCls))
</script>

<template>
  <div />
</template>
