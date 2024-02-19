<template>
  <div class="app">
    <div class="app-side">
      <a-card title="Settings" size="small" :bordered="false" style="width: 320px">
        <a-row align="middle">
          <a-col :span="6">Padding</a-col>
          <a-col :span="12">
            <a-slider :min="0" :max="40" :step="1" :value="padding" @change="onPaddingChanged" />
          </a-col>
          <a-col :span="1" :offset="1">
            <div class="slider-value">{{ padding }}</div>
          </a-col>
        </a-row>
        <a-row align="middle" style="border-top: 1px solid #f0f0f0">
          <a-col style="padding: 24px 0 8px 0; color: #666">
            Press and hold on{' '}
            <strong style="color: #faad14">Ctrl or Command</strong>
            key, then move the child node to remove it from it's parent node.
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="app-content" id="container"></div>
  </div>
</template>

<script lang="ts">
  import { Graph, JQuery } from '@antv/x6';
  import { defineComponent, onMounted, ref } from 'vue';

  export default defineComponent({
    setup() {
      let graph: Graph;
      const padding = ref(20);
      function onPaddingChanged(val: any) {
        padding.value = val;
      }
      onMounted(() => {
        graph = new Graph({
          container: document.getElementById('container') as HTMLElement,
          height: 600,
          background: {
            color: '#fffbe6', // 设置画布背景颜色
          },
          grid: {
            size: 10, // 网格大小 10px
            visible: true, // 渲染网格背景
          },
          embedding: {
            enabled: true,
          },
        });
        const source = graph.addNode({
          x: 80,
          y: 100,
          width: 80,
          height: 40,
          label: 'Child',
          zIndex: 10,
          attrs: {
            body: {
              stroke: 'none',
              fill: '#3199FF',
            },
            label: {
              fill: '#fff',
            },
          },
        });

        const target = graph.addNode({
          x: 280,
          y: 80,
          width: 80,
          height: 40,
          label: 'Child',
          zIndex: 10,
          attrs: {
            body: {
              stroke: 'none',
              fill: '#47C769',
            },
            label: {
              fill: '#fff',
            },
          },
        });

        const parent = graph.addNode({
          x: 40,
          y: 40,
          width: 360,
          height: 160,
          zIndex: 1,
          label: 'Parent',
          attrs: {
            body: {
              fill: '#fffbe6',
            },
          },
        });

        parent.addChild(source);
        parent.addChild(target);

        let ctrlPressed = false;
        graph.on('node:embedding', ({ e }: { e: JQuery.MouseMoveEvent }) => {
          console.log('寻找目标节点过程中触发');
          ctrlPressed = e.metaKey || e.ctrlKey;
        });
        graph.on('node:embedded', () => {
          console.log('完成节点嵌入后触发');
          ctrlPressed = false;
        });
        graph.on('node:change:size', ({ node, options }) => {
          console.log('节点大小发生变化是触发');
          if (options.skipParentHandler) {
            return;
          }
          const children = node.getChildren();
          if (children && children.length) {
            node.prop('originSize', node.getSize());
          }
        });
        graph.on('node:change:position', ({ node, options }) => {
          console.log('节点位置发生变化时触发');
          if (options.skipParentHandler || ctrlPressed) {
            return;
          }
          const children = node.getChildren();
          if (children && children.length) {
            node.prop('originPosition', node.getPosition());
          }
          const parent = node.getParent();
          if (parent && parent.isNode()) {
            let originSize = parent.prop('originSize');
            if (originSize == null) {
              originSize = parent.getSize();
              parent.prop('originSize', originSize);
            }
            let originPosition = parent.prop('originPosition');
            if (originPosition == null) {
              originPosition = parent.getPosition();
              parent.prop('originPosition', originPosition);
            }
            let x = originPosition.x;
            let y = originPosition.y;
            let cornerX = originPosition.x + originSize.width;
            let cornerY = originPosition.y + originSize.height;
            let hasChange = false;
            const children = parent.getChildren();
            if (children) {
              children.forEach((child) => {
                const bbox = child.getBBox().inflate(padding.value);
                const corner = bbox.getCorner();
                if (bbox.x < x) {
                  x = bbox.x;
                  hasChange = true;
                }
                if (bbox.y < y) {
                  y = bbox.y;
                  hasChange = true;
                }
                if (corner.x > cornerX) {
                  cornerX = corner.x;
                  hasChange = true;
                }
                if (corner.y > cornerY) {
                  cornerY = corner.y;
                  hasChange = true;
                }
              });
            }
            if (hasChange) {
              parent.prop(
                {
                  position: { x, y },
                  size: { width: cornerX - x, height: cornerY - y },
                },
                // Note that we also pass a flag so that we know we shouldn't
                // adjust the `originPosition` and `originSize` in our handlers.
                { skipParentHandler: true },
              );
            }
          }
        });
      });

      return {
        padding,
        onPaddingChanged,
      };
    },
  });
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  .app {
    font-family: sans-serif;
    display: flex;
    padding: 16px 8px;
  }

  .app-side {
    bottom: 0;
    padding: 0 8px;
  }

  .app-content {
    flex: 1;
    height: 240px;
    margin-left: 8px;
    margin-right: 8px;
    box-shadow: 0 0 10px 1px #e9e9e9;
  }

  .ant-card {
    box-shadow: 0 0 10px 1px #e9e9e9;
  }

  .ant-card-head-title {
    text-align: center;
  }

  .ant-row {
    margin: 16px 0;
    text-align: left;
  }

  .slider-value {
    background: #eee;
    color: #333333;
    padding: 3px 7px;
    border-radius: 10px;
    display: inline-block;
    font-size: 12px;
    margin-left: 8px;
    line-height: 1.25;
  }
</style>
