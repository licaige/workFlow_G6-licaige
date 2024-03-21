```
<template>
  <dv-progress :percent="50"></dv-progress>
  <dv-progress :percent="100" :format="format"></dv-progress>
  <dv-progress :percent="70" status="success"></dv-progress>
  <dv-progress :percent="60" status="warning"></dv-progress>
  <dv-progress :percent="50" status="error"></dv-progress>
</template>

<script setup>
const format = (percent) => {
  return percent === 100 ? "完成" : `${percent}%`;
};
</script>
```
