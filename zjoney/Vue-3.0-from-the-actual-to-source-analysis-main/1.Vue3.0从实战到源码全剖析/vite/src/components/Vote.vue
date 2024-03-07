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
import { watchEffect, ref, reactive, toRefs, readonly, computed } from "vue";

export default {
  props: {
    title: String
  },
  // 初始化props和brforeCreate之间
  setup(props) {
    // 构建响应式数据 ref （一般处理简单值的响应式）  原理：defineProperty监听value值
    /*let state = ref({
      supNum: 0,
      oppNum: 0 
    }); */
    // let supNum = ref(0),
    //   oppNum = ref(0);

    // 响应式数据构建方案 reactive  基于Proxy对数据进行深度的监听，以此构建响应式
    let state = reactive({
      supNum: 0,
      oppNum: 0
    });
    function change(lx) {
      lx == 0 ? state.supNum++ : state.oppNum++;
    }

    // 把reactive中的每一项变为ref响应式的数据
    // console.log(toRefs(state));

    /* let xxx = reactive({
      x: 10,
      y: {
        z: 20
      }
    });
    let xxx2 = readonly(xxx);
    // console.log(xxx2.y.z);
    // xxx2.y.z = 100; //=>警告错误 */

    /*  let ratio = computed(() => {
      let total = state.supNum + state.oppNum;
      return total === 0
        ? "--"
        : ((state.supNum / total) * 100).toFixed(2) + "%";
    }); */
    // ratio.value++;

    let ratio = computed({
      get: () => {
        let total = state.supNum + state.oppNum;
        return total === 0
          ? "--"
          : ((state.supNum / total) * 100).toFixed(2) + "%";
      },
      set: val => {
        console.log(val);
      }
    });
    // ratio.value = 100;

    return {
      ...toRefs(state),
      ratio,
      change
    };
  }
};
</script>