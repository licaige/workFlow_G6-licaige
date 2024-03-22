// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue'
import { PopperOptions } from 'popper.js'

export type ArrowPosition = 'middle' | 'start' | 'end'

export interface VuePopperProps {
  /**
   * Set the position of arrow
   *
   * Default to 'middle'
   * */
  arrowPosition?: ArrowPosition
  /**
   * Set the left offset scaling of arrow
   *
   * Default to: window.devicePixelRatio || 1
   * */
  arrowOffsetScaling?: number
  /**
   * Prop `reference` of popper.js
   *
   * Default to the parentNode of the component instance
   * */
  referenceElm?: Element
  /**
   * Prop `options` of popper.js
   *
   * Default to the defaults of popper.js
   * */
  popperOptions?: PopperOptions
}

declare class VuePopper extends Vue implements VuePopperProps {
  arrowPosition?: ArrowPosition

  arrowOffsetScaling?: number

  referenceElm?: Element

  popperOptions?: PopperOptions
}

export default VuePopper
