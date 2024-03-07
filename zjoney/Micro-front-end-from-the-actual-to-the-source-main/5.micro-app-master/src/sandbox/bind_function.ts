/* eslint-disable no-return-assign */
import { isBoundFunction, rawDefineProperty, isBoolean } from '../libs/utils'

function isBoundedFunction (value: CallableFunction & {__MICRO_APP_IS_BOUND_FUNCTION__: boolean}): boolean {
  if (isBoolean(value.__MICRO_APP_IS_BOUND_FUNCTION__)) return value.__MICRO_APP_IS_BOUND_FUNCTION__
  return value.__MICRO_APP_IS_BOUND_FUNCTION__ = isBoundFunction(value)
}

function isConstructor (value: FunctionConstructor & {__MICRO_APP_IS_CONSTRUCTOR__: boolean}) {
  if (isBoolean(value.__MICRO_APP_IS_CONSTRUCTOR__)) return value.__MICRO_APP_IS_CONSTRUCTOR__

  const valueStr = value.toString()

  const result = (
    value.prototype?.constructor === value &&
    Object.getOwnPropertyNames(value.prototype).length > 1
  ) ||
    /^function\s+[A-Z]/.test(valueStr) ||
    /^class\s+/.test(valueStr)

  return value.__MICRO_APP_IS_CONSTRUCTOR__ = result
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function bindFunctionToRawWindow (rawWindow: Window, value: any): unknown {
  if (value.__MICRO_APP_BOUND_WINDOW_FUNCTION__) return value.__MICRO_APP_BOUND_WINDOW_FUNCTION__

  if (!isConstructor(value) && !isBoundedFunction(value)) {
    const bindRawWindowValue = value.bind(rawWindow)

    for (const key in value) {
      bindRawWindowValue[key] = value[key]
    }

    if (value.hasOwnProperty('prototype')) {
      rawDefineProperty(bindRawWindowValue, 'prototype', {
        value: value.prototype,
        configurable: true,
        enumerable: false,
        writable: true,
      })
    }

    return value.__MICRO_APP_BOUND_WINDOW_FUNCTION__ = bindRawWindowValue
  }

  return value
}
