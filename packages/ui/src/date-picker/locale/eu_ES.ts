import type { PickerLocale } from '../generatePicker'

import CalendarLocale from '../../locale/picker/locale/eu_ES'
import TimePickerLocale from '../../time-picker/locale/eu_ES'

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Hautatu data',
    rangePlaceholder: ['Hasierako data', 'Amaiera data'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
}

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale
