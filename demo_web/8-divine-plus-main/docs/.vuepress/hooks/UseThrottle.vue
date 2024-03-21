<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="block">
        <h3>测试 useThrottle</h3>

        <div>
          {{ count }}
        </div>
        <button @click="onThrottle">useThrottle</button>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import { ref } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../hooks/useThrottle-code.md";
import { useThrottle } from "../../../packages";

const count = ref(0);

const onThrottle = useThrottle(
  () => {
    count.value++;
  },
  { delay: 1000 }
);
</script>
