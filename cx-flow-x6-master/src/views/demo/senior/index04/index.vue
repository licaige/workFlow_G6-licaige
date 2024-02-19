<template>
  <div id="container"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { Graph, Model, NodeView, Node, JQuery } from '@antv/x6';
  import { treeData } from './data';
  const Hierarchy = require('@antv/hierarchy');
  const XEUtils = require('xe-utils');

  interface HierarchyResult {
    id: number;
    x: number;
    y: number;
    children: HierarchyResult[];
  }
  export default defineComponent({
    setup() {
      let graph: Graph;

      onMounted(() => {
        graph = new Graph({
          container: document.getElementById('container') as HTMLElement,
          height: 600,
          connecting: {
            connector: 'smooth',
          },
        });
        const result = Hierarchy.mindmap(treeData, {
          direction: 'H',
          getHeight() {
            return 16;
          },
          getWidth() {
            return 16;
          },
          getHGap() {
            return 80;
          },
          getVGap() {
            return 1;
          },
          getSide: () => {
            return 'right';
          },
        });
        console.log(result);
        const model: Model.FromJSONData = { nodes: [], edges: [] };

        const traverse = (data: HierarchyResult) => {
          if (data) {
            model.nodes?.push({
              id: `${data.id}`,
              x: data.x + 250,
              y: data.y + 250,
              shape: 'circle',
              width: 16,
              height: 16,
              attrs: {
                body: {
                  fill: '#5F95FF',
                  stroke: 'transparent',
                },
              },
            });
          }
          if (data.children) {
            data.children.forEach((item: HierarchyResult) => {
              model.edges?.push({
                source: `${data.id}`,
                target: `${item.id}`,
                attrs: {
                  line: {
                    stroke: '#A2B1C3',
                    strokeWidth: 1,
                    targetMarker: null,
                  },
                },
              });
              traverse(item);
            });
          }
        };
        traverse(result);
        graph.fromJSON(model);

        graph.on(
          'node:contextmenu',
          ({ e, x, y, node, view }: { e: JQuery.MouseMoveEvent; x: number; y: number; node: Node; view: NodeView }) => {
            console.log(e);
            console.log(x);
            console.log(y);
            console.log(view);
            // console.log('父节点', node.parent);
            //
            // console.log('子节点', node.children);
            //
            // console.log('前节点', graph.getPredecessors(node));
            //
            // console.log('上面节点', graph.getNodesUnderNode(node, { by: 'corner' }));
            //
            // console.log('后续所有节点', graph.getSuccessors(node));

            // 前置节点
            const fonts = graph.getPredecessors(node, { distance: 1 });

            const peers = graph.getSuccessors(fonts[0], { distance: 1 });

            // 同级节点进行遍历
            const temp: number[] = [];
            peers.forEach((item: Node) => {
              if (item.getPosition().y < node.getPosition().y) {
                temp.push(item.getPosition().y);
              }
            });
            // 排序取最大
            let number = XEUtils.orderBy(temp, { order: 'desc' })[0];

            console.log('number', number);

            // 之前节点
            let preNodes = peers.filter((item) => (item as Node).getPosition().y === number);

            console.log('上一个节点', preNodes[0]);

            // 当前节点的y轴
            const curNodeY = node.getPosition().y;
            // 之前节点的y轴
            const preNodeY = (preNodes[0] as Node).getPosition().y;

            // 当前节点处理
            node.position(node.getPosition().x, node.getPosition().y - (curNodeY - preNodeY));
            // 当前节点的后续节点处理
            let curNodeSuccessors = graph.getSuccessors(node);
            curNodeSuccessors.forEach((item) => {
              let x = (item as Node).getPosition().x;
              let y = (item as Node).getPosition().y;
              (item as Node).position(x, y - (curNodeY - preNodeY));
            });

            // 之前节点处理
            (preNodes[0] as Node).position(
              (preNodes[0] as Node).getPosition().x,
              (preNodes[0] as Node).getPosition().y + (curNodeY - preNodeY),
            );
            // 之前节点的后续节点处理
            let preNodeSuccessors = graph.getSuccessors(preNodes[0]);
            preNodeSuccessors.forEach((item) => {
              let x = (item as Node).getPosition().x;
              let y = (item as Node).getPosition().y;
              (item as Node).position(x, y + (curNodeY - preNodeY));
            });

            let json = graph.toJSON();
            console.log(json);
            // 将json转化成符合后端的格式数据
            // 调用后端插入数据

            // (preNodes[0] as Node).position(100, 100);
            // 原始
            // let json = graph.toJSON();
            // console.log(json);

            // json.cells.forEach((item) => {
            //   // 寻找到当前节点
            //   if (item.id === node.id) {
            //     console.log('当前节点数据', item);
            //   }
            // });

            // 当前的数据
            // console.log(XEUtils.find(json.cells, (item) => item.id === node.id));

            // console.log(node.id);

            // console.log(
            //   XEUtils.findTree(treeData.children, (item) => {
            //     console.log(item);
            //     return item.id === node.id;
            //   }),
            // );

            // console.log((graph.getCellById('1-1-1') as Node).getPosition());
            // console.log((graph.getCellById('1-1-1') as Node).position(100, 100));

            // graph.fromJSON(json);
          },
        );
      });

      return {};
    },
  });
</script>

<style scoped></style>
