import { ref, computed } from 'vue'

function useCount() {
  let count = ref(10);
  let double = computed(() => {
    return count.value * 2;
  });

  const handleConut = () => {
    count.value = count.value * 2;
  };

  console.log(count);

  return {
    count,
    double,
    handleConut,
  };
}

export default useCount