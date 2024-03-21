<template>
  <Wrap :md="html">
    <template v-slot:title> 分栏布局 </template>
    <template v-slot:subtitle>
      gutter表示Col的珊格间隔；span表示Col珊格占据的列数
    </template>
    <template v-slot:components>
      <section class="layout">
        <dv-row :gutter="20">
          <dv-col :span="6"><div class="grid-content bg-purple" /></dv-col>
          <dv-col :span="6"><div class="grid-content bg-purple" /></dv-col>
          <dv-col :span="6"><div class="grid-content bg-purple" /></dv-col>
          <dv-col :span="6"><div class="grid-content bg-purple" /></dv-col>
        </dv-row>
      </section>
    </template>
  </Wrap>

  <Wrap :md="htmlOffset">
    <template v-slot:title> 偏移布局 </template>
    <template v-slot:subtitle> offset 表示珊格左侧的间隔格数 </template>
    <template v-slot:components>
      <section class="layout">
        <dv-row :gutter="20">
          <dv-col :span="6"><div class="grid-content bg-purple"></div></dv-col>
          <dv-col :span="6" :offset="6">
            <div class="grid-content bg-purple"></div>
          </dv-col>
        </dv-row>
      </section>
    </template>
  </Wrap>

  <Wrap :md="htmlFlex">
    <template v-slot:title> flex布局 </template>
    <template v-slot:subtitle>
      flex表示开启flex布局； justify主轴 align副轴</template
    >
    <template v-slot:components>
      <section>
        <dv-row
          :gutter="20"
          type="flex"
          justify="end"
          align="bottom"
          class="layout-flex"
        >
          <dv-col :span="6"><div class="grid-content bg-purple"></div></dv-col>
          <dv-col :span="6"><div class="grid-content bg-purple"></div></dv-col>
        </dv-row>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/layout-gutter-span-code.md";
import { html as htmlOffset } from "../../components/layout-offset-code.md";
import { html as htmlFlex } from "../../components/layout-flex-code.md";
</script>

<style lang="scss" scoped>
.badge {
  margin-top: 30px;
}
.item {
  margin-right: 30px;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.layout-flex {
  height: 100px;
}
</style>
