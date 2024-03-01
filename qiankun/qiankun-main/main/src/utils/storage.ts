// 存
export const setSession = (key: any, value: any) => {
  if (typeof value === 'object') {
    window.sessionStorage.setItem(key, JSON.stringify(value))
    return
  }

  window.sessionStorage.setItem(key, value)
}

// 取
export const getSession = (key: string) => {
  const value = <string>window.sessionStorage.getItem(key)

  if (value && value.indexOf('{') !== -1) {
    return JSON.parse(value)
  }

  return value
}

// 删除
export const removeSession = (key: string) => {
  window.sessionStorage.removeItem(key)
}

// 清除
export const clearSession = () => {
  window.sessionStorage.clear()
}
