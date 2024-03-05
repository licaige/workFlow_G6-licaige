import { ref } from 'vue'

// 当前导航所在位置
export const currentIndex = ref(0)

// 修改导航选择
export const setCurrentIndex = (key, cb) => {
  currentIndex.value = key

  cb && cb()
}

// 是否显示头部
export const showHeader = ref(true)

export const changeHeader = (type) => {
  showHeader.value = type
}
