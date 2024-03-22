import {
  DateInfoBase,
  DateStr,
  DefaultMax,
  GetOptions,
  GetResultItem,
  Integer,
  IntegerStr,
  TimeInfo,
  TimeStr,
} from './types'

export function fillTo(width: Integer, num: IntegerStr, pad = '0') {
  if (pad === undefined) pad = '0'
  num = num.toString()
  width -= num.length
  if (width > 0) {
    return new Array(width + (/\./.test(num) ? 2 : 1)).join(pad) + num
  }
  return num
}

export function isNonNegInt(num: IntegerStr) {
  num = +num
  return num === Math.floor(num) && num >= 0
}

export function objAssign<T extends any, U extends any>(o1: T, o2: U): T & U {
  o1 = typeof o1 === 'object' ? o1 : ({} as any)
  o2 = typeof o2 === 'object' ? o2 : ({} as any)
  return Object.keys(o1)
    .concat(Object.keys(o2))
    .reduce((pre: any, k) => {
      if (!(k in pre)) pre[k] = o2[k] !== undefined ? o2[k] : o1[k]
      return pre
    }, {})
}

export function positiveMod(val: number, div: number) {
  return ((val % div) + div) % div
}

export function isLeapYear(year: IntegerStr) {
  year = +year
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

export function getMonthLen(year: IntegerStr, month: IntegerStr) {
  year = +year
  month = +month

  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  }

  return Math.ceil(Math.abs(month - 7.5)) % 2 === 1 ? 31 : 30
}

export function getIntervalVal<T extends DefaultMax>(defaultMax: T) {
  return (options?: GetOptions): GetResultItem<T>[] => {
    const interval = Math.ceil(Math.abs((options && options.interval) || 1))
    const min = Math.ceil(Math.abs((options && options.min) || 0))
    const max = Math.ceil(Math.abs((options && options.max) || defaultMax - 1))
    const arr = []
    for (let i = 0; i <= defaultMax; i += interval!) {
      arr.push({
        value: fillTo(2, i),
        max: defaultMax,
        canBeChose: i >= min && i <= max,
      })
    }
    return arr
  }
}

export function parseDate(date: DateStr) {
  if (!date) return null
  const reg = /^(\d{4})-?(\d{1,2})?-?(\d{1,2})?$/

  if (!reg.test(date)) {
    console.warn(
      new Error(
        `Param date \`${date}\` is invalid. The right example: 2018[-02][-01]`,
      ),
    )
    return null
  }

  const arr = date.match(reg)!

  const dateObj = {
    year: fillTo(4, arr[1]),
    month: fillTo(2, positiveMod(+arr[2] || 1, 12) || 12),
  } as DateInfoBase

  const monthLen = getMonthLen(dateObj.year, dateObj.month)
  dateObj.date = fillTo(2, positiveMod(+arr[3] || 1, monthLen) || monthLen)

  return dateObj
}

export function parseTime(time: TimeStr) {
  if (!time) return null

  const reg = /^(\d{1,2}):?(\d{1,2})?:?(\d{1,2})?$/

  if (!reg.test(time)) {
    console.warn(
      new Error(
        `Param time \`${time}\` is invalid. The right example: 18[:02][:01]`,
      ),
    )
    return null
  }

  const arr = time.match(reg)!

  return {
    hour: fillTo(2, positiveMod(+arr[1], 24)),
    minute: fillTo(2, positiveMod(+arr[2] || 0, 60)),
    second: fillTo(2, positiveMod(+arr[3] || 0, 60)),
  } as TimeInfo
}

export function nowDate(): DateInfoBase {
  const now = new Date()
  return {
    year: fillTo(4, now.getFullYear()),
    month: fillTo(2, now.getMonth() + 1),
    date: fillTo(2, now.getDate()),
  }
}

export function nowTime(): TimeInfo {
  const now = new Date()
  return {
    hour: fillTo(2, now.getHours()),
    minute: fillTo(2, now.getMinutes()),
    second: fillTo(2, now.getSeconds()),
  }
}
