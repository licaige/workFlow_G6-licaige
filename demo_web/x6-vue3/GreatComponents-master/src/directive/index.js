let drag = false
export default function bindDirective (Vue) {
  Vue.directive('test', {
    bind: function (el, binding, vnode) {
      console.log('bind:')
      console.log(el, binding, vnode)
    },
    inserted: function (el, binding, vnode) {
      console.log('inserted:')
      console.log(el, binding, vnode)
    },
    update: function (el, binding, vnode, oldVnode) {
      console.log('update:')
      console.log(el, binding, vnode, oldVnode)
    },
    componentUpdated: function (el, binding, vnode, oldVnode) {
      console.log('componentUpdated:')
      console.log(el, binding, vnode, oldVnode)
    },
    unbind: function (el, binding, vnode) {
      console.log('unbind:')
      console.log(el, binding, vnode)
    },
  })
  // 注册一个全局自定义指令 `v-focus`
  Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    }
  })

  Vue.directive('pin', {
    bind: function (el, binding, vnode) {
      el.style.position = 'fixed'
      var s = (binding.arg ? binding.arg : 'top')
      el.style[s] = binding.value + 'px'
    }
  })

  // 加载
  Vue.directive('loading', {
    // 参数不可响应，但能解决v-if产生的bug
    bind: function (el, binding, vnode) {
      // 防止反复插入
      if (binding.value == true) {
        el.classList.add('loading-parent--relative')
        let mask = document.createElement('div')
        mask.classList.add('loading-mask')
        if (Array.isArray(binding.arg) && binding.arg.length > 0) {
          for (let i in binding.arg) {
            mask.append(binding.arg[i])
          }
        }
        el.append(mask.cloneNode(true))
      }
    },
    // 参数可响应
    componentUpdated: function (el, binding, vnode) {
      let currentMask
      let arr = el.children
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].classList.contains('loading-mask')) {
          currentMask = arr[i]
          break
        }
      }
      // 防止反复插入
      if (binding.value == true) {
        if (currentMask) {
          if (currentMask.classList.contains('hide')) {
            currentMask.classList.remove('hide')
          }
          return
        }
        el.classList.add('loading-parent--relative')
        let mask = document.createElement('div')
        mask.classList.add('loading-mask')
        if (Array.isArray(binding.arg) && binding.arg.length > 0) {
          for (let i in binding.arg) {
            mask.append(binding.arg[i])
          }
        }
        el.append(mask.cloneNode(true))
      } else {
        if (currentMask) {
          currentMask.classList.add('hide')
        }
      }
    }
  })
  
  // 文字超宽时滚动显示
  Vue.directive('scroll-show-all', {
    inserted: (el, binding, vnode) => {
      el.style.display = 'inline-block'
      el.style.overflow = 'hidden'
      el.parentNode.style.overflow = 'hidden'
      el.style.wordBreak = 'keep-all'
      el.style.width = (el.parentNode.clientWidth - binding.value - el.offsetLeft) + 'px'
      el.style.transition = 'margin-left 1s ease'
      if (el.scrollWidth > el.parentNode.clientWidth - binding.value - el.offsetLeft) {
        el.title = el.innerText
        el.onmouseenter = () => {
          el.style.overflow = 'visible'
          el.style.marginLeft = (el.parentNode.clientWidth - binding.value - el.offsetLeft - el.scrollWidth) + 'px'
        }
        el.onmouseleave = () => {
          el.style.marginLeft = 0
          let timer = setInterval(() => {
            if (el.style.marginLeft === '0px') {
              el.style.overflow = 'hidden'
              clearInterval(timer)
            }
          }, 1200)
        }
      }
    },
    unbind: (el, binding, vnode) => {
      el.onmouseenter = null
      el.onmouseleave = null
    }
  })

}