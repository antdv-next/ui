import type { PickerLocale } from '../generatePicker'

import CalendarLocale from '../../locale/picker/locale/cs_CZ'
import TimePickerLocale from '../../time-picker/locale/cs_CZ'

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Vybrat datum',
    rangePlaceholder: ['Od', 'Do'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
}

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale
