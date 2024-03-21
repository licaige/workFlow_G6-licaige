<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="block">
        <h3>测试 useLocalStorageState 测试</h3>
        <div>'stateLocal - 基本数据类型' {{ stateLocal }}</div>
        <div>'stateLocal2 - 引用数据类型' {{ stateLocal2 }}</div>

        <button @click="onUseLocalStorageState">useLocalStorageState</button>
        <button @click="onUseLocalStorageStateClear">clear</button>

        <br />

        <button @click="onUseLocalStorageState2">useLocalStorageState2</button>
        <button @click="onUseLocalStorageStateParams">setter函数参数</button>
        <button @click="onUseLocalStorageStateClear2">clear</button>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../hooks/useLocalStorageState-code.md";
import { useLocalStorageState } from "../../../packages/hooks";

const [stateLocal, setStateLocal] = useLocalStorageState("local", 1);
const [stateLocal2, setStateLocal2] = useLocalStorageState("local2", { a: 10 });

const onUseLocalStorageState = () => {
  setStateLocal(2);
};
const onUseLocalStorageStateClear = () => {
  setStateLocal();
};

const onUseLocalStorageState2 = () => {
  setStateLocal2({ b: 10 });
};

const onUseLocalStorageStateParams = () => {
  setStateLocal2((preState) => {
    preState.x = 100;

    return preState;
  });
};

const onUseLocalStorageStateClear2 = () => {
  setStateLocal2();
};
</script>
