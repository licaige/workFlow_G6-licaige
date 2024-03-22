<template>
  <div class="vue-popper">
    <div class="arrow" x-arrow></div>
    <slot />
  </div>
</template>

<script>
import Popper from 'popper.js'
import { arrowModifier, isBrowser, setStyle } from '../utils/utils'

export default {
  name: 'VuePopper',
  props: {
    arrowPosition: {
      default: 'middle', // Options: ['middle', 'start', 'end']
      type: String,
    },
    arrowOffsetScaling: {
      default: (isBrowser && window.devicePixelRatio) || 1,
      type: Number,
    },
    referenceElm: isBrowser ? [Window, Element, Document] : Object,
    popperOptions: Object,
  },
  data() {
    return {
      popperJs: null,
    }
  },
  computed: {
    options() {
      const { modifiers } = this.popperOptions || {}
      return {
        ...this.popperOptions,
        modifiers: {
          ...modifiers,
          arrow: {
            fn: (...args) =>
              arrowModifier(this.arrowPosition, this.arrowOffset, ...args),
            element: '[x-arrow]',
          },
        },
      }
    },
    arrowOffset() {
      return 10 * this.arrowOffsetScaling
    },
  },
  watch: {
    referenceElm() {
      this.createPopper()
    },
  },
  methods: {
    referenceEle() {
      if (this.referenceElm) return this.referenceElm
      if (!isBrowser || !this.$el) return null
      return this.$el.parentNode || window
    },
    createPopper() {
      const referenceEle = this.referenceEle()
      if (referenceEle) {
        this.destroyPopper()
        this.popperJs = new Popper(referenceEle, this.$el, this.options)
      }
    },
    updatePopper() {
      if (this.popperJs) this.popperJs.scheduleUpdate()
    },
    destroyPopper() {
      if (this.popperJs) this.popperJs.destroy()
    },
  },
  mounted() {
    setStyle()
    this.createPopper()
    this.$on('hook:updated', () => this.updatePopper())
    this.$on('hook:beforeDestroy', () => this.destroyPopper())
  },
}
</script>
