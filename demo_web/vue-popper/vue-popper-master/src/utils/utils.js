import Popper from 'popper.js'

export const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined'

function convertPos(arrowPosition, arrowOffset, data, type = 'left') {
  const { offsets, arrowElement } = data
  const { arrow, reference, popper } = offsets
  const pos = type === 'left' ? arrow.left : arrow.top

  let pos1

  if (typeof pos === 'number') {
    const altSide = type === 'left' ? 'left' : 'top'
    const len = type === 'left' ? 'width' : 'height'
    const offsetLen = type === 'left' ? 'offsetWidth' : 'offsetHeight'

    if (arrowPosition === 'start') {
      pos1 = arrowOffset + Math.max(0, -(popper[altSide] - reference[altSide]))
    } else if (arrowPosition === 'end') {
      pos1 =
        Math.min(reference[len], popper[len]) -
        Math.min(0, popper[altSide] - reference[altSide]) -
        arrowOffset -
        arrowElement[offsetLen]
    } else if (pos < arrowOffset) {
      pos1 = arrowOffset
    } else {
      const $pos = popper[len] - arrowElement[offsetLen] - arrowOffset
      if (pos > $pos) pos1 = $pos
      else pos1 = pos
    }
  }

  return pos1
}

export function arrowModifier(arrowPosition, arrowOffset, dataObject, options) {
  const data = Popper.Defaults.modifiers.arrow.fn(dataObject, options)

  data.offsets.arrow.left = convertPos(arrowPosition, arrowOffset, data)
  data.offsets.arrow.top = convertPos(arrowPosition, arrowOffset, data, 'top')

  return data
}

export function setStyle() {
  if (isBrowser) {
    const id = 'vue-popper-module-style'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.innerText =
        '.arrow-extend,.vue-popper[x-placement^=top] .arrow,.vue-popper[x-placement^=top] .arrow:before,.vue-popper[x-placement^=bottom] .arrow,.vue-popper[x-placement^=bottom] .arrow:before,.vue-popper[x-placement^=left] .arrow,.vue-popper[x-placement^=left] .arrow:before,.vue-popper[x-placement^=right] .arrow,.vue-popper[x-placement^=right] .arrow:before{position:absolute;width:0;height:0}' +
        '.vue-popper{border:1px solid #c2ccdc;border-radius:.2em;background:#fff}' +
        '.vue-popper[x-placement^=top]{margin-bottom:.75em}' +
        '.vue-popper[x-placement^=top] .arrow{bottom:-.4em;border:.4em solid transparent;border-bottom:0;border-top-color:#c2ccdc}' +
        ".vue-popper[x-placement^=top] .arrow:before{content:'';bottom:-.4em;border:.4em solid transparent;border-bottom:0;border-top-color:#fff;left:-.4em;bottom:1px}" +
        '.vue-popper[x-placement^=bottom]{margin-top:.75em}' +
        '.vue-popper[x-placement^=bottom] .arrow{top:-.4em;border:.4em solid transparent;border-top:0;border-bottom-color:#c2ccdc}' +
        ".vue-popper[x-placement^=bottom] .arrow:before{content:'';top:-.4em;border:.4em solid transparent;border-top:0;border-bottom-color:#fff;left:-.4em;top:1px}" +
        '.vue-popper[x-placement^=left]{margin-right:.75em}' +
        '.vue-popper[x-placement^=left] .arrow{right:-.4em;border:.4em solid transparent;border-right:0;border-left-color:#c2ccdc}' +
        ".vue-popper[x-placement^=left] .arrow:before{content:'';right:-.4em;border:.4em solid transparent;border-right:0;border-left-color:#fff;top:-.4em;right:1px}" +
        '.vue-popper[x-placement^=right]{margin-left:.75em}' +
        '.vue-popper[x-placement^=right] .arrow{left:-.4em;border:.4em solid transparent;border-left:0;border-right-color:#c2ccdc}' +
        ".vue-popper[x-placement^=right] .arrow:before{content:'';left:-.4em;border:.4em solid transparent;border-left:0;border-right-color:#fff;top:-.4em;left:1px}"
      document.head.appendChild(style)
    }
  }
}
