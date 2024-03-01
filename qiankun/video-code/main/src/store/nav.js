import { ref } from 'vue';

export const navStatus = ref(true)

export const changeNav = type => navStatus.value = type;
