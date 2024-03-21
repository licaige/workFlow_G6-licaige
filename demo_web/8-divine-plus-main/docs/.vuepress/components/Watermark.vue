<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="watermark">
        <dv-watermark
          content="水印效果"
          fontsize="16px"
          fontcolor="#FFB6C1"
          z-index="1"
          gap="10"
        >
          <div style="z-index: 2; position: relative">
            <p>文字内容1</p>
            <p>文字内容2</p>
            <p>文字内容3</p>
            <p>文字内容4</p>
            <p>文字内容5</p>
          </div>
        </dv-watermark>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/watermark-text-code.md";
</script>

<style lang="scss" scoped>
.watermark {
}
</style>
