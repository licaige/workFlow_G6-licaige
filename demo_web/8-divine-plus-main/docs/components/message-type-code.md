```
<template>
  <section class="block">
    <button @click="showSuccess">成功</button> &nbsp;
    <button @click="showWarning">警告</button> &nbsp;
    <button @click="showError">错误</button> &nbsp;
    <button @click="showInfo">消息</button> &nbsp;
  </section>
</template>

<script setup>

const showSuccess = () => {
  DvMessage({
    message: "this is a string options",
    type: "success",
    showClose: true,
    onClose: () => {
      console.log("close");
    },
  });
};

const showWarning = () => {
  DvMessage({
    message: "this is a string options",
    type: "warning",
    showClose: true,
    onClose: () => {
      console.log("close");
    },
  });
};

const showError = () => {
  DvMessage({
    message: "this is a string options",
    type: "error",
    showClose: true,
    onClose: () => {
      console.log("close");
    },
  });
};

const showInfo = () => {
  DvMessage({
    message: "this is a string options",
    type: "showInfo",
    showClose: true,
    onClose: () => {
      console.log("close");
    },
  });
};
</script>
```
