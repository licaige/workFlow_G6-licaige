<template>
  13种内置节点和3种内置边
  <div id="container"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { Graph } from '@antv/x6';
  const insertCss = require('insert-css');
  // const insertCss = new URL('insert-css', import.meta.url).href;

  const data = {
    // 节点
    nodes: [
      {
        id: 'node1', // String，可选，节点的唯一标识
        shape: 'rect', // 使用 rect 渲染 https://x6.antv.vision/zh/examples/node/native-node#rect
        x: 100, // Number，必选，节点位置的 x 值
        y: 200, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: '矩形', // String，节点标签
      },
      {
        id: 'node2', // String，节点的唯一标识
        shape: 'ellipse', // 使用 ellipse 渲染 https://x6.antv.vision/zh/examples/node/native-node#ellipse
        x: 300, // Number，必选，节点位置的 x 值
        y: 200, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: '椭圆', // String，节点标签
      },
      {
        id: 'node3', // String，节点的唯一标识
        shape: 'circle', // 使用 circle 渲染 https://x6.antv.vision/zh/examples/node/native-node#circle
        x: 500, // Number，必选，节点位置的 x 值
        y: 200, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: '圆形', // String，节点标签
      },

      {
        id: 'node4', // String，节点的唯一标识
        shape: 'polygon', // 使用 polygon 渲染 https://x6.antv.vision/zh/examples/node/native-node#polygon
        x: 700, // Number，必选，节点位置的 x 值
        y: 200, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: '多边形', // String，节点标签
        attrs: {
          body: {
            fill: '#efdbff',
            stroke: '#9254de',
            // 指定 refPoints 属性，多边形顶点随图形大小自动缩放
            // https://x6.antv.vision/zh/docs/api/registry/attr#refpointsresetoffset
            refPoints: '0,10 10,0 20,10 10,20',
          },
        },
      },
      {
        id: 'node5', // String，节点的唯一标识
        shape: 'path', // 使用 path 渲染 https://x6.antv.vision/zh/examples/node/native-node#path
        x: 900, // Number，必选，节点位置的 x 值
        y: 200, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: '路径', // String，节点标签
        path: 'M 0 5 10 0 C 20 0 20 20 10 20 L 0 15 Z',
      },

      {
        id: 'node6', // String，节点的唯一标识
        shape: 'polyline', // 使用 polyline 渲染 https://x6.antv.vision/zh/examples/node/native-node#polyline
        x: 1100, // Number，必选，节点位置的 x 值
        y: 200, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: '折线', // String，节点标签
        points: '0,0 0,10 10,10 10,0',
      },
      {
        id: 'node7', // String，节点的唯一标识
        shape: 'cylinder', // 使用 cylinder 渲染 https://x6.antv.vision/zh/examples/node/native-node#cylinder
        x: 1300, // Number，必选，节点位置的 x 值
        y: 160, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 120, // Number，可选，节点大小的 height 值
        label: '圆柱', // String，节点标签
        attrs: {
          top: {
            fill: '#fe854f',
            fillOpacity: 0.5,
          },
          body: {
            fill: '#ED8A19',
            fillOpacity: 0.8,
          },
        },
      },

      {
        id: 'node8', // String，节点的唯一标识
        shape: 'image', // 使用 image 渲染 https://x6.antv.vision/zh/examples/node/native-node#image
        x: 1300, // Number，必选，节点位置的 x 值
        y: 400, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        imageUrl: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
      },
      {
        id: 'node9', // String，节点的唯一标识
        shape: 'image-bordered', // 使用 image-bordered 带边框的图片 https://x6.antv.vision/zh/docs/tutorial/basic/cell#%E5%86%85%E7%BD%AE%E8%8A%82%E7%82%B9
        x: 1100, // Number，必选，节点位置的 x 值
        y: 400, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        imageUrl: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
      },

      {
        id: 'node10', // String，节点的唯一标识
        shape: 'image-embedded', // 使用 image-embedded 内嵌入矩形的图片 https://x6.antv.vision/zh/docs/tutorial/basic/cell#%E5%86%85%E7%BD%AE%E8%8A%82%E7%82%B9
        x: 900, // Number，必选，节点位置的 x 值
        y: 400, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        imageUrl: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
      },

      {
        id: 'node11', // String，节点的唯一标识
        shape: 'image-inscribed', // 使用 image-inscribed 内嵌入椭圆的图片 https://x6.antv.vision/zh/docs/tutorial/basic/cell#%E5%86%85%E7%BD%AE%E8%8A%82%E7%82%B9
        x: 700, // Number，必选，节点位置的 x 值
        y: 400, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        imageUrl: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
      },
      {
        id: 'node12', // String，节点的唯一标识
        shape: 'html', // 使用 html 内嵌入椭圆的图片 https://x6.antv.vision/zh/docs/tutorial/basic/cell#%E5%86%85%E7%BD%AE%E8%8A%82%E7%82%B9
        x: 500, // Number，必选，节点位置的 x 值
        y: 400, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        html() {
          const wrap = document.createElement('div');
          // wrap.style.width = '100%'
          // wrap.style.height = '100%'
          // wrap.style.background = '#f0f0f0'
          // wrap.style.display = 'flex'
          // wrap.style.justifyContent = 'center'
          // wrap.style.alignItems = 'center'
          //
          // wrap.innerText = '我是html'

          wrap.innerHTML = `
          <a href="#" class="my-btn">
            html
          </a>`;

          return wrap;
        },
      },

      {
        id: 'node13', // String，节点的唯一标识
        shape: 'text-block', // 使用 text-block 渲染 https://x6.antv.vision/zh/examples/node/native-node#text-block
        text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
        attrs: {
          body: {
            fill: '#efdbff',
            stroke: '#9254de',
            rx: 4,
            ry: 4,
          },
        },
        x: 100, // Number，必选，节点位置的 x 值
        y: 400, // Number，必选，节点位置的 y 值
        width: 360, // Number，可选，节点大小的 width 值
        height: 120, // Number，可选，节点大小的 height 值
      },
    ],

    // 边
    edges: [
      {
        shape: 'edge', // https://x6.antv.vision/zh/docs/tutorial/basic/cell#%E5%86%85%E7%BD%AE%E8%BE%B9
        source: 'node1', // String，必须，起始节点 id
        target: 'node2', // String，必须，目标节点 id
      },
      {
        shape: 'double-edge', // https://x6.antv.vision/zh/docs/tutorial/basic/cell#%E5%86%85%E7%BD%AE%E8%BE%B9
        source: 'node2', // String，必须，起始节点 id
        target: 'node3', // String，必须，目标节点 id
      },
      {
        shape: 'shadow-edge', // https://x6.antv.vision/zh/docs/tutorial/basic/cell#%E5%86%85%E7%BD%AE%E8%BE%B9
        source: 'node3', // String，必须，起始节点 id
        target: 'node4', // String，必须，目标节点 id
      },
      {
        source: 'node4', // String，必须，起始节点 id
        target: 'node5', // String，必须，目标节点 id
      },
      {
        source: 'node5', // String，必须，起始节点 id
        target: 'node6', // String，必须，目标节点 id
      },
      {
        source: 'node6', // String，必须，起始节点 id
        target: 'node7', // String，必须，目标节点 id
      },
      {
        source: 'node7', // String，必须，起始节点 id
        target: 'node8', // String，必须，目标节点 id
      },
      {
        source: 'node8', // String，必须，起始节点 id
        target: 'node9', // String，必须，目标节点 id
      },
      {
        source: 'node9', // String，必须，起始节点 id
        target: 'node10', // String，必须，目标节点 id
      },
      {
        source: 'node10', // String，必须，起始节点 id
        target: 'node11', // String，必须，目标节点 id
      },
      {
        source: 'node11', // String，必须，起始节点 id
        target: 'node12', // String，必须，目标节点 id
      },
      {
        source: 'node12', // String，必须，起始节点 id
        target: 'node13', // String，必须，目标节点 id
      },
    ],
  };

  // 用 insert-css 协助demo演示
  // 实际项目中只要将下面样式添加到样式文件中
  // 我们用 insert-css 演示引入自定义样式
  // 推荐将样式添加到自己的样式文件中
  // 若拷贝代码，别忘了 npm install insert-css
  insertCss(`
    .my-btn{
      position: relative;
      display: inline-block;
      padding: 10px 20px;
      color: #03e9f4;
      font-size: 16px;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      transition: .3s;
      margin-top: 40px;
      letter-spacing: 3px
    }

    .my-btn:hover {
      background: #03e9f4;
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 5px #03e9f4,
                  0 0 25px #03e9f4,
                  0 0 50px #03e9f4,
                  0 0 100px #03e9f4;
    }
  `);

  export default defineComponent({
    setup() {
      let graph = {};
      onMounted(() => {
        graph = new Graph({
          container: document.getElementById('container') as HTMLElement,
          width: 2800,
          height: 600,
          autoResize: true,
          background: {
            color: '#fffbe6', // 设置画布背景颜色
          },
          grid: {
            size: 10, // 网格大小 10px
            visible: true, // 渲染网格背景
          },
        });
        (graph as any).fromJSON(data);
      });
      return {};
    },
  });
</script>

<style scoped></style>
