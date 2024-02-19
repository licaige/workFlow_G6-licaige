<script setup lang="ts">
import { onMounted } from 'vue';

// import { ref } from 'vue'
 // 扩展了节点、边的G6
import G6, { ShapeStyle } from '@antv/g6'
// import * as G6Util from '@antv/util'
import { TREELIST } from '../data/treeList';
interface LeftIcon {
  style: ShapeStyle,
  img:''
}
const props = defineProps<{ msg: string }>()
const initData = {
  // 点集
  nodes: [
    {
      id: 'node1', // 节点的唯一标识
      // type: 'rect',
      size: [110, 40],
      x: 100, // 节点横坐标
      y: 200, // 节点纵坐标
      label: '开始', // 节点文本
    },
    {
      id: 'node2', // 节点的唯一标识
      // type: 'rect',
      size: [110, 40],
      x: 250, // 节点横坐标
      y: 200, // 节点纵坐标
      label: '发起评审', // 节点文本
    },
    {
      id: 'node3', // 节点的唯一标识
      // type: 'rect',
      size: [110, 40],
      x: 400, // 节点横坐标
      y: 200, // 节点纵坐标
      label: '产品评审', // 节点文本
    },
    {
      id: 'node4-1',
      // type: 'rect',
      size: [110, 40],
      x: 550,
      y: 50,
      label: '埋点设计',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node4-2',
      // type: 'rect',
      size: [110, 40],
      x: 550,
      y: 150,
      label: 'AB方案设计',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node4-3',
      // type: 'rect',
      size: [110, 40],
      x: 550,
      y: 250,
      label: 'UE设计',
    },
    {
      id: 'node4-4',
      // type: 'rect',
      size: [110, 40],
      x: 550,
      y: 350,
      label: '文案确认',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node5',
      // type: 'rect',      size: [110, 40],
      x: 700,
      y: 200,
      label: 'UI UX设计',
    },
    {
      id: 'node6',
      // type: 'rect',
      size: [110, 40],
      x: 850,
      y: 200,
      label: '技术评审',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node7-1',
      // type: 'rect',
      size: [130, 40],
      x: 1010,
      y: 50,
      label: 'iOS估分排期',
    },
    {
      id: 'node7-2',
      // type: 'rect',
      size: [130, 40],
      x: 1010,
      y: 150,
      label: 'Android估分排期',
    },
    {
      id: 'node7-3',
      // type: 'rect',
      size: [130, 40],
      x: 1010,
      y: 250,
      label: 'Server估分排期',
    },
    {
      id: 'node7-4',
      // type: 'rect',
      size: [130, 40],
      x: 1010,
      y: 350,
      label: 'FE估分排期',
    },
    {
      id: 'node8-1',
      // type: 'rect',
      size: [110, 40],
      x: 1180,
      y: 50,
      label: 'iOS开发',
    },
    {
      id: 'node8-2',
      // type: 'rect',
      size: [110, 40],
      x: 1180,
      y: 150,
      label: 'Android开发',
    },
    {
      id: 'node8-3',
      // type: 'rect',
      size: [110, 40],
      x: 1180,
      y: 250,
      label: 'Server开发',
    },
    {
      id: 'node8-4',
      // type: 'rect',
      size: [110, 40],
      x: 1180,
      y: 350,
      label: 'FE开发',
    },
    {
      id: 'node9',
      // type: 'rect',
      size: [110, 40],
      x: 1330,
      y: 200,
      label: '提测QA',
    },
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: 'node1', // 起始点 id
      target: 'node2', // 目标点 id
      label: '', // 边的文本
      type: 'line'
    },
    {
      source: 'node2', // 起始点 id
      target: 'node3', // 目标点 id
      label: '', // 边的文本
      type: 'line'
    },
    {
      source: 'node3', // 起始点 id
      target: 'node4-1', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node3', // 起始点 id
      target: 'node4-2', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node3', // 起始点 id
      target: 'node4-3', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node3', // 起始点 id
      target: 'node4-4', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node4-3', // 起始点 id
      target: 'node5', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node4-1', // 起始点 id
      target: 'node6', // 目标点 id
      label: '', // 边的文本
      type: 'h-hc',
    },
    {
      source: 'node4-2', // 起始点 id
      target: 'node6', // 目标点 id
      label: '', // 边的文本
      type: 'h-hc',
    },
    {
      source: 'node5', // 起始点 id
      target: 'node6', // 目标点 id
      label: '', // 边的文本
      type: 'line'
    },
    {
      source: 'node4-4', // 起始点 id
      target: 'node6', // 目标点 id
      label: '', // 边的文本
      type: 'h-hc'
    },
    {
      source: 'node6', // 起始点 id
      target: 'node7-1', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node6', // 起始点 id
      target: 'node7-2', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node6', // 起始点 id
      target: 'node7-3', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node6', // 起始点 id
      target: 'node7-4', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node7-1', // 起始点 id
      target: 'node8-3', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node7-2', // 起始点 id
      target: 'node8-1', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node7-3', // 起始点 id
      target: 'node8-4', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node7-4', // 起始点 id
      target: 'node8-2', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node8-1', // 起始点 id
      target: 'node9', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node8-2', // 起始点 id
      target: 'node9', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node8-3', // 起始点 id
      target: 'node9', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
    {
      source: 'node8-4', // 起始点 id
      target: 'node9', // 目标点 id
      label: '', // 边的文本
      type: 'cubic-horizontal'
    },
  ],
};
const defaultLabelCfg = {
    style: {
      fill: '#000',
      fontSize: 12,
    },
  };
onMounted(() => {
  console.log('mounted')
  G6.Util.traverseTree(initData, (d) => {
    d.leftIcon = {
      style: {
        fill: '#e6fffb',
        stroke: '#e6fffb',
      },
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ',
    };
    return true;
  });
  // 水平直线horizon 水平贝塞尔曲线 horizon cubic
  G6.registerEdge('h-hc', {
    draw(cfg, group) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      const shape = group.addShape('path', {
        attrs: {
          stroke: '#86909c',
          lineWidth: 1,
          path: [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x + 40 + 110, startPoint.y],
            ['C', startPoint.x + 40 + 110 + 10, startPoint.y, endPoint.x - 10, endPoint.y, endPoint.x, endPoint.y],
          ],
        },
        // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
        name: 'path-shape',
      });
      return shape;
    },
  });

  G6.registerNode('project-node',{
    options: {
      size: [110, 40],
    },
    draw(cfg, group) {
        const styles = this.getShapeStyle(cfg);
        const { labelCfg = {} } = cfg;

        const w = styles.width;
        const h = styles.height;

        const keyShape = group.addShape('rect', {
          attrs: {
            ...styles,
            // x: -w / 2,
            // y: -h / 2,
          },
        });

        /**
         * leftIcon 格式如下：
         *  {
         *    style: ShapeStyle;
         *    img: ''
         *  }
         */

        // group.addShape('rect', {
        //   attrs: {
        //     x: 1 - w / 2,
        //     y: 1 - h / 2,
        //     width: 38,
        //     height: styles.height - 2,
        //     fill: '#8c8c8c',
        //     ...style,
        //   },
        // });

        group.addShape('image', {
          attrs: {
            x: 8 - w / 2,
            y: 8 - h / 2,
            width: 24,
            height: 24,
            img: 'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png',
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: 'image-shape',
        });
        

        if (cfg.label) {
          group.addShape('text', {
            attrs: {
              ...labelCfg.style,
              text: cfg.label,
              x: 35 - w / 2,
              y: 25 - h / 2,
            },
          });
        }

        return keyShape;
      },
      update: undefined,
  },'rect')
  const graph = new G6.Graph({
    container: 'mountNode',
    width: 1500,
    height: 1600,
    defaultNode: {
      type: 'project-node',
      style: {
        fill: '#bae637',
        // stroke: '#eaff8f',
        // lineWidth: 5,
        radius: 6,
      },
      labelCfg: defaultLabelCfg,
    },
    defaultEdge: {
    // ... 其他属性
      style: {
        stroke: '#86909c',
        lineWidth: 1,
        // ... 其他样式属性
      },
    },
  });
  graph.data(initData);
  graph.render();
})
</script>

<template>
  <div id="mountNode"></div>
</template>

<style scoped>

</style>
