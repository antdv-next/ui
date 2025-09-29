import type { VNode, VNodeNormalizedChildren, VNodeProps } from 'vue'
import type { VNodeChildAtom } from './checker'
import { warning } from '@v-c/util'
import { filterEmpty } from '@v-c/util/dist/props-util'
import { cloneVNode } from 'vue'

// eslint-disable-next-line ts/no-unsafe-function-type
export interface RefObject extends Function {
  current?: any
}

export function renderVNode(vNode: VNode[] | VNode | VNodeChildAtom | VNodeNormalizedChildren | (VNodeChildAtom | VNodeNormalizedChildren)[]) {
  if (Array.isArray(vNode)) {
    return vNode[0]
  }

  return vNode
}

type NodeProps = Record<string, any>
  & Omit<VNodeProps, 'ref'> & { ref?: VNodeProps['ref'] | RefObject }
export function cloneElement<T, U>(
  vnode: VNode<T, U> | VNode<T, U>[],
  nodeProps: NodeProps = {},
  override = true,
  mergeRef = false,
): VNode<T, U> | null {
  let ele = vnode
  if (Array.isArray(vnode)) {
    ele = filterEmpty(vnode)[0]
  }
  if (!ele) {
    return null
  }
  const node = cloneVNode(ele as VNode<T, U>, nodeProps as any, mergeRef)

  // cloneVNode内部是合并属性，这里改成覆盖属性
  node.props = (override ? { ...node.props, ...nodeProps } : node.props) as any
  warning(typeof node.props?.class !== 'object', 'class must be string')
  return node
}
