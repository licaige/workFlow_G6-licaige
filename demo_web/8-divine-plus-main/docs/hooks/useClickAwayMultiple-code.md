```
<template>
  <section class="block">
    <h3>测试 useClickAway</h3>

    <div>
      {{ count }}
    </div>

    <button ref="RefButton">useClickAway</button>
    <br /><br />
    <button ref="RefButton2">useClickAway2</button>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useClickAway } from "divine-plus";

const RefButton = ref();
const RefButton2 = ref();
const count = ref(0);

useClickAway(
  () => {
    count.value = count.value + 1;
  },
  [RefButton, RefButton2],
  ["click", "contextmenu"]
);
</script>
```
