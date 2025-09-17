import type { PopconfirmLocale } from '../popconfirm/define'
import type { PaginationLocale } from './pagination/interface'

import { computed } from 'vue'
import { useConfigContext } from '../config-provider/context'
import defaultLocaleData from './en_US'

export type LocaleContextProps = Locale & { exist?: boolean }

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>

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

export function useLocale<C extends LocaleComponentName = LocaleComponentName>(componentName: C, defaultLocale?: Locale[C] | (() => Locale[C])) {
  const configContext = useConfigContext()
  const fullLocale = computed(() => configContext.locale)
  const getLocale = computed(() => {
    const locale = defaultLocale || defaultLocaleData[componentName]
    const localeFromContext = fullLocale.value?.[componentName] ?? {}
    return {
      ...(typeof locale === 'function' ? locale() : locale),
      ...localeFromContext,
    }
  })
  const getLocaleCode = computed(() => {
    const localeCode = fullLocale?.value?.locale
    if ((fullLocale.value as LocaleContextProps)?.exist && !localeCode) {
      return defaultLocaleData.locale
    }
    return localeCode!
  })
  return [getLocale, getLocaleCode]
}
