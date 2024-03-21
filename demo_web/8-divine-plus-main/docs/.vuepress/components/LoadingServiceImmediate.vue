<template>
  <Wrap :md="html">
    <template v-slot:components>
      <div>
        <button @click="onShow">显示 loading</button>
        <button @click="onHide">隐藏 loading</button>
        <div ref="refLoading">
          <p>v-loading</p>
          <p>v-loading</p>
          <p>v-loading</p>
          <p>v-loading</p>
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from "vue";
import { DvLoading } from "../../../packages/index.ts";

import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/loading-service-immediate-code.md";

const refLoading = ref();

const state = reactive({
  loadingInstance: null,
});

const instance = getCurrentInstance();

const onShow = () => {
  state.loadingInstance = DvLoading.service({
    target: refLoading.value,
    text: "loading...",
    background: "rgba(255,182,193,0.2)",
  });
};

const onHide = () => {
  state.loadingInstance.close();
};
</script>
