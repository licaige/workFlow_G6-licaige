export function cache (fn) {
  const cache = {}
  return function () {
    const key = JSON.stringify(arguments)
    return cache[key] || (cache[key] = fn.apply(this, arguments))
  }
}
export function getCookie (name) {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
}

export function setCookie (name, value, expires, path, domain, secure) {
  let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
  if (expires instanceof Date) {
    cookieText += '; expires=' + expires.toGMTString()
  }
  if (path) {
    cookieText += '; path=' + path
  }
  if (domain) {
    cookieText += '; domain=' + domain
  }
  if (secure) {
    cookieText += '; secure'
  }
  document.cookie = cookieText
}

setCookie('name', 'value', new Date('2024-12-31'))

export function deleteCookie (name, path, domain, secure) {
  document.cookie = name + '=; expires=' + new Date(0).toUTCString() + (path ? '; path=' + path : '') + (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '')
}