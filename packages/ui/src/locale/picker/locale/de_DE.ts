import type { Locale } from '../interface'
import { commonLocale } from './common'

const locale: Locale = {
  ...commonLocale,
  locale: 'de_DE',
  today: 'Heute',
  now: 'Jetzt',
  backToToday: 'Zurück zu Heute',
  ok: 'OK',
  clear: 'Zurücksetzen',
  week: 'Woche',
  month: 'Monat',
  year: 'Jahr',
  timeSelect: 'Zeit wählen',
  dateSelect: 'Datum wählen',
  monthSelect: 'Wähle einen Monat',
  yearSelect: 'Wähle ein Jahr',
  decadeSelect: 'Wähle ein Jahrzehnt',

  previousMonth: 'Vorheriger Monat (PageUp)',
  nextMonth: 'Nächster Monat (PageDown)',
  previousYear: 'Vorheriges Jahr (Ctrl + left)',
  nextYear: 'Nächstes Jahr (Ctrl + right)',
  previousDecade: 'Vorheriges Jahrzehnt',
  nextDecade: 'Nächstes Jahrzehnt',
  previousCentury: 'Vorheriges Jahrhundert',
  nextCentury: 'Nächstes Jahrhundert',
}

export default locale
