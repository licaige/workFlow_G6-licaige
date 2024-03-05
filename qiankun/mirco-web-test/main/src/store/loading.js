import { ref } from 'vue';

export const loadingStatus = ref(false);

// 开启loading
export const openLoading = () => {
  loadingStatus.value = true;
};

// 关闭loading
export const closeLoading = () => {
  loadingStatus.value = false;
};
