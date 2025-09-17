import type { PickerLocale } from '../generatePicker'

import CalendarLocale from '../../locale/picker/locale/hu_HU'
import TimePickerLocale from '../../time-picker/locale/hu_HU'

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Válasszon dátumot',
    rangePlaceholder: ['Kezdő dátum', 'Befejezés dátuma'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
}

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale
