/**
 * Integer number
 * */
declare type Integer = number
/**
 * Format: /^\d\d$/
 * */
declare type NumberStr = string
declare type IntegerStr = Integer | NumberStr

declare enum DefaultMax {
  Hour = 23,
  Minute = 59,
  Second = 59,
}

/**
 * Format: /^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/
 * */
declare type DateStr = string
/**
 * Format: /^(\d{1,2}):?(\d{1,2})?:?(\d{1,2})?$/
 * */
declare type TimeStr = string

interface GetResultItem<M extends DefaultMax> {
  value: NumberStr
  max: M
  canBeChose: boolean
}

interface GetOptions {
  interval?: Integer
  min?: Integer
  max?: Integer
}

interface DateInfoBase {
  /**
   * String that already been formatted, such as `2020`
   *
   * 已格式化的字符串，例如：`2020`
   * */
  year: NumberStr
  /**
   * String that already been formatted, such as `02`
   *
   * 已格式化的字符串，例如：`02`
   * */
  month: NumberStr
  /**
   * String that already been formatted, such as `01`
   *
   * 已格式化的字符串，例如：`01`
   * */
  date: NumberStr
}

interface DateInfoBase1 {
  year: IntegerStr
  month: IntegerStr
  date: IntegerStr
}

interface TimeInfo {
  /**
   * String that already been formatted, such as `02`
   *
   * 已格式化的字符串，例如：`02`
   * */
  hour: NumberStr
  /**
   * String that already been formatted, such as `02`
   *
   * 已格式化的字符串，例如：`02`
   * */
  minute: NumberStr
  /**
   * String that already been formatted, such as `02`
   *
   * 已格式化的字符串，例如：`02`
   * */
  second: NumberStr
}

interface DateInfo extends DateInfoBase {
  isInThisMonth: boolean
  isNow: boolean
  canBeChose: boolean
}

interface GntCalendarOptions {
  /**
   * Min date
   * */
  min?: DateInfoBase1 | DateStr
  /**
   * Max date
   * */
  max?: DateInfoBase1 | DateStr
  /**
   * The start day of the week
   *
   * Default is 0 (Sunday)
   * */
  firstDayOfWeek?: number
}

interface MonthInfo {
  /**
   * String that already been formatted, such as `2020`
   *
   * 已格式化的字符串，例如：`2020`
   * */
  year: NumberStr
  /**
   * String that already been formatted, such as `02`
   *
   * 已格式化的字符串，例如：`02`
   * */
  month: NumberStr
  canBeChose: boolean
  isNow: boolean
}

interface GntMonthOptions {
  /**
   * Default: 3
   * */
  splitLen?: number
  /**
   * Min Month
   * */
  min?: Pick<DateInfoBase1, 'year' | 'month'> | DateStr
  /**
   * Max Month
   * */
  max?: Pick<DateInfoBase1, 'year' | 'month'> | DateStr
}

interface GntYearOptions {
  /**
   * Default: 3
   * */
  splitLen?: number
  /**
   * Min year
   * */
  min?: Integer
  /**
   * Max year
   * */
  max?: Integer
}

interface YearInfo {
  /**
   * String that already been formatted, such as `2020`
   *
   * 已格式化的字符串，例如：`2020`
   * */
  year: NumberStr
  canBeChose: boolean
  isNow: boolean
}

declare enum DateCompare {
  GreatThanYear = 100,
  GreatThanMonth = 10,
  GreatThanDate = 1,
  Equal = 0,
  LessThanDate = -1,
  LessThanMonth = -10,
  LessThanYear = -100,
}

declare function compareDates(
  date1: DateInfoBase1 | DateStr,
  date2: DateInfoBase1 | DateStr,
): DateCompare

declare function calcStepBetweenDates(
  date: DateInfoBase1 | DateStr,
  targetDate: DateInfoBase1 | DateStr,
): number

declare function gntCalendar(
  monthInfo:
    | {
        year: IntegerStr
        month: IntegerStr
      }
    | DateStr,
  options?: GntCalendarOptions,
): typeof monthInfo extends DateStr ? DateInfo[][] | null : DateInfo[][]

declare function getDateByStep(
  currDate:
    | {
        year: IntegerStr
        month: IntegerStr
        date: IntegerStr
      }
    | DateStr,
  step: Integer,
): typeof currDate extends DateStr ? DateInfoBase | null : DateInfoBase

declare const getHour: (
  options?: GetOptions | undefined,
) => GetResultItem<DefaultMax.Hour>[]
declare const getMinute: (
  options?: GetOptions | undefined,
) => GetResultItem<DefaultMax.Minute>[]
declare const getSecond: (
  options?: GetOptions | undefined,
) => GetResultItem<DefaultMax.Minute>[]

declare function gntMonth(
  year: IntegerStr,
  options?: GntMonthOptions,
): MonthInfo[][]

declare function getMonthByStep(
  currMonth:
    | {
        year: IntegerStr
        month: IntegerStr
      }
    | DateStr,
  step: Integer,
): typeof currMonth extends DateStr
  ? Pick<MonthInfo, 'year' | 'month'> | null
  : Pick<MonthInfo, 'year' | 'month'>

declare function fillTo(width: Integer, num: IntegerStr, pad?: string): string

declare function isNonNegInt(num: IntegerStr): boolean

declare function objAssign<T extends any, U extends any>(o1: T, o2: U): T & U

declare function positiveMod(val: number, div: number): number

declare function isLeapYear(year: IntegerStr): boolean

declare function getMonthLen(
  year: IntegerStr,
  month: IntegerStr,
): 29 | 28 | 31 | 30

declare function getIntervalVal<T extends DefaultMax>(
  defaultMax: T,
): (options?: GetOptions | undefined) => GetResultItem<T>[]

declare function parseDate(date: DateStr): DateInfoBase | null

declare function parseTime(time: TimeStr): TimeInfo | null

declare function nowDate(): DateInfoBase

declare function nowTime(): TimeInfo

declare function getDay(
  year: IntegerStr,
  month: IntegerStr,
  date: IntegerStr,
): number

declare function gntYear(
  start: IntegerStr,
  len: Integer,
  options?: GntYearOptions,
): YearInfo[][]

export {
  DateCompare,
  DateInfo,
  DateInfoBase,
  DateInfoBase1,
  DateStr,
  DefaultMax,
  GetOptions,
  GetResultItem,
  GntCalendarOptions,
  GntMonthOptions,
  GntYearOptions,
  Integer,
  IntegerStr,
  MonthInfo,
  NumberStr,
  TimeInfo,
  TimeStr,
  YearInfo,
  calcStepBetweenDates,
  compareDates,
  fillTo,
  getDateByStep,
  getDay,
  getHour,
  getIntervalVal,
  getMinute,
  getMonthByStep,
  getMonthLen,
  getSecond,
  gntCalendar,
  gntMonth,
  gntYear,
  isLeapYear,
  isNonNegInt,
  nowDate,
  nowTime,
  objAssign,
  parseDate,
  parseTime,
  positiveMod,
}
