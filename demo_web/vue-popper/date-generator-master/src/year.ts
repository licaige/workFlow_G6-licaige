import { GntYearOptions, Integer, IntegerStr, YearInfo } from './types'
import { fillTo, isNonNegInt, nowDate } from './utils'

export function gntYear(
  start: IntegerStr,
  len: Integer,
  options?: GntYearOptions,
) {
  start = +start
  options = options || {}

  if (!isNonNegInt(+start) || !isNonNegInt(+len)) {
    throw new Error('Prop start and len must be a non-negative number')
  }

  const splitLen = options.splitLen || 3
  const min = options.min || null
  const max = options.max || null

  const arr: YearInfo[][] = []
  const line = Math.ceil(len / splitLen)
  const now = nowDate()
  for (let i = 0; i < line; i += 1) {
    arr[i] = []
    for (let j = 0; j < splitLen; j += 1) {
      const year = start + i * splitLen + j
      if (year - start + 1 > len) break
      arr[i].push({
        year: fillTo(4, year),
        canBeChose:
          (!min && !max) ||
          (!!min && !!max && year >= min && year <= max) ||
          (!min && !!max && year <= max) ||
          (!max && !!min && year >= min),
        isNow: +now.year === year,
      })
    }
  }

  return arr
}
