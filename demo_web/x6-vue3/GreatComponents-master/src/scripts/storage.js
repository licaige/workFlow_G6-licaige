// 封装localStorage

// import config from 'xxx'
const config = {
  namespace: 'dev'
}
export default {
  setItem (key, val) {
    let storage = this.getStorage()
    storage[key] = val
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  getItem (key) {
    return this.getStorage()[key]
  },
  getStorage () {
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
  },
  clearItem (key) {
    let storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAll () {
    window.localStorage.clear()
  }
}