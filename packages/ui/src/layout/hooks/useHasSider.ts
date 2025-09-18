import type { Ref, Slots, VNode } from 'vue'
import { computed, isVNode } from 'vue'

function isSiderNode(node: VNode): boolean {
  if (!isVNode(node)) {
    return false
  }
  const { type, children } = node as VNode & { type: any }
  if (type && (typeof type === 'object' || typeof type === 'function')) {
    const component = type.__vccOpts ?? type
    const compName = component?.name ?? type?.displayName
    const isSider = compName === 'ALayoutSider'
      || component?.__ANT_LAYOUT_SIDER
      || type?.__ANT_LAYOUT_SIDER

    if (isSider) {
      return true
    }
  }
  if (Array.isArray(children)) {
    return children.some(child => isVNode(child) && isSiderNode(child as VNode))
  }
  return false
}

export function useHasSider(
  siders: Ref<string[]>,
  slots: Slots,
  hasSider: Ref<boolean | undefined>,
) {
  return computed(() => {
    if (typeof hasSider.value === 'boolean') {
      return hasSider.value
    }

    if (siders.value.length) {
      return true
    }

    const children = slots.default?.() || []
    return children.some(node => isSiderNode(node as VNode))
  })
}
