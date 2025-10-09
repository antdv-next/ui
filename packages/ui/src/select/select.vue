<script setup lang="ts" generic="ValueType = any, OptionType extends BaseOptionType = DefaultOptionType">
import type { CSSProperties, VNode } from 'vue'
import type { TooltipRef } from '../tooltip'
import type { BaseOptionType, DefaultOptionType, SelectEmits, SelectProps, SelectRef } from './define'
import { computed, h, ref, shallowRef, watch } from 'vue'
import { classNames } from '../_utils/classNames'
import { useConfigContext } from '../config-provider/context'
import { Tooltip } from '../tooltip'
import { useIcons } from './use-icons'
import { useShowArrow } from './use-show-arrow'

defineOptions({
  name: 'ASelect',
})

const props = withDefaults(defineProps<SelectProps<ValueType, OptionType>>(), {
  listHeight: 256,
  listItemHeight: 24,
  showSearch: undefined,
  autoClearSearchValue: true,
  filterOption: true,
  virtual: true,
  defaultActiveFirstOption: true,
  notFoundContent: undefined,
  placement: 'bottomLeft',
  variant: 'outlined',
  mode: undefined,
  disabled: false,
  loading: false,
  allowClear: false,
  maxTagCount: undefined,
  popupMatchSelectWidth: true,
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<SelectEmits<ValueType, OptionType>>()

// const slots = useSlots()

const configCtx = useConfigContext()
const prefixCls = computed(() => configCtx.getPrefixCls('select', props.prefixCls))
const direction = computed(() => configCtx.direction)

const tooltipRef = shallowRef<TooltipRef>()

// Internal state
const internalValue = ref<ValueType | undefined>(props.defaultValue)
const internalOpen = ref(props.defaultOpen)
const internalSearchValue = ref('')

// Compute mode
const isMultiple = computed(() => props.mode === 'multiple' || props.mode === 'tags')

// Show search logic
const mergedShowSearch = computed(() => {
  if (props.showSearch !== undefined) {
    return props.showSearch
  }
  return isMultiple.value || props.mode === 'tags'
})

// Compute final value
const mergedValue = computed(() => {
  return props.value !== undefined ? props.value : internalValue.value
})

// Compute final open state
const mergedOpen = computed(() => {
  return props.open !== undefined ? props.open : internalOpen.value
})

// Compute final search value
const mergedSearchValue = computed(() => {
  return props.searchValue !== undefined ? props.searchValue : internalSearchValue.value
})

// Icons
const showArrow = useShowArrow(props.suffixIcon, undefined)
const icons = computed(() => {
  return useIcons({
    suffixIcon: props.suffixIcon,
    clearIcon: props.clearIcon,
    menuItemSelectedIcon: props.menuItemSelectedIcon,
    removeIcon: props.removeIcon,
    loading: props.loading,
    multiple: isMultiple.value,
    hasFeedback: false, // TODO: integrate with form context
    prefixCls: prefixCls.value,
    showSuffixIcon: showArrow,
    feedbackIcon: undefined,
    showArrow,
  })
})

// Compute size class
const sizeClass = computed(() => {
  const size = props.size
  if (size === 'large') {
    return `${prefixCls.value}-lg`
  }
  if (size === 'small') {
    return `${prefixCls.value}-sm`
  }
  return undefined
})

// Compute variant class
const variantClass = computed(() => {
  return `${prefixCls.value}-${props.variant}`
})

// Compute status class
const statusClass = computed(() => {
  if (props.status === 'error') {
    return `${prefixCls.value}-status-error`
  }
  if (props.status === 'warning') {
    return `${prefixCls.value}-status-warning`
  }
  return undefined
})

// Compute final className
const mergedClassName = computed(() => {
  return classNames(
    prefixCls.value,
    {
      [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
      [`${prefixCls.value}-multiple`]: isMultiple.value,
      [`${prefixCls.value}-single`]: !isMultiple.value,
      [`${prefixCls.value}-show-search`]: mergedShowSearch.value,
      [`${prefixCls.value}-disabled`]: props.disabled,
      [`${prefixCls.value}-loading`]: props.loading,
      [`${prefixCls.value}-open`]: mergedOpen.value,
      [`${prefixCls.value}-show-arrow`]: showArrow,
    },
    sizeClass.value,
    variantClass.value,
    statusClass.value,
    props.rootClassName,
    props.classNames?.root,
  )
})

// Compute popup className
const popupClassName = computed(() => {
  return classNames(
    `${prefixCls.value}-dropdown`,
    {
      [`${prefixCls.value}-dropdown-rtl`]: direction.value === 'rtl',
    },
    props.popupClassName,
    props.popupRootClassName,
    props.classNames?.popup?.root,
  )
})

// Compute popup style
const popupStyle = computed<CSSProperties | undefined>(() => {
  return {
    ...props.popupStyle,
    ...props.styles?.popup?.root,
  }
})

// Compute root style
const rootStyle = computed<CSSProperties | undefined>(() => {
  return {
    ...props.styles?.root,
  }
})

// Compute placement
const mergedPlacement = computed(() => {
  if (props.placement) {
    return props.placement
  }
  return direction.value === 'rtl' ? 'bottomRight' : 'bottomLeft'
})

// Compute transition name based on placement
const transitionName = computed(() => {
  const rootPrefixCls = configCtx.getPrefixCls()
  if (mergedPlacement.value && mergedPlacement.value.includes('top')) {
    return `${rootPrefixCls}-slide-down`
  }
  return `${rootPrefixCls}-slide-up`
})

// Compute popupMatchSelectWidth value
const mergedPopupMatchSelectWidth = computed(() => {
  return props.popupMatchSelectWidth
})

// Handle value change
function handleChange(value: ValueType, option: OptionType | OptionType[]) {
  if (props.value === undefined) {
    internalValue.value = value
  }
  emit('update:value', value)
  emit('change', value, option)
}

// Handle select
function handleSelect(value: any, option: OptionType) {
  emit('select', value, option)
}

// Handle deselect
function handleDeselect(value: any, option: OptionType) {
  emit('deselect', value, option)
}

// Handle search
function handleSearch(value: string) {
  if (props.searchValue === undefined) {
    internalSearchValue.value = value
  }
  emit('update:searchValue', value)
  emit('search', value)
}

// Handle open change
function handleOpenChange(open: boolean) {
  if (props.open === undefined) {
    internalOpen.value = open
  }
  emit('update:open', open)
  emit('openChange', open)
}

// Handle clear
// function handleClear() {
//   emit('clear')
// }

// Handle blur
function handleBlur(event: FocusEvent) {
  emit('blur', event)
}

// Handle focus
function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

// Handle input key down
function handleInputKeyDown(event: KeyboardEvent) {
  emit('inputKeyDown', event)
}

// Handle popup scroll
// function handlePopupScroll(event: UIEvent) {
//   emit('popupScroll', event)
// }

// Watch value changes
watch(() => props.value, (newValue) => {
  if (newValue !== undefined) {
    internalValue.value = newValue
  }
}, { immediate: true })

// Watch open changes
watch(() => props.open, (newOpen) => {
  if (newOpen !== undefined) {
    internalOpen.value = newOpen
  }
}, { immediate: true })

// Watch searchValue changes
watch(() => props.searchValue, (newSearchValue) => {
  if (newSearchValue !== undefined) {
    internalSearchValue.value = newSearchValue
  }
}, { immediate: true })

// Expose methods
const selectRef = ref<HTMLDivElement>()

defineExpose<SelectRef>({
  focus() {
    selectRef.value?.focus()
  },
  blur() {
    selectRef.value?.blur()
  },
  scrollTo(arg: number | { index?: number, key?: string | number, align?: 'top' | 'bottom' | 'auto' }) {
    // TODO: implement scrollTo
    console.warn('scrollTo is not implemented yet', arg)
  },
})

// Render select content
function renderSelectContent(): VNode {
  // For now, we'll use a simple input-like structure
  // In a full implementation, this would integrate with rc-select or a custom select implementation

  const displayValue = computed(() => {
    if (mergedValue.value === undefined || mergedValue.value === null) {
      return ''
    }

    if (Array.isArray(mergedValue.value)) {
      return mergedValue.value.join(', ')
    }

    if (typeof mergedValue.value === 'object' && 'label' in mergedValue.value) {
      return mergedValue.value.label
    }

    return String(mergedValue.value)
  })

  const children = [
    // Prefix
    props.prefix && h('span', { class: `${prefixCls.value}-prefix` }, [props.prefix]),

    // Selection area
    h('div', { class: `${prefixCls.value}-selector` }, [
      // Search input or selection display
      mergedShowSearch.value
        ? h('input', {
            class: `${prefixCls.value}-selection-search-input`,
            value: mergedSearchValue.value,
            disabled: props.disabled,
            placeholder: !displayValue.value ? props.placeholder : undefined,
            onInput: (e: Event) => handleSearch((e.target as HTMLInputElement).value),
            onKeydown: handleInputKeyDown,
            onFocus: handleFocus,
            onBlur: handleBlur,
          })
        : h('span', { class: `${prefixCls.value}-selection-item` }, [
            displayValue.value || h('span', { class: `${prefixCls.value}-selection-placeholder` }, [props.placeholder]),
          ]),
    ]),

    // Suffix icons
    h('span', { class: `${prefixCls.value}-arrow` }, [
      typeof icons.value.suffixIcon === 'function'
        ? icons.value.suffixIcon({ open: mergedOpen.value, showSearch: mergedShowSearch.value })
        : icons.value.suffixIcon,
    ]),
  ]

  return h(
    'div',
    {
      ref: selectRef,
      class: mergedClassName.value,
      style: rootStyle.value,
      tabindex: props.disabled ? undefined : (props.tabIndex ?? 0),
      onClick: () => {
        if (!props.disabled) {
          handleOpenChange(!mergedOpen.value)
        }
      },
    },
    children,
  )
}

// Render dropdown options
function renderDropdown(): VNode | null {
  const { options, notFoundContent } = props

  if (!options || options.length === 0) {
    return h('div', { class: `${prefixCls.value}-item-empty` }, [
      notFoundContent ?? 'No Data',
    ])
  }

  const filteredOptions = computed(() => {
    if (!mergedSearchValue.value || !props.filterOption) {
      return options
    }

    if (typeof props.filterOption === 'function') {
      return options.filter(option => props.filterOption!(mergedSearchValue.value, option))
    }

    // Default filter by label
    const searchLower = mergedSearchValue.value.toLowerCase()
    return options.filter((option) => {
      const label = option.label || option.value
      return String(label).toLowerCase().includes(searchLower)
    })
  })

  const optionNodes = filteredOptions.value.map((option, index) => {
    const isSelected = computed(() => {
      if (isMultiple.value) {
        return Array.isArray(mergedValue.value) && mergedValue.value.includes(option.value)
      }
      return mergedValue.value === option.value
    })

    const optionContent = props.optionRender
      ? props.optionRender(option, { index })
      : (option.label ?? option.value)

    return h(
      'div',
      {
        key: option.value ?? index,
        class: classNames(`${prefixCls.value}-item`, `${prefixCls.value}-item-option`, {
          [`${prefixCls.value}-item-option-selected`]: isSelected.value,
          [`${prefixCls.value}-item-option-disabled`]: option.disabled,
        }),
        onClick: () => {
          if (option.disabled) {
            return
          }

          if (isMultiple.value) {
            let newValue: any[]
            if (Array.isArray(mergedValue.value)) {
              if (isSelected.value) {
                newValue = mergedValue.value.filter(v => v !== option.value)
                handleDeselect(option.value, option as OptionType)
              }
              else {
                newValue = [...mergedValue.value, option.value]
                handleSelect(option.value, option as OptionType)
              }
            }
            else {
              newValue = [option.value]
              handleSelect(option.value, option as OptionType)
            }
            handleChange(newValue as ValueType, options.filter(o => newValue.includes(o.value)) as OptionType[])
          }
          else {
            handleChange(option.value as ValueType, option as OptionType)
            handleSelect(option.value, option as OptionType)
            handleOpenChange(false)
          }
        },
      },
      [
        h('div', { class: `${prefixCls.value}-item-option-content` }, [optionContent]),
        isSelected.value && icons.value.itemIcon
          ? h('span', { class: `${prefixCls.value}-item-option-state` }, [icons.value.itemIcon])
          : null,
      ],
    )
  })

  const menuContent = h('div', { class: `${prefixCls.value}-dropdown-menu` }, optionNodes)

  // Apply popupRender if provided
  if (props.popupRender) {
    return props.popupRender(menuContent)
  }

  return menuContent
}
</script>

<template>
  <Tooltip
    ref="tooltipRef"
    :prefix-cls="prefixCls"
    :overlay-class-name="popupClassName"
    :overlay-style="popupStyle"
    :trigger="disabled ? [] : ['click']"
    :placement="mergedPlacement"
    :open="mergedOpen"
    :arrow="false"
    :destroy-on-hidden="false"
    :get-popup-container="getPopupContainer"
    :has-inner="false"
    :match-reference-width="mergedPopupMatchSelectWidth"
    :transition-name="transitionName"
    @open-change="handleOpenChange"
  >
    <template #overlay>
      <component :is="renderDropdown()" />
    </template>
    <component :is="renderSelectContent()" />
  </Tooltip>
</template>
