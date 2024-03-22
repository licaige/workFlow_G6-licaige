import {
  DateStr,
  GntMonthOptions,
  Integer,
  IntegerStr,
  MonthInfo,
} from './types'
import { fillTo, nowDate, parseDate, positiveMod } from './utils'

export function gntMonth(year: IntegerStr, options?: GntMonthOptions) {
  year = +year
  options = options || {}

  const splitLen = options.splitLen || 3
  const min =
    typeof options.min === 'string' ? parseDate(options.min) : options.min
  const max =
    typeof options.max === 'string' ? parseDate(options.max) : options.max

  const arr: MonthInfo[][] = []
  const line = Math.ceil(12 / splitLen)
  const now = nowDate()
  for (let i = 0; i < line; i += 1) {
    arr[i] = []
    for (let j = 0; j < splitLen; j += 1) {
      const month = i * splitLen + j + 1
      if (month > 12) break
      arr[i].push({
        year: fillTo(4, year),
        month: fillTo(2, month),
        canBeChose:
          (!min && !max) ||
          (!!min &&
            !!max &&
            (year > +min.year || (year === +min.year && month >= +min.month)) &&
            (year < +max.year ||
              (year === +max.year && month <= +max.month))) ||
          (!max &&
            !!min &&
            (year > +min.year ||
              (year === +min.year && month >= +min.month))) ||
          (!min &&
            !!max &&
            (year < +max.year || (year === +max.year && month <= +max.month))),
        isNow: +now.year === year && +now.month === month,
      })
    }
  }

  return arr
}

export function getMonthByStep(
  currMonth: { year: IntegerStr; month: IntegerStr } | DateStr,
  step: Integer,
): typeof currMonth extends DateStr
  ? Pick<MonthInfo, 'year' | 'month'> | null
  : Pick<MonthInfo, 'year' | 'month'> {
  const $currMonth =
    typeof currMonth === 'string' ? parseDate(currMonth) : currMonth
  if (!$currMonth) return null as any
  const $month = +$currMonth.month + step
  const mod = positiveMod($month, 12)
  let times = Math.floor($month / 12)
  if (mod === 0) times -= 1
  return {
    year: fillTo(4, +$currMonth.year + times),
    month: fillTo(2, mod || 12),
  }
}
