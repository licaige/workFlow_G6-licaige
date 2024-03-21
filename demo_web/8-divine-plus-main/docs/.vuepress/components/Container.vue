<template>
  <Wrap :md="html">
    <template v-slot:components>
      <div class="block">
        <div>Header测试</div>
        <DvContainer>
          <DvHeader class="header">header</DvHeader>
          <DvContainer>
            <DvAside class="aside">aside</DvAside>
            <DvMain class="main">main</DvMain>
          </DvContainer>
          <DvFooter class="footer">footer</DvFooter>
        </DvContainer>
      </div>
    </template>
    <template v-slot:md></template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/container-code.md";
</script>

<style lang="scss">
.header,
.footer,
.main,
.aside {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  background: #c6e2ff;
}
.footer {
  background: #c6e2ff;
}
.main {
  height: 160px;
  background: #ecf5ff;
}
.aside {
  height: 160px;
  background: #d9ecff;
}
</style>
