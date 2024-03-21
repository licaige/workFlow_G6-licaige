<template>
  <Wrap :md="html">
    <template v-slot:components>
      <h4>v-dv-fullscreen 指令 测试</h4>

      <section v-dv-fullscreen>
        <div>
          <div>这是要全屏的 内容</div>
          <div>这是要全屏的 内容</div>
          <div>这是要全屏的 内容</div>
          <div>这是要全屏的 内容</div>
          <div>这是要全屏的 内容</div>
          <div>这是要全屏的 内容</div>
          <div>这是要全屏的 内容</div>
          <div>这是要全屏的 内容</div>
          <div>这是要全屏的 内容</div>
        </div>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/fullscreen-code-directive.md";
</script>
