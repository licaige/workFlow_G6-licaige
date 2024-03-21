<template>
  <Wrap :md="html">
    <template v-slot:components>
      <dv-timeline>
        <dv-timeline-item timestamp="2022-01-11">内容1</dv-timeline-item>
        <dv-timeline-item timestamp="2022-02-22" type="primary"
          >内容2</dv-timeline-item
        >
        <dv-timeline-item timestamp="2022-02-22" type="success"
          >内容3</dv-timeline-item
        >
        <dv-timeline-item timestamp="2022-02-22" type="warning"
          >内容4</dv-timeline-item
        >
        <dv-timeline-item timestamp="2022-02-22" type="danger"
          >内容5</dv-timeline-item
        >
        <dv-timeline-item timestamp="2022-02-22" type="info"
          >内容6</dv-timeline-item
        >
        <dv-timeline-item timestamp="2022-02-22" type="primary" position="top"
          >内容7 - 时间戳在上面</dv-timeline-item
        >
        <dv-timeline-item timestamp="2022-02-22" type="primary" position="top">
          <div>内容8 - 自定义dot插槽</div>
          <template #dot>
            <div style="width: 14px; height: 14px; background: red"></div>
          </template>
        </dv-timeline-item>
        <dv-timeline-item
          timestamp="2022-02-22"
          type="primary"
          position="top"
          hideTimestamp
        >
          <div>内容9 - 不显示时间戳</div>
        </dv-timeline-item>
      </dv-timeline>
    </template>
  </Wrap>
</template>

<script setup>
import Wrap from "../theme/ComponentWrap.vue";
import { html } from "../../components/timeline-code.md";
</script>

<style lang="scss" scoped></style>
