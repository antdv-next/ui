import type { VNode, VNodeNormalizedChildren } from 'vue'
import { Comment, Fragment, isVNode, Text } from 'vue'

export const skipFlattenKey = Symbol('skipFlatten')

export function isValid(value: unknown): boolean {
  return value !== undefined && value !== null && value !== ''
}

export function isEmptyElement(c: VNode) {
  return (
    c
    && (c.type === Comment
      || (c.type === Fragment && c.children?.length === 0)
      || (c.type === Text && typeof c.children === 'string' && c.children.trim() === ''))
  )
}

export type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void

export function flattenChildren(children: VNodeChildAtom | VNodeNormalizedChildren, filterEmpty = true) {
  const temp = Array.isArray(children) ? children : [children]
  const res: (VNodeChildAtom | VNodeNormalizedChildren)[] = []
  temp.forEach((child: VNodeChildAtom | VNodeNormalizedChildren) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty))
    } else if (child && typeof child === 'object' && 'type' in child && child.type === Fragment) {
      if (child.key === skipFlattenKey) {
        res.push(child)
      } else {
        res.push(...flattenChildren(child.children as VNodeNormalizedChildren, filterEmpty))
      }
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child)
      } else if (!filterEmpty) {
        res.push(child)
      }
    } else if (isValid(child)) {
      res.push(child)
    }
  })
  return res
}
