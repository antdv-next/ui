import type { VueNode } from '@v-c/util/dist/type'
import { Fragment, h, isVNode } from 'vue'
import { PresetColors } from '../theme/interface/presetColors'

const rxTwoCNChar = /^[\u4E00-\u9FA5]{2}$/
export const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)

export function isString(str: unknown): str is string {
  return typeof str === 'string'
}

export function isUnBorderedButtonVariant(type?: ButtonVariantType) {
  return type === 'text' || type === 'link'
}

const _ButtonTypes = ['default', 'primary', 'dashed', 'link', 'text'] as const
export type ButtonType = (typeof _ButtonTypes)[number]

const _ButtonShapes = ['default', 'circle', 'round'] as const
export type ButtonShape = (typeof _ButtonShapes)[number]

const _ButtonHTMLTypes = ['submit', 'button', 'reset'] as const
export type ButtonHTMLType = (typeof _ButtonHTMLTypes)[number]

export const _ButtonVariantTypes = [
  'outlined',
  'dashed',
  'solid',
  'filled',
  'text',
  'link',
] as const
export type ButtonVariantType = (typeof _ButtonVariantTypes)[number]

export const _ButtonColorTypes = [
  'default',
  'primary',
  'danger',
  ...PresetColors,
] as const

export type ButtonColorType = (typeof _ButtonColorTypes)[number]

// 检查是否为Fragment的简单实现
function isFragment(vnode: any): boolean {
  return vnode && vnode.type && vnode.type === 'Fragment'
}

export function splitCNCharsBySpace(child: VueNode, needInserted: boolean): VueNode {
  if (child === null || child === undefined) {
    return child
  }

  const SPACE = needInserted ? ' ' : ''

  if (
    typeof child !== 'string'
    && typeof child !== 'number'
    && isVNode(child)
    && isString(child.type)
    && typeof child.children === 'string'
    && isTwoCNChar(child.children)
  ) {
    // 对于有两个中文字符的VNode，克隆并修改其子内容
    return h(child.type as string, child.props, child.children.split('').join(SPACE))
  }

  if (isString(child)) {
    return isTwoCNChar(child) ? h('span', child.split('').join(SPACE)) : h('span', child)
  }

  if (isVNode(child) && isFragment(child)) {
    return h('span', child)
  }

  return child
}

export function spaceChildren(children: VueNode[], needInserted: boolean): VueNode {
  let isPrevChildPure = false
  const childList: VueNode[] = []

  children.forEach((child) => {
    const type = typeof child
    const isCurrentChildPure = type === 'string' || type === 'number'
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1
      const lastChild = childList[lastIndex]
      childList[lastIndex] = `${lastChild}${child}`
    } else {
      childList.push(child)
    }
    isPrevChildPure = isCurrentChildPure
  })

  return h(
    Fragment as any,
    childList.map(child => splitCNCharsBySpace(child, needInserted)) as any,
  )
}
