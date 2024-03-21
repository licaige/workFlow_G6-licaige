<template>
  <Wrap :md="html">
    <template v-slot:components>
      <h4>Message 测试</h4>
      <button @click="showSuccess">成功</button> &nbsp;
      <button @click="showWarning">警告</button> &nbsp;
      <button @click="showError">错误</button> &nbsp;
      <button @click="showInfo">消息</button> &nbsp;
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/message-type-code.md";
import { DvMessage } from "../../../packages/index";

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

<style lang="scss" scoped></style>
