<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="watermark">
        <dv-watermark
          :imgSrc="icon2"
          imgWidth="40"
          imgHeight="40"
          z-index="1"
          gap="60"
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
import { html } from "../../components/watermark-img-code.md";
import icon2 from "../../../examples/images/2.png";
</script>

<style lang="scss" scoped>
.watermark {
}
</style>
