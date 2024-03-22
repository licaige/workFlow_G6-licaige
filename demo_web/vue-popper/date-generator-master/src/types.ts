/**
 * Integer number
 * */
export type Integer = number
/**
 * Format: /^\d\d$/
 * */
export type NumberStr = string
export type IntegerStr = Integer | NumberStr

export enum DefaultMax {
  Hour = 23,
  Minute = 59,
  Second = 59,
}

/**
 * Format: /^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/
 * */
export type DateStr = string

/**
 * Format: /^(\d{1,2}):?(\d{1,2})?:?(\d{1,2})?$/
 * */
export type TimeStr = string

export interface GetResultItem<M extends DefaultMax> {
  value: NumberStr
  max: M
  canBeChose: boolean
}

export interface GetOptions {
  interval?: Integer
  min?: Integer
  max?: Integer
}

export interface DateInfoBase {
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

export interface DateInfoBase1 {
  year: IntegerStr
  month: IntegerStr
  date: IntegerStr
}

export interface TimeInfo {
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

export interface DateInfo extends DateInfoBase {
  isInThisMonth: boolean
  isNow: boolean
  canBeChose: boolean
}

export interface GntCalendarOptions {
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

export interface MonthInfo {
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

export interface GntMonthOptions {
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

export interface GntYearOptions {
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

export interface YearInfo {
  /**
   * String that already been formatted, such as `2020`
   *
   * 已格式化的字符串，例如：`2020`
   * */
  year: NumberStr
  canBeChose: boolean
  isNow: boolean
}

export enum DateCompare {
  GreatThanYear = 100,
  GreatThanMonth = 10,
  GreatThanDate = 1,
  Equal = 0,
  LessThanDate = -1,
  LessThanMonth = -10,
  LessThanYear = -100,
}
