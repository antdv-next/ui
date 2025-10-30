<script setup lang="ts">
import type { SwitchProps } from './define'
import LoadingOutlined from '@ant-design/icons-vue/LoadingOutlined'
import { omit } from 'es-toolkit/compat'
import { computed, nextTick, onBeforeMount, onMounted, ref, useAttrs, useSlots, watch } from 'vue'
import KeyCode from '../_utils/keycode'
import { getPropsSlot } from '../_utils/node'
import RenderComponent from '../_utils/renderComponent.vue'
import warning from '../_utils/warning'
import { useConfigContext } from '../config-provider/context'
import { useDisabled } from '../config-provider/disabled-context'

defineOptions({
  name: 'ASwitch',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SwitchProps>(), {
  checkedValue: true,
  uncheckedValue: false,
})

const emit = defineEmits([
  'blur',
  'click',
  'update:checked',
  'change',
  'keydown',
  'mouseup',
])

type CheckedType = boolean | string | number
const refSwitchNode = ref()

// TODO: useInjectFormItemContext
const formItemContext = {
  id: computed(() => undefined),
  onFieldChange: () => {},
}
const disabledCtx = useDisabled()
const mergedDisabled = computed(
  () => props.disabled ?? disabledCtx.disabled?.value,
)

const attrs = useAttrs()

onBeforeMount(() => {
  warning(
    !('defaultChecked' in attrs),
    'Switch',
    `'defaultChecked' is deprecated, please use 'v-model:checked'`,
  )
  warning(
    !('value' in attrs),
    'Switch',
    '`value` is not validate prop, do you mean `checked`?',
  )
})

const checked = ref<string | number | boolean | undefined>(
  props.checked !== undefined
    ? props.checked
    : (attrs.defaultChecked as boolean),
)

const checkedStatus = computed(() => checked.value === props.checkedValue)

watch(
  () => props.checked,
  () => {
    checked.value = props.checked
  },
)
const ctx = useConfigContext()
const prefixCls = computed(() => ctx.getPrefixCls('switch', props.prefixCls))
const direction = computed(() => ctx.direction)
const size = computed(() => props.size || ctx.size)
const restProps = computed(() =>
  omit(props, [
    'prefixCls',
    'checkedChildren',
    'unCheckedChildren',
    'checked',
    'autofocus',
    'checkedValue',
    'unCheckedValue',
    'id',
    'onChange',
    'onUpdate:checked',
  ]),
)

function focus() {
  refSwitchNode.value?.focus()
}
function blur() {
  refSwitchNode.value?.blur()
}

defineExpose({ focus, blur })

onMounted(() => {
  nextTick(() => {
    if (props.autofocus && !mergedDisabled.value) {
      refSwitchNode.value.focus()
    }
  })
})

function setChecked(check: CheckedType | undefined, e: MouseEvent | KeyboardEvent) {
  if (mergedDisabled.value) {
    return
  }
  emit('update:checked', check)
  emit('change', check, e)
  formItemContext.onFieldChange()
}

function handleBlur(e: FocusEvent) {
  emit('blur', e)
}

function handleClick(e: MouseEvent) {
  focus()
  const newChecked = checkedStatus.value
    ? props.unCheckedValue
    : props.checkedValue
  setChecked(newChecked, e)
  emit('click', newChecked, e)
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.keyCode === KeyCode.LEFT) {
    setChecked(props.unCheckedValue, e)
  } else if (e.keyCode === KeyCode.RIGHT) {
    setChecked(props.checkedValue, e)
  }
  emit('keydown', e)
}

function handleMouseUp(e: MouseEvent) {
  refSwitchNode.value?.blur()
  emit('mouseup', e)
}

const classNames = computed(() => ({
  [`${prefixCls.value}-small`]: size.value === 'small',
  [`${prefixCls.value}-loading`]: props.loading,
  [`${prefixCls.value}-checked`]: checkedStatus.value,
  [`${prefixCls.value}-disabled`]: mergedDisabled.value,
  [prefixCls.value]: true,
  [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
}))

const slots = useSlots()
const checkedChildren = computed(() => getPropsSlot(slots, props, 'checkedChildren'))
const unCheckedChildren = computed(() => getPropsSlot(slots, props, 'unCheckedChildren'))
</script>

<template>
  <button
    v-bind="{ ...restProps, ...attrs }"
    :id="id ?? formItemContext.id.value"
    ref="refSwitchNode"
    type="button"
    role="switch"
    :aria-checked="Boolean(checked)"
    :disabled="mergedDisabled || loading"
    :class="[attrs.class, classNames]"
    @keydown="handleKeyDown"
    @click="handleClick"
    @blur="handleBlur"
    @mouseup="handleMouseUp"
  >
    <div :class="`${prefixCls}-handle`">
      <LoadingOutlined v-if="loading" :class="`${prefixCls}-loading-icon`" />
    </div>
    <span :class="`${prefixCls}-inner`">
      <span :class="`${prefixCls}-inner-checked`">
        <RenderComponent :render="checkedChildren" />
      </span>
      <span :class="`${prefixCls}-inner-unchecked`">
        <RenderComponent :render="unCheckedChildren" />
      </span>
    </span>
  </button>
</template>
