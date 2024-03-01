import { ref } from 'vue';

export const headerStatus = ref(true)

export const changeHeader = type => headerStatus.value = type;
