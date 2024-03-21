<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="block backtop dv-lazy" ref="app">
        <h4>v-lazy 测试</h4>

        <div>测试内容</div><br><br><br><br><br><br><br><br><br>
        <div>测试内容</div><br><br><br><br><br><br><br><br><br>
        <div>测试内容</div><br><br><br><br><br><br><br><br><br>
        <img alt="" width="200" height="200" v-dv-lazy="'https://api.yimian.xyz/img?type=wallpaper'" />
        <div>测试内容</div><br><br><br><br><br><br><br><br><br>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../directives/v-dv-permission-code.md";
</script>

<style >
.dv-lazy {
  height: 400px;
  overflow: auto;
}
</style>

