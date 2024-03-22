import copyDom from './copyDom'

/**
 * @param {String} text
 * @return {Promise<boolean>}
 * */
export default function copyText(text: string): Promise<true> {
  return new Promise((res, rej) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => res(true))
        .catch(e => {
          const err = new Error(
            e.message
              ? `copyText failed, reason: ${e.message}`
              : 'copyText failed',
          )
          rej(err)
        })
    } else {
      const textEl = document.createElement('span')
      textEl.style.position = 'fixed'
      textEl.style.left = '0'
      textEl.style.top = '0'
      textEl.style.zIndex = '-999'
      textEl.innerText = text

      document.body.appendChild(textEl)
      const bool = copyDom(textEl)
      document.body.removeChild(textEl)

      if (bool) res(bool)
      else rej(new Error('copyText failed'))
    }
  })
}
