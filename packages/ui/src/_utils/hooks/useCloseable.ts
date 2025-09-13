import type { VueNode } from '@v-c/util/dist/type'

// 先用any代替
export type ClosableType = boolean | ({
  closeIcon?: any
  disabled?: boolean
} & Record<string, any>)

export interface BaseContextClosable { closable?: ClosableType, closeIcon?: VueNode | (() => VueNode) }
export type ContextClosable<T extends BaseContextClosable = any> = Partial<
  Pick<T, 'closable' | 'closeIcon'>
>
