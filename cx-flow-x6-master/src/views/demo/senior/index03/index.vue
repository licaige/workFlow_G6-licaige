<template>
  <div style="height: 500px">
    <Demo />
  </div>
</template>

<script lang="ts">
  import { applyReactInVue } from 'veaury';
  import Demo from './react_app/xflow';

  export default {
    name: 'Index03',
    components: {
      Demo: applyReactInVue(Demo),
    },
  };
</script>

<style scoped></style>
