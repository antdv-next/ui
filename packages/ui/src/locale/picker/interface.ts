export interface Locale {
  locale: string

  // ======================================================
  // ==                      Format                      ==
  // ======================================================

  // ==================== Input Format ====================
  // Input format
  /** @deprecated Please use `fieldDateFormat` instead */
  dateFormat?: string
  /** @deprecated Please use `fieldDateTimeFormat` instead */
  dateTimeFormat?: string
  /** Input field formatter like YYYY-MM-DD HH:mm:ss */
  fieldDateTimeFormat?: string
  /** Input field formatter like YYYY-MM-DD */
  fieldDateFormat?: string
  /** Input field formatter like HH:mm:ss */
  fieldTimeFormat?: string
  /** Input field formatter like YYYY-MM */
  fieldMonthFormat?: string
  /** Input field formatter like YYYY */
  fieldYearFormat?: string
  /** Input field formatter like wwww-go */
  fieldWeekFormat?: string
  /** Input field formatter like YYYY-Q */
  fieldQuarterFormat?: string

  // ===================== Date Panel =====================
  // Header Format
  /** Display month before year in date panel header */
  monthBeforeYear?: boolean
  /** year format in header panel */
  yearFormat?: string
  /** month format in header panel */
  monthFormat?: string

  // Cell format
  /** year format in body panel */
  cellYearFormat?: string
  /** quarter format in body panel */
  cellQuarterFormat?: string
  /** @deprecated Please use `cellDateFormat` instead */
  dayFormat?: string
  /** day format in body panel */
  cellDateFormat?: string
  /** meridiem format in body panel */
  cellMeridiemFormat?: string

  // ======================================================
  // ==                       MISC                       ==
  // ======================================================
  today: string
  now: string
  backToToday: string
  ok: string
  timeSelect: string
  dateSelect: string
  weekSelect?: string
  clear: string
  week: string
  month: string
  year: string
  previousMonth: string
  nextMonth: string
  monthSelect: string
  yearSelect: string
  decadeSelect: string

  previousYear: string
  nextYear: string
  previousDecade: string
  nextDecade: string
  previousCentury: string
  nextCentury: string

  shortWeekDays?: string[]
  shortMonths?: string[]
}
