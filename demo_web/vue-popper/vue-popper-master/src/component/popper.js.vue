<template>
<!-- component动态组件 组件表示的元素由参数tagName决定，
tagName是props参数，默认值为span，也就是说第一层默认是span标签-->
  <component :is="tagName" :class="{'popper-active': showPopper}">
<!--    transition动画组件，vue的内置组件能够设置元素的离开进入动画，
相关动画的属性值也都设置成了props参数-->
    <transition :name="transition"
                :enter-active-class="enterActiveClass"
                :leave-active-class="leaveActiveClass"
                @after-leave="doDestroy">
<!--      span包裹着一个默认插槽，用来展示弹出框内容，
关键属性showPopper控制弹出框内的展示。-->
      <span
        ref="popper"
        :class="rootClass"
        v-show="!disabled && showPopper">
        <slot>{{ content }}</slot>
      </span>
    </transition>
<!--    reference插槽，与transition同级，展示触发弹出框的元素。
注意该插槽是具名插槽，使用时必须要加上插槽名称，
上面的是默认插槽，直接填入元素即可。-->
    <slot name="reference"></slot>
  </component>
</template>
<script>
  import Popper from 'popper.js';

  function on(element, event, handler) {
    if (element && event && handler) {
      document.addEventListener ? element.addEventListener(event, handler, false) : element.attachEvent('on' + event, handler);
    }
  }

  function off(element, event, handler) {
    if (element && event) {
      document.removeEventListener ? element.removeEventListener(event, handler, false) : element.detachEvent('on' + event, handler)
    }
  }

  export default {
    props: {
      tagName: {
        type: String,
        default: 'span',
      },
      trigger: {
        type: String,
        default: 'hover',
        // 这个校验方式有很多种，也可以用includes
        validator: value => [
          'clickToOpen',
          'click', // 与clickToToToToggle相同，提供向后兼容性
          'clickToToggle',
          'hover',
          'focus'
        ].indexOf(value) > -1
      },
      delayOnMouseOver: {
        type: Number,
        default: 10,
      },
      delayOnMouseOut: {
        type: Number,
        default: 10,
      },
      disabled: {
        type: Boolean,
        default: false
      },
      content: String,
      // 进入
      enterActiveClass: String,
      // 离开
      leaveActiveClass: String,
      boundariesSelector: String,
      reference: {},
      forceShow: {
        type: Boolean,
        default: false
      },
      dataValue: {
        default: null,
      },
      appendToBody: {
        type: Boolean,
        default: false
      },
      visibleArrow: {
        type: Boolean,
        default: true
      },
      transition: {
        type: String,
        default: ''
      },
      stopPropagation: {
        type: Boolean,
        default: false
      },
      preventDefault: {
        type: Boolean,
        default: false
      },
      // 弹框框配置项
      options: {
        type: Object,
        default() {
          return {};
        }
      },
      rootClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        referenceElm: null,
        popperJS: null,
        showPopper: false,
        currentPlacement: '',
        // 默认配置项
        popperOptions: {
          // 表示弹出框出现方位，该功能是通过css中的属性选择器实现的
          placement: 'bottom',
          computeStyle: {
            gpuAcceleration: false
          }
        }
      };
    },

    watch: {
      showPopper(value) {
        if (value) {
          // 为true调用enableEventListeners事件
          this.$emit('show', this);
          if (this.popperJS) {
            this.popperJS.enableEventListeners();
          }
          this.updatePopper();
        } else {
          // 为false调用disableEventListeners事件
          if (this.popperJS) {
            this.popperJS.disableEventListeners();
          }
          this.$emit('hide', this);
        }
      },

      forceShow: {
        handler(value) {
          this[value ? 'doShow' : 'doClose']();
        },
        immediate: true
      },

      disabled(value) {
        if (value) {
          this.showPopper = false;
        }
      }
    },

    created() {
      this.appendedArrow = false;
      this.appendedToBody = false;
      // options：弹框框配置项，data有默认配置项popperOptions，
      // 用Object.assign将两者合并
      this.popperOptions = Object.assign(this.popperOptions, this.options);
    },

    mounted() {
      this.referenceElm = this.reference || this.$slots.reference[0].elm;
      this.popper = this.$slots.default[0].elm;

      switch (this.trigger) {
        // 打开弹出框后只有点击弹出框外的区域才会关闭，
        // 绑定事件为doShow，直接将showPopper设置为true，
        // 当焦点不再触发元素时，点击触发doClose事件将其关闭
        case 'clickToOpen':
          on(this.referenceElm, 'click', this.doShow);
          on(document, 'click', this.handleDocumentClick);
          on(document, 'touchstart', this.handleDocumentClick);
          break;
        case 'click': // click、clickToToggle逻辑是一样的
          // 点击切换,绑定事件为doToggle，先阻止了冒泡与默认事件，
        // 后面直接将showPopper赋值为非，注意上面doToggle函数中的阻止冒泡
        // 与默认事件有对应的props参数，所以用if包裹了一下
        case 'clickToToggle':
          on(this.referenceElm, 'click', this.doToggle);
          on(document, 'click', this.handleDocumentClick);
          on(document, 'touchstart', this.handleDocumentClick);
          break;
        case 'hover':
          on(this.referenceElm, 'mouseover', this.onMouseOver);
          on(this.popper, 'mouseover', this.onMouseOver);
          on(this.referenceElm, 'mouseout', this.onMouseOut);
          on(this.popper, 'mouseout', this.onMouseOut);
          break;
        case 'focus':
          on(this.referenceElm, 'focus', this.onMouseOver);
          on(this.popper, 'focus', this.onMouseOver);
          on(this.referenceElm, 'blur', this.onMouseOut);
          on(this.popper, 'blur', this.onMouseOut);
          break;
      }
    },

    methods: {
      doToggle(event) {
        if(this.stopPropagation) {
          event.stopPropagation();
        }

        if(this.preventDefault) {
          event.preventDefault();
        }

        if (!this.forceShow) {
          this.showPopper = !this.showPopper;
        }
      },

      doShow() {
        this.showPopper = true;
      },

      doClose() {
        this.showPopper = false;
      },

      doDestroy() {
        if (this.showPopper) {
          return;
        }

        if (this.popperJS) {
          this.popperJS.destroy();
          this.popperJS = null;
        }

        if (this.appendedToBody) {
          this.appendedToBody = false;
          document.body.removeChild(this.popper.parentElement);
        }
      },

      createPopper() {
        this.$nextTick(() => {
          if (this.visibleArrow) {
            this.appendArrow(this.popper);
          }

          if (this.appendToBody && !this.appendedToBody) {
            this.appendedToBody = true;
            document.body.appendChild(this.popper.parentElement);
          }

          if (this.popperJS && this.popperJS.destroy) {
            this.popperJS.destroy();
          }

          if (this.boundariesSelector) {
            const boundariesElement = document.querySelector(this.boundariesSelector);

            if (boundariesElement) {
              this.popperOptions.modifiers = Object.assign({}, this.popperOptions.modifiers);
              this.popperOptions.modifiers.preventOverflow = Object.assign({}, this.popperOptions.modifiers.preventOverflow);
              this.popperOptions.modifiers.preventOverflow.boundariesElement = boundariesElement;
            }
          }

          this.popperOptions.onCreate = () => {
            this.$emit('created', this);
            this.$nextTick(this.updatePopper);
          };
          // 触发元素、弹出元素、配置项
          this.popperJS = new Popper(this.referenceElm, this.popper, this.popperOptions);
        });
      },

      destroyPopper() {
        off(this.referenceElm, 'click', this.doToggle);
        off(this.referenceElm, 'mouseup', this.doClose);
        off(this.referenceElm, 'mousedown', this.doShow);
        off(this.referenceElm, 'focus', this.doShow);
        off(this.referenceElm, 'blur', this.doClose);
        off(this.referenceElm, 'mouseout', this.onMouseOut);
        off(this.referenceElm, 'mouseover', this.onMouseOver);
        off(document, 'click', this.handleDocumentClick);

        this.showPopper = false;
        this.doDestroy();
      },

      appendArrow(element) {
        if (this.appendedArrow) {
          return;
        }

        this.appendedArrow = true;

        const arrow = document.createElement('div');
        arrow.setAttribute('x-arrow', '');
        arrow.className = 'popper__arrow';
        element.appendChild(arrow);
      },

      updatePopper() {
        this.popperJS ? this.popperJS.scheduleUpdate() : this.createPopper();
      },

      onMouseOver() {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
          this.showPopper = true;
        }, this.delayOnMouseOver);
      },

      onMouseOut() {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
          this.showPopper = false;
        }, this.delayOnMouseOut);
      },

      handleDocumentClick(e) {
        if (!this.$el || !this.referenceElm ||
          this.elementContains(this.$el, e.target) ||
          this.elementContains(this.referenceElm, e.target) ||
          !this.popper || this.elementContains(this.popper, e.target)
        ) {
          return;
        }

        this.$emit('documentClick', this);

        if (this.forceShow) {
          return;
        }

        this.showPopper = false;
      },

      elementContains(elm, otherElm) {
        if (typeof elm.contains === 'function') {
          return elm.contains(otherElm);
        }

        return false;
      }
    },

    destroyed() {
      // 组件销毁时调用destroy事件
      this.destroyPopper();
    }
  }
</script>
<style>
.popper {
  width: auto;
  background-color: #fafafa;
  color: #212121;
  text-align: center;
  padding: 2px;
  display: inline-block;
  border-radius: 3px;
  position: absolute;
  font-size: 14px;
  font-weight: normal;
  border: 1px #ebebeb solid;
  z-index: 200000;
  -moz-box-shadow: rgb(58, 58, 58) 0 0 6px 0;
  -webkit-box-shadow: rgb(58, 58, 58) 0 0 6px 0;
  box-shadow: rgb(58, 58, 58) 0 0 6px 0;
}

.popper .popper__arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
}

.popper[x-placement^="top"] {
  margin-bottom: 5px;
}

.popper[x-placement^="top"] .popper__arrow {
  border-width: 5px 5px 0 5px;
  border-color: #fafafa transparent transparent transparent;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.popper[x-placement^="bottom"] {
  margin-top: 5px;
}

.popper[x-placement^="bottom"] .popper__arrow {
  border-width: 0 5px 5px 5px;
  border-color: transparent transparent #fafafa transparent;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.popper[x-placement^="right"] {
  margin-left: 5px;
}

.popper[x-placement^="right"] .popper__arrow {
  border-width: 5px 5px 5px 0;
  border-color: transparent #fafafa transparent transparent;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.popper[x-placement^="left"] {
  margin-right: 5px;
}

.popper[x-placement^="left"] .popper__arrow {
  border-width: 5px 0 5px 5px;
  border-color: transparent transparent transparent #fafafa;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
</style>
