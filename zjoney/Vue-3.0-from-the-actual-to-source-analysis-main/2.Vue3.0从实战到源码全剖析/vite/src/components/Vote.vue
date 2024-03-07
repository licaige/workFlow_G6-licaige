<template>
  <div>
    <h3>{{title}}</h3>
    <p>支持人数:{{supNum}}</p>
    <p>反对人数:{{oppNum}}</p>
    <p>支持率:{{ratio}}</p>
    <button @click="change(0)">支持</button>
    <button @click="change(1)">反对</button>
  </div>
</template>

<script>
import {
  watchEffect,
  ref,
  reactive,
  toRefs,
  readonly,
  computed,
  watch
} from "vue";

export default {
  props: {
    title: String
  },
  setup(props) {
    let state = reactive({
      supNum: 0,
      oppNum: 0
    });

    /* watchEffect(() => {
      console.log("状态是:" + state.supNum);
    }); */

    /* watch(
      () => state.supNum,
      () => {
        console.log("状态是:" + state.supNum);
      }
    ); */

    /* let x = ref(0),
      y = ref(0); */
    /* watch(x, (x, prevX) => {
      console.log(x, prevX);
    }); */
    /* watch([x, y], ([x, y], [prevX, prevY]) => {
      console.log(x, prevX);
    }); */

    function change(lx) {
      lx == 0 ? state.supNum++ : state.oppNum++;
      // x.value++;
    }

    /* let ratio = computed(() => {
      let total = state.supNum + state.oppNum;
      return total === 0
        ? "--"
        : ((state.supNum / total) * 100).toFixed(2) + "%";
    }); */

    let ratio = ref("--");
    /* watch(state, state => {
      let total = state.supNum + state.oppNum;
      ratio.value =
        total === 0 ? "--" : ((state.supNum / total) * 100).toFixed(2) + "%";
    }); */
    watchEffect(() => {
      let total = state.supNum + state.oppNum;
      ratio.value =
        total === 0 ? "--" : ((state.supNum / total) * 100).toFixed(2) + "%";
    });

    return {
      ...toRefs(state),
      ratio,
      change
    };
  }
};
</script>