import type { VNode, VNodeNormalizedChildren } from 'vue'
import type { VNodeChildAtom } from './checker'

export function renderVNode(vNode: VNode[] | VNode | VNodeChildAtom | VNodeNormalizedChildren | (VNodeChildAtom | VNodeNormalizedChildren)[]) {
  if (Array.isArray(vNode)) {
    return vNode[0]
  }

  return vNode
}
