import type { PopconfirmLocale } from '../popconfirm/define'
import type { PaginationLocale } from './pagination/interface'
import { computed } from 'vue'
import { useConfigContext } from '../config-provider/context'

export interface Locale {
  locale: string
  Pagination?: PaginationLocale
  // DatePicker?: DatePickerLocale
  DatePicker?: Record<string, any>
  TimePicker?: Record<string, any>
  Calendar?: Record<string, any>
  // Table?: TableLocale
  Table?: Record<string, any>
  // Modal?: ModalLocale
  Modal?: Record<string, any>
  // Tour?: TourLocale
  Tour?: Record<string, any>
  Popconfirm?: PopconfirmLocale
  // Transfer?: TransferLocale
  Transfer?: Record<string, any>
  Select?: Record<string, any>
  // Upload?: UploadLocale
  Upload?: Record<string, any>
  // Empty?: TransferLocaleForEmpty
  Empty?: Record<string, any>
  global?: {
    placeholder?: string
    close?: string
  }
  Icon?: Record<string, any>
  Text?: {
    edit?: any
    copy?: any
    copied?: any
    expand?: any
    collapse?: any
  }
  Form?: {
    optional?: string
    // defaultValidateMessages: ValidateMessages
    defaultValidateMessages?: Record<string, any>
  }
  Image?: {
    preview: string
  }
  QRCode?: {
    expired?: string
    refresh?: string
    scanned?: string
  }
  ColorPicker?: {
    presetEmpty: string
    transparent: string
    singleColor: string
    gradientColor: string
  }
}

export function useLocale<T extends Record<string, any>>(componentName: string, defaultLocale: T) {
  const configContext = useConfigContext() as Record<string, any>

  return [
    computed<T>(() => {
      const locale = configContext?.locale
      const componentLocale = locale?.[componentName] ?? {}
      return {
        ...defaultLocale,
        ...componentLocale,
      }
    }),
  ] as const
}
