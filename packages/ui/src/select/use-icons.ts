import type { VNode } from 'vue'
import CheckOutlined from '@ant-design/icons-vue/CheckOutlined'
import CloseCircleFilled from '@ant-design/icons-vue/CloseCircleFilled'
import CloseOutlined from '@ant-design/icons-vue/CloseOutlined'
import DownOutlined from '@ant-design/icons-vue/DownOutlined'
import LoadingOutlined from '@ant-design/icons-vue/LoadingOutlined'
import SearchOutlined from '@ant-design/icons-vue/SearchOutlined'
import { h } from 'vue'

export interface UseIconsOptions {
  suffixIcon?: VNode
  clearIcon?: VNode
  menuItemSelectedIcon?: VNode
  removeIcon?: VNode
  loading?: boolean
  multiple?: boolean
  hasFeedback?: boolean
  prefixCls: string
  showSuffixIcon?: boolean
  feedbackIcon?: VNode
  showArrow?: boolean
}

export interface UseIconsResult {
  clearIcon: VNode
  suffixIcon: VNode | ((props: { open: boolean, showSearch: boolean }) => VNode)
  itemIcon: VNode | null
  removeIcon: VNode
}

export function useIcons(options: UseIconsOptions): UseIconsResult {
  const {
    suffixIcon,
    clearIcon,
    menuItemSelectedIcon,
    removeIcon,
    loading,
    multiple,
    hasFeedback,
    prefixCls,
    showSuffixIcon,
    feedbackIcon,
    showArrow,
  } = options

  // Clear Icon
  const mergedClearIcon = clearIcon ?? h(CloseCircleFilled)

  // Validation Feedback Icon
  const getSuffixIconNode = (arrowIcon?: VNode) => {
    if (suffixIcon === null && !hasFeedback && !showArrow) {
      return null
    }
    return h('span', { class: `${prefixCls}-suffix-wrapper` }, [
      showSuffixIcon !== false ? arrowIcon : null,
      hasFeedback ? feedbackIcon : null,
    ])
  }

  // Arrow item icon
  let mergedSuffixIcon: VNode | ((props: { open: boolean, showSearch: boolean }) => VNode) | null = null
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = getSuffixIconNode(suffixIcon)
  }
  else if (loading) {
    mergedSuffixIcon = getSuffixIconNode(h(LoadingOutlined, { spin: true }))
  }
  else {
    const iconCls = `${prefixCls}-suffix`
    mergedSuffixIcon = ({ open, showSearch }: { open: boolean, showSearch: boolean }) => {
      if (open && showSearch) {
        return getSuffixIconNode(h(SearchOutlined, { class: iconCls }))
      }
      return getSuffixIconNode(h(DownOutlined, { class: iconCls }))
    }
  }

  // Checked item icon
  let mergedItemIcon: VNode | null = null
  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon
  }
  else if (multiple) {
    mergedItemIcon = h(CheckOutlined)
  }
  else {
    mergedItemIcon = null
  }

  // Remove icon
  let mergedRemoveIcon: VNode = h(CloseOutlined)
  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon
  }

  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon!,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon,
  }
}
