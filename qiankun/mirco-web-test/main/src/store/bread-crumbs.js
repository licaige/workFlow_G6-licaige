import { ref } from 'vue'

export const breadCrumbsList = ref([])

export const setCrumbs = (arr, additional) => {
  if (additional) {
    breadCrumbsList.value.push(...arr)
    return
  }
  breadCrumbsList.value = arr
}
