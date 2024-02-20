export function isString(value: any) {
  return (typeof value === 'string') || (value instanceof String)
}

export function isNumber(value: any) {
  return (typeof value === 'number') || (value instanceof Number)
}

export function isArray(value: any) {
  return Array.isArray(value)
}

export function copyArray(value: any[]) {
  return [ ...value ]
}



