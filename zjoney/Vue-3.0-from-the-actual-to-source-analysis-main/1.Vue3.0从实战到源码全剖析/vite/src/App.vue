<template>
  <div>
    <vote :title="title"></vote>
  </div>
</template>

<script>
import Vote from "./components/Vote.vue";
export default {
  components: {
    vote: Vote
  },
  data() {
    return {
      title: "vue3.0好学吗？"
    };
  },
  mounted() {
    setTimeout(_ => {
      this.title = "vue还是react好？";
    }, 1000);
  }
};
</script>