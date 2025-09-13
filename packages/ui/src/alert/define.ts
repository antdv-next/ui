import type { VueNode } from '@v-c/util/dist/type'
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled } from '@ant-design/icons-vue'

type AlertType = 'success' | 'info' | 'warning' | 'error'
export interface AlertProps {
  /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
  type?: AlertType
  /** Whether Alert can be closed */
  closable?: boolean | ({
    closeIcon?: any
    disabled?: boolean
  } & Record<string, any>)
  /**
   * @deprecated please use `closable.closeIcon` instead.
   * Close text to show
   */
  closeText?: VueNode | (() => VueNode)
  /** Content of Alert */
  message?: VueNode | (() => VueNode)
  /** Additional content of Alert */
  description?: VueNode | (() => VueNode)
  /** Callback when close Alert */
  // onClose?: React.MouseEventHandler<HTMLButtonElement>
  /** Trigger when animation ending of Alert */
  afterClose?: () => void
  /** Whether to show icon */
  showIcon?: boolean
  /** https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute */
  role?: string
  prefixCls?: string
  rootClassName?: string
  banner?: boolean
  icon?: VueNode | (() => VueNode)
  closeIcon?: VueNode | (() => VueNode)
  action?: VueNode | (() => VueNode)

  id?: string
}

export interface AlertEmits {
  mouseenter: [MouseEvent]
  mouseleave: [MouseEvent]
  click: [MouseEvent]
  close: [MouseEvent]
}

export interface AlertExpose {
  nativeElement: HTMLDivElement
}

export const iconMapFilled = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
}

export interface IconNodeProps {
  type: AlertType
  icon: VueNode | (() => VueNode)
  prefixCls: string
  description: VueNode | (() => VueNode)
}

export interface AlertSlots {
  default?: () => any
  icon?: () => any
  closeIcon?: () => any
  action?: () => any
  closeText?: () => any
  message?: () => any
  description?: () => any
}
