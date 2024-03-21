<template>
  <Wrap :md="html">
    <template v-slot:components>
      <DvCollapse v-model="state.collapse">
        <DvCollapseItem name="1" title="这是标题1">
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
        </DvCollapseItem>
        <DvCollapseItem name="2" title="这是标题2"
          >collapse-item2</DvCollapseItem
        >
        <DvCollapseItem name="3" title="这是标题3"
          >collapse-item2</DvCollapseItem
        >
      </DvCollapse>
    </template>
  </Wrap>
</template>

<script setup>
import { reactive } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/collapse-code.md";

const state = reactive({
  collapse: ["1"],
});
</script>
