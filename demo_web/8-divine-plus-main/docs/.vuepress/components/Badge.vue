<template>
  <Wrap :md="html">
    <template v-slot:components>
      <section class="badge">
        <dv-badge :value="12" class="item">
          <button size="small">评论</button>
        </dv-badge>

        <dv-badge :value="199" :max="88" class="item">
          <button size="small">评论</button>
        </dv-badge>

        <dv-badge :value="199" :max="88" isDot class="item">
          <button size="small">评论</button>
        </dv-badge>

        <dv-badge :value="199" :max="88" type="primary" class="item">
          <button size="small">评论</button>
        </dv-badge>

        <dv-badge :value="199" :max="88" type="success" class="item">
          <button size="small">评论</button>
        </dv-badge>

        <dv-badge value="文本" :max="88" type="warning" class="item">
          <button size="small">评论</button>
        </dv-badge>
      </section>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/badge-code.md";
</script>

<style lang="scss" scoped>
.badge {
  margin-top: 30px;
}
.item {
  margin-right: 30px;
}
</style>
