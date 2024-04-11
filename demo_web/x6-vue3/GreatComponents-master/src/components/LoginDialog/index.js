import vue from 'vue'
import LoginDialog from './LoginDialog'

const DialogConstructor = vue.extend(LoginDialog)

function Init () {
  if (!this.instance) {
    this.instance = new DialogConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(this.instance.$el)
  }
  return this.instance
}

function registryDialog () {
  vue.prototype.$dialog = new Init()
}

export default registryDialog