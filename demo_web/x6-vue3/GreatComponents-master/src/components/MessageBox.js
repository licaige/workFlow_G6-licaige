// vue3才能用，且需要安装配置@vitejs/plugin-vue-jsx插件
// vueJsx({
//   include:/\.[jt]xs$|\.js$/
// })
import { createApp } from 'vue'
const MessageBox = {
  props: {
    msg: {
      type: String,
      require: true
    }
  },
  render: (ctx) => {
    const {$props, $emit} = ctx
    return <div click={$emit('onClick')}>{$props.msg}</div>
  }
}

export function showMsg(msg, onClick) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp(MessageBox, {
    msg,
    onClick() {
      onClick(() => {
        app.unmount()
        div.remove()
      })
    },
    render: (ctx) => {
      const {$props, $emit} = ctx
      return <div click={$emit('onClick')}>{$props.msg}</div>
    }
  })
  app.mount(div)
}

export function test() {
  showMsg('123123', (close) => {
    close()
  })
}