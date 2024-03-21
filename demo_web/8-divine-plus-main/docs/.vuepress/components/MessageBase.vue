<template>
  <Wrap :md="html">
    <template v-slot:components>
      <h4>Message 测试</h4>
      <button @click="showMessage">基本用法</button> &nbsp;
      <button @click="showMessagePrototype">$message方式调用</button> &nbsp;
      <button @click="showMessageCustom">不会消失，需要手动关系</button> &nbsp;
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/message-base-code.md";

import { DvMessage } from "../../../packages/index";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();

const showMessage = () => {
  DvMessage({
    message: "this is a string options",
    showClose: true,
    type: "success",
    duration: 1000,
    onClose: () => {
      console.log("close");
    },
  });
};

const showMessagePrototype = () => {
  instance.appContext.config.globalProperties.$message("good");
};

const showMessageCustom = () => {
  DvMessage({
    message: "this is a string options",
    showClose: true,
    type: "success",
    duration: 0,
    onClose: () => {
      console.log("close");
    },
  });
};
</script>

<style lang="scss" scoped></style>
