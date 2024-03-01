<template>
  <div class="tab1wrap">
    <slot></slot>
  </div>
</template>
<script>
  import { ref, onMounted } from 'vue';
  export default {
    props:['slots'],
  data() {
    return {
      
    }
  },
  methods: {
    onClick() {

    }
  },
  mounted(){
  }
}
</script>
<style scoped></style>
