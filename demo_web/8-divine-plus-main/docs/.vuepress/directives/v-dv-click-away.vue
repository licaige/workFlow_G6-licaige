<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="block">
        <h3>测试 useClickAway 指令 测试</h3>
        <div>
          {{ useClickAwayState2 }}
        </div>

        <button ref="RefUseClickAway">useClickAway</button>

        <br />
        <br />
        <button ref="RefUseClickAway2">useClickAway2</button>

        <br />
        <br />
        <button v-dv-click-away="useClickAwayObj">useClickAway</button>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../directives/v-dv-click-away-code.md";
import { ref } from "vue";

const RefUseClickAway = ref();
const RefUseClickAway2 = ref();
const useClickAwayState2 = ref(1);

const useClickAwayObj = [
  () => {
    useClickAwayState2.value = useClickAwayState2.value + 1;
  },
  [RefUseClickAway, RefUseClickAway2],
  ["click", "contextmenu"],
];
</script>
