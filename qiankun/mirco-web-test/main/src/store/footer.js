import { ref } from 'vue'

// 是否显示底部
export const showFooter = ref(true)

export const changeFooter = (type) => {
  showFooter.value = type
}
