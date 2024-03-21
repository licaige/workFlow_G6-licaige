<template>
  <Wrap :md="html">
    <template v-slot:components>
      <DvCollapse v-model="state.collapse" accordion>
        <DvCollapseItem name="1" title="这是标题1">
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
        </DvCollapseItem>
        <DvCollapseItem name="2" title="这是标题2">
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
        </DvCollapseItem>
        <DvCollapseItem name="3" title="这是标题3">
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
          <div>这是内容区域，这是内容区域</div>
        </DvCollapseItem>
      </DvCollapse>
    </template>
  </Wrap>
</template>

<script setup>
import { reactive } from "vue";
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/collapse-accordion-code.md";

const state = reactive({
  collapse: "2",
});
</script>
