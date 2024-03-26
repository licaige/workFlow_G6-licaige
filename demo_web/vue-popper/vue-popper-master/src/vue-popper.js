// src\utils\vue-popper.js
import Vue from 'vue';
import {
  PopupManager
} from 'element-ui/src/utils/popup';

const PopperJS = Vue.prototype.$isServer ? function() {} : require('./popper');
const stop = e => e.stopPropagation();

/**
 * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */
export default {
  props: {
    transformOrigin: {
      type: [Boolean, String],
      default: true
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    boundariesPadding: {
      type: Number,
      default: 5
    },
    reference: {},
    popper: {},
    offset: {
      default: 0
    },
    value: Boolean,
    visibleArrow: Boolean,
    arrowOffset: {
      type: Number,
      default: 35
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    popperOptions: {
      type: Object,
      default() {
        return {
          gpuAcceleration: false
        };
      }
    }
  },

  data() {
    return {
      showPopper: false,
      currentPlacement: ''
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.showPopper = val;
        this.$emit('input', val);
      }
    },

    showPopper(val) {
      if (this.disabled) return;
      val ? this.updatePopper() : this.destroyPopper();
      this.$emit('input', val);
    }
  },

  methods: {
    createPopper() {
      if (this.$isServer) return;
      /**
       * 获取冒泡所设置的位置。
       * 'top','top-start','bottom','bottom-end'之类，和el-popover的placement一样
       */
      this.currentPlacement = this.currentPlacement || this.placement;
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return;
      }
      // 关于popperOptions的详细配置可以看./popper.js中Popper构造函数中JSDoc对于options的注解
      const options = this.popperOptions;
      // 获取要被设置成冒泡出现效果的dom元素，例如被设置了(ref="popper")的元素
      const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
      // 获取要被设置成基准点的dom元素，例如被设置了(ref="reference")的元素
      let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;
      if (!reference &&
        this.$slots.reference &&
        this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm;
      }
      if (!popper || !reference) return;
      if (this.visibleArrow) this.appendArrow(popper);
      if (this.appendToBody) document.body.appendChild(this.popperElm);
      // 如果popperJS已存在，所以先销毁之前创建的popperJS
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }
      options.placement = this.currentPlacement;
      options.offset = this.offset;
      options.arrowOffset = this.arrowOffset;
      this.popperJS = new PopperJS(reference, popper, options);
      this.popperJS.onCreate(_ => {
        this.$emit('created', this);
        // 重置transform-origin作为transform的基准位置
        this.resetTransformOrigin();
        // 在下一个更新帧中调用updatePopper函数
        this.$nextTick(this.updatePopper);
      });
      if (typeof options.onUpdate === 'function') {
        this.popperJS.onUpdate(options.onUpdate);
      }
      this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
      this.popperElm.addEventListener('click', stop);
    },
    /**
     * 更新Popper状态
     * 该函数是vue-popper被外部引用且mixin后，被唯一调用的用作更新的函数，可以当作分析源码的入口
     *
     */
    updatePopper() {
      const popperJS = this.popperJS;
      // this.popperJS存在，故
      if (popperJS) {
        // 调用Popper实例内部更新函数更新状态，包括left，top的位置
        popperJS.update();
        /**
         * _popper指的是冒泡DOM
         * 若其存在，则从PopupManager中获取最新且最大值的z-index，赋值到其style['z-index']中
         * 使冒泡Popper在更新位置呈现时永远处于最顶层
         */
        if (popperJS._popper) {
          popperJS._popper.style.zIndex = PopupManager.nextZIndex();
        }
        // this.popperJS为空时，Popper还没被创建，故调用createPopper函数
      } else {
        this.createPopper();
      }
    },
    /**
     * 销毁PopperJS函数
     * @param {Boolean} forceDestroy
     */
    doDestroy(forceDestroy) {
      /* istanbul ignore if */
      if (!this.popperJS || (this.showPopper && !forceDestroy)) return;
      // 调用Popper实例中的销毁函数
      this.popperJS.destroy();
      this.popperJS = null;
    },

    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },

    resetTransformOrigin() {
      if (!this.transformOrigin) return;
      let placementMap = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      };
      let placement = this.popperJS._popper.getAttribute('x-placement').split('-')[0];
      let origin = placementMap[placement];
      this.popperJS._popper.style.transformOrigin = typeof this.transformOrigin === 'string'
        ? this.transformOrigin
        : ['top', 'bottom'].indexOf(placement) > -1 ? `center ${ origin }` : `${ origin } center`;
    },

    appendArrow(element) {
      let hash;
      if (this.appended) {
        return;
      }

      this.appended = true;

      for (let item in element.attributes) {
        if (/^_v-/.test(element.attributes[item].name)) {
          hash = element.attributes[item].name;
          break;
        }
      }

      const arrow = document.createElement('div');

      if (hash) {
        arrow.setAttribute(hash, '');
      }
      arrow.setAttribute('x-arrow', '');
      arrow.className = 'popper__arrow';
      element.appendChild(arrow);
    }
  },

  beforeDestroy() {
    this.doDestroy(true);
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener('click', stop);
      document.body.removeChild(this.popperElm);
    }
  },

  // call destroy in keep-alive mode
  deactivated() {
    this.$options.beforeDestroy[0].call(this);
  }
};
