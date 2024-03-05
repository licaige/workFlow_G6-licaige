import { ref } from 'vue';

export const loginStatus = ref(window.localStorage.getItem('login'));

// 开启loading
export const logined = () => {
  loginStatus.value = true;
};

// 关闭loading
export const unlogin = () => {
  loginStatus.value = false;
};
