import type { VNode } from 'vue'

/**
 * Since Select, TreeSelect, Cascader is same Select like component.
 * We just use same hook to handle this logic.
 *
 * If `suffixIcon` is not equal to `null`, always show it.
 */
export function useShowArrow(suffixIcon?: VNode, showArrow?: boolean): boolean {
  return showArrow !== undefined ? showArrow : suffixIcon !== null
}
