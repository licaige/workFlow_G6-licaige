<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane tab="线条" key="1">
      <a-row align="middle">
        <a-col :span="8">Width</a-col>
        <a-col :span="12">
          <a-slider :min="1" :max="5" :step="1" :value="globalGridAttr.strokeWidth" @change="onStrokeWidthChange" />
        </a-col>
        <a-col :span="2">
          <div class="result">{{ globalGridAttr.strokeWidth }}</div>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="8">Color</a-col>
        <a-col :span="14">
          <a-input type="color" :value="globalGridAttr.stroke" style="width: 100%" @change="onStrokeChange" />
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="8">Connector</a-col>
        <a-col :span="14">
          <a-select style="width: 100%" :value="globalGridAttr.connector" @change="onConnectorChange">
            <a-select-option value="normal">Normal</a-select-option>
            <a-select-option value="smooth">Smooth</a-select-option>
            <a-select-option value="rounded">Rounded</a-select-option>
            <a-select-option value="jumpover">Jumpover</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="8">Label</a-col>
        <a-col :span="14">
          <a-input :value="globalGridAttr.label" style="width: 100%" @change="onLabelChange" />
        </a-col>
      </a-row>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
  import FlowGraph from '../../../graph/index';
  import { Edge } from '@antv/x6';
  import { defineComponent, inject, watch } from 'vue';

  export default defineComponent({
    name: 'Index',
    setup() {
      const globalGridAttr: any = inject('globalGridAttr');

      const id: any = inject('id');

      let curCell: Edge;

      watch(
        [() => id.value],
        () => {
          const { graph } = FlowGraph;
          const cell = graph.getCellById(id.value) as Edge;
          if (!cell || !cell.isEdge()) {
            return;
          }
          curCell = cell;
          const connector = cell.getConnector() || {
            name: 'normal',
          };
          globalGridAttr.stroke = cell.attr('line/stroke');
          globalGridAttr.strokeWidth = cell.attr('line/strokeWidth');
          globalGridAttr.connector = connector.name;
          globalGridAttr.label = (cell.getLabels()[0]?.attrs as any).text.text || '';
        },
        {
          immediate: false,
          deep: false,
        },
      );

      const onStrokeWidthChange = (val: number) => {
        globalGridAttr.strokeWidth = val;
        curCell?.attr('line/strokeWidth', val);
      };

      const onStrokeChange = (e: any) => {
        const val = e.target.value;
        globalGridAttr.stroke = val;
        curCell?.attr('line/stroke', val);
      };

      const onConnectorChange = (val: string) => {
        globalGridAttr.connector = val;
        curCell?.setConnector(val);
      };

      const onLabelChange = (e: any) => {
        const val = e.target.value;
        globalGridAttr.label = val;
        curCell.setLabels([
          {
            attrs: {
              text: {
                text: val,
              },
            },
            position: {
              distance: 0.5,
            },
          },
        ]);
        // curCell.appendLabel({
        //   attrs: {
        //     text: {
        //       text: val,
        //     },
        //   },
        //   position: {
        //     distance: 0.25,
        //   },
        // })
      };

      return {
        globalGridAttr,
        onStrokeWidthChange,
        onStrokeChange,
        onConnectorChange,
        onLabelChange,
      };
    },
  });
</script>

<style lang="less" scoped></style>
