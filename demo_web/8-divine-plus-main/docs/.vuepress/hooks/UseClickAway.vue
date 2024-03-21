<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="block">
        <h3>测试 useClickAway</h3>

        <div>
          {{ count }}
        </div>
        <button ref="RefButton">useClickAway</button>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import { ref } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../hooks/useClickAway-code.md";
import { useClickAway } from "../../../packages";

const RefButton = ref();
const count = ref(0);

useClickAway(() => {
  count.value = count.value + 1;
}, RefButton);
</script>
