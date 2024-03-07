<template>
  <div class="detailBox" v-if="title!==''">
    <!-- HEADER -->
    <header class="headerBox">
      <router-link to="/" class="back"></router-link>
      <img :src="image" alt />
      <h3>{{title}}</h3>
    </header>

    <!-- BODY -->
    <main class="mianBox" v-html="body"></main>
  </div>
</template>

<script>
import API from "../api";
import utils from "../assets/utils";
import { ref, watch, reactive, toRefs } from "vue";

export default {
  name: "Detail",
  setup() {
    let id = ref(0);
    let state = reactive({
      image: "",
      body: "",
      title: ""
    });

    // 监听它的改变 请求详细数据
    watch(id, async () => {
      let { image, body, title } = await API.zhihu.API_DETAIL(id.value);
      state.image = image;
      state.body = body;
      state.title = title;
    });

    // 返回的值挂载到this上
    return {
      id,
      ...toRefs(state)
    };
  },
  beforeMount() {
    let { id } = this.$route.params;
    this.id = id;
  }
};
</script>

<style lang="less" scoped>
@A: #aaa;

.headerBox {
  position: relative;
  height: 6rem;
  background: lighten(@A, 20%);

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  h3 {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 0.2rem;
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    color: #fff;
    font-size: 0.4rem;
    background: rgba(0, 0, 0, 0.7);
    background: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.7)
    );

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .back {
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    box-sizing: border-box;
    width: 0.4rem;
    height: 0.4rem;
    border-left: 0.06rem solid #fff;
    border-top: 0.06rem solid #fff;
    transform: rotate(-45deg);
  }
}
</style>