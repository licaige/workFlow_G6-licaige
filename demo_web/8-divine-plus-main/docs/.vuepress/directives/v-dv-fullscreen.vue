<template>
  <Wrap :md="html">
    <template v-slot:components>
      <h4>DvFullscreen 组件 测试</h4>
      <DvFullscreen @zoomIn="zoomIn" @zoomOut="zoomOut">
        <div>
          <div>这是要全屏的 内容</div>
          <div>这是要全屏的 内容</div>
          <div>这是要全屏的 内容</div>
        </div>
      </DvFullscreen>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/fullscreen-code.md";

const zoomIn = () => {
  console.log('缩小')
}

const zoomOut = () => {
  console.log('放大')
}
</script>
