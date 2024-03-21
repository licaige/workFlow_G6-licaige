<template>
  <section class="app">
    <h1>APP</h1>
    <TestDefineExposeFather />
    <TestScrollTop />
    <TestRecursiveComponent />
    <TestWatchFlushOntrackOnTrigger/>
  </section>
</template>

<script setup>
import TestDefineExposeFather from "./component/1.test-define-expose-father.vue";
import TestScrollTop from "./component/2.test-scroll-top.vue";
import TestRecursiveComponent from "./component/3.test-recursive-component.vue";
import TestWatchFlushOntrackOnTrigger from './component/4.test-watch-flush-onTrack-onTrigger.vue';
</script>

<style lang="scss" scoped>
.app {
  border: 1px solid black;
  padding: 30px;
}
</style>
