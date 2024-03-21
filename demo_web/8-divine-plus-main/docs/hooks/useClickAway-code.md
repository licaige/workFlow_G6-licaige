```
<template>
  <section class="block">
    <h3>测试 useClickAway</h3>
    <button ref="RefButton">useClickAway</button>

    {{ count }}
  </section>
</template>

<script setup>
import { ref } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../hooks/useClickAway-code.md";
import { useClickAway } from "divine-plus";

const RefButton = ref();
const count = ref(0);

useClickAway(() => {
  count.value = count.value + 1;
}, RefButton);
</script>
```
