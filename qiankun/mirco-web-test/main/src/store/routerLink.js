import { ref } from 'vue';

export const routerLink = ref(() => {});

// 开启loading
export const routerPush = (path) => {
  routerLink.value.push(path)
};
