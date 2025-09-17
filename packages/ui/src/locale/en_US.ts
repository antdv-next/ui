import type { PopconfirmLocale } from '../popconfirm/define'

interface Locale {
  locale: string
  Popconfirm: PopconfirmLocale
}

const localeValues: Locale = {
  locale: 'en',
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancel',
  },
}

export default localeValues
