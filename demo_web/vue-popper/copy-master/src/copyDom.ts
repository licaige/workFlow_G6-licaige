import { CopyDomOptions } from './types'

/**
 * @param {Element} dom
 * @param {Object} options - Optional
 * @returns {Boolean}
 * */
export default function copyDom(
  dom: Element,
  options?: CopyDomOptions,
): boolean {
  const defaultObj = {
    clearSelect: false,
    cut: false,
  }
  const opts = Object.assign({}, defaultObj, options)
  const { clearSelect, cut } = opts

  let range
  let selection
  if (window.getSelection) {
    selection = window.getSelection()

    if (!selection) {
      console.error(`copyDom: window.getSelection() return null`)
      return false
    }

    range = window.document.createRange()

    selection.removeAllRanges()
    range.selectNode(dom)
    selection.addRange(range)
  } else {
    // @ts-ignore
    const { createTextRange } = document.body /* IE < 9 */
    if (createTextRange) {
      range = createTextRange()
      range.moveToElementText(dom)
      range.select()
    }
  }

  /* use document.execCommand `copy` */
  const success = document.execCommand('copy')

  if (selection && clearSelect) selection.removeAllRanges()

  if (cut) {
    if (dom instanceof HTMLInputElement || dom instanceof HTMLTextAreaElement) {
      dom.value = ''
    } else dom.innerHTML = ''
  }
  return success
}
