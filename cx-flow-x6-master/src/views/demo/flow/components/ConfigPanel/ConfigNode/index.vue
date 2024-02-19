<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane tab="节点" key="1">
      <a-row align="middle">
        <a-col :span="8">Border Color</a-col>
        <a-col :span="14">
          <a-input type="color" :value="globalGridAttr.nodeStroke" style="width: 100%" @change="onStrokeChange" />
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="8">Border Width</a-col>
        <a-col :span="12">
          <a-slider :min="1" :max="5" :step="1" :value="globalGridAttr.nodeStrokeWidth" @change="onStrokeWidthChange" />
        </a-col>
        <a-col :span="2">
          <div class="result">{{ globalGridAttr.nodeStrokeWidth }}</div>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="8">Fill</a-col>
        <a-col :span="14">
          <a-input type="color" :value="globalGridAttr.nodeFill" style="width: 100%" @change="onFillChange" />
        </a-col>
      </a-row>
    </a-tab-pane>
    <a-tab-pane tab="文本" key="2">
      <a-row align="middle">
        <a-col :span="8">Font Size</a-col>
        <a-col :span="12">
          <a-slider :min="8" :max="16" :step="1" :value="globalGridAttr.nodeFontSize" @change="onFontSizeChange" />
        </a-col>
        <a-col :span="2">
          <div class="result">{{ globalGridAttr.nodeFontSize }}</div>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="8">Font Color</a-col>
        <a-col :span="14">
          <a-input type="color" :value="globalGridAttr.nodeColor" style="width: 100%" @change="onColorChange" />
        </a-col>
      </a-row>
    </a-tab-pane>
    <a-tab-pane tab="属性" key="3">
      <a-row align="middle">
        <a-col :span="8">Assign Users</a-col>
        <a-col :span="14">
          <a-input :value="globalGridAttr.nodeUsers" style="width: 100%" @change="onUsersChange" />
        </a-col>
      </a-row>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
  import { defineComponent, inject, watch } from 'vue';
  import { Cell } from '@antv/x6';
  import { nodeOpt } from './method';

  export default defineComponent({
    name: 'Index',
    setup() {
      const globalGridAttr: any = inject('globalGridAttr');
      const id: any = inject('id');
      let curCel: Cell;
      watch(
        [() => id.value],
        () => {
          curCel = nodeOpt(id, globalGridAttr);
        },
        {
          immediate: false,
          deep: false,
        },
      );

      const onStrokeChange = (e: any) => {
        const val = e.target.value;
        globalGridAttr.nodeStroke = val;
        curCel?.attr('body/stroke', val);
      };

      const onStrokeWidthChange = (val: number) => {
        globalGridAttr.nodeStrokeWidth = val;
        curCel?.attr('body/strokeWidth', val);
      };

      const onFillChange = (e: any) => {
        const val = e.target.value;
        globalGridAttr.nodeFill = val;
        curCel?.attr('body/fill', val);
      };

      const onFontSizeChange = (val: number) => {
        globalGridAttr.nodeFontSize = val;
        curCel?.attr('text/fontSize', val);
      };

      const onColorChange = (e: any) => {
        const val = e.target.value;
        globalGridAttr.nodeColor = val;
        curCel?.attr('text/fill', val);
      };

      const onUsersChange = (e: any) => {
        const val = e.target.value;
        globalGridAttr.nodeUsers = val;
        curCel?.attr('approve/users', val);
      };

      return {
        globalGridAttr,
        onStrokeChange,
        onStrokeWidthChange,
        onFillChange,
        onFontSizeChange,
        onColorChange,
        onUsersChange,
      };
    },
  });
</script>

<style lang="less" scoped></style>
