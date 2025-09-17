import type { PickerLocale } from '../generatePicker'

import CalendarLocale from '../../locale/picker/locale/fi_FI'
import TimePickerLocale from '../../time-picker/locale/fi_FI'

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Valitse päivä',
    rangePlaceholder: ['Alkamispäivä', 'Päättymispäivä'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
}

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale
