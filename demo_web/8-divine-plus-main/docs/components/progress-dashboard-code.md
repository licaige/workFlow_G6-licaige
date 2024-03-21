```
<template>
  <dv-progress
    type="dashboard"
    :percent="progressState.percent"
    :color="progressState.customColors"
  ></dv-progress>

  <button @click="decrease">-</button>
  <button @click="increase">+</button>
</template>

<script setup>
import { reactive } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/progress-line-inside-code.md";

const progressState = reactive({
  percent: 20,
  customColor: "#409eff",
  customColors: [
    { color: "#f56c6c", percent: 20 },
    { color: "#e6a23c", percent: 40 },
    { color: "#5cb87a", percent: 60 },
    { color: "#1989fa", percent: 80 },
    { color: "#6f7ad3", percent: 100 },
  ],
});

const increase = () => {
  progressState.percent += 10;
  if (progressState.percent > 100) {
    progressState.percent = 100;
  }
};
const decrease = () => {
  progressState.percent -= 10;
  if (progressState.percent < 0) {
    progressState.percent = 0;
  }
};
</script>
```
