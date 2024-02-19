<script setup lang="ts">
import Workflow from './components/Workflow.vue'
import ProjectFlow from './components/ProjectFlow.vue';
import Todo from './components/Todo.vue';
</script>

<template>
  <div>
    <img src="./assets/cubic.svg" class="logo vue" alt="Vue logo" />
  </div>
  <Todo></Todo>
  <Workflow msg="Vite + Vue" />
  <!-- <ProjectFlow msg="项目流程图"></ProjectFlow> -->
</template>

<style scoped>

</style>
