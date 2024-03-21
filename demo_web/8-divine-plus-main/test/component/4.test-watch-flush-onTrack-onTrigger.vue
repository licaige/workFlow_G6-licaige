<template>
    <section class="container">
        <h4>测试 watch flush onTrack/onTrigger</h4>

        <main class="out-wrap" ref="outWrap">
            <button @click="change">点击改变count和inputValue，同时watch-count，在回调中获取input的dom，DOM是之前的值</button>

            <div>count: {{ state.count }}</div>
            <div type="text" ref="inputRef">inputValue: {{ state.inputValue }}</div>
        </main>

        <div>
            <h5>回调的触发时机</h5>
            <div>当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。</div>
            <div>默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。</div>
            <div>如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 flush: 'post' 选项：</div>
        </div>

        <div>
            <h5>侦听器调试</h5>
            <div>和 computed() 类似，侦听器也支持 onTrack 和 onTrigger 选项：</div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from "vue";

const state = reactive({
    count: 1,
    inputValue: "test",
});

const inputRef = ref<any | null>(null);

watch(
    () => state.count,
    (newV, oldV) => {
        console.log(newV, oldV);
        console.log("input-DOM是之前的值 ->", inputRef.value?.innerHTML);
    },
    {
        // flush: 'post'
        onTrack(e) {
            console.log("onTrack");
        },
        onTrigger(e) {
            console.log("onTrigger");
        },
    }
);

const change = () => {
    state.count += 1;
    state.inputValue = `changed text ${state.count} 次`;
};
</script>

<style lang="scss" scoped>
.container {
    border: 1px solid red;
    padding: 10px;
    margin: 30px 0;
}

.out-wrap {
    overflow: auto;
}
.in-wrap {
}
</style>
