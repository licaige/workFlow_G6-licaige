<template>
  <a-button @click="test1">构造函数</a-button>
  <a-button @click="test21">test2-1：默认边</a-button>
  <a-button @click="test22">test2-2：边的再设置</a-button>
  <a-button @click="test3">边的类型</a-button>
  <a-button @click="test4">四种添加边的方式</a-button>
  <a-button @click="test5">vertices:路径点</a-button>
  <a-button @click="test6">orth:正交路由</a-button>
  <a-button @click="test7">oneSide:正交路由 'orth' 的受限版本</a-button>
  <a-button @click="test8">manhattan：曼哈顿路由</a-button>
  <a-button @click="test9">metro：地铁路由</a-button>
  <a-button @click="test10">er</a-button>
  <a-button @click="test11">自定义路由</a-button>
  <a-button @click="test12">connector：链接器——normal：默认连接器</a-button>
  <a-button @click="test13">connector：链接器——smooth：平滑连接器</a-button>
  <a-button @click="test14">connector：链接器——rounded：圆角连接器</a-button>
  <a-button @click="test15">connector：链接器——jumpover：跳线连接器</a-button>
  <a-button @click="test16">connector：链接器——自定义连接器</a-button>
  <a-button @click="busRoutes">公交路线</a-button>

  <div id="container"></div>
</template>

<script lang="ts">
  import { Graph, Shape, Point, EdgeView, Path } from '@antv/x6';
  import { defineComponent, onMounted } from 'vue';

  // 注册自定义路由
  interface RandomRouterArgs {
    bounces?: number;
  }

  function randomRouter(vertices: Point.PointLike[], args: RandomRouterArgs, view: EdgeView) {
    const bounces = args.bounces || 20;
    const points = vertices.map((p) => Point.create(p));

    for (let i = 0; i < bounces; i++) {
      const sourceCorner = view.sourceBBox.getCenter();
      const targetCorner = view.targetBBox.getCenter();
      const randomPoint = Point.random(sourceCorner.x, targetCorner.x, sourceCorner.y, targetCorner.y);
      points.push(randomPoint);
    }

    return points;
  }

  Graph.registerRouter('random', randomRouter);

  // 注册自定义链接器
  interface WobbleArgs {
    spread?: number;
    raw?: boolean;
  }
  Graph.registerConnector(
    'wobble',
    (sourcePoint, targetPoint, vertices, args: WobbleArgs) => {
      const spread = args.spread || 20;
      const points = [...vertices, targetPoint].map((p) => Point.create(p));
      let prev = Point.create(sourcePoint);
      const path = new Path();
      path.appendSegment(Path.createSegment('M', prev));

      for (let i = 0, n = points.length; i < n; i += 1) {
        const next = points[i];
        const distance = prev.distance(next);
        let d = spread;

        while (d < distance) {
          const current = prev.clone().move(next, -d);
          current.translate(Math.floor(7 * Math.random()) - 3, Math.floor(7 * Math.random()) - 3);
          path.appendSegment(Path.createSegment('L', current));
          d += spread;
        }

        path.appendSegment(Path.createSegment('L', next));
        prev = next;
      }

      return path;
    },
    true,
  );

  export default defineComponent({
    setup() {
      let graph: Graph;
      onMounted(() => {
        graph = new Graph({
          container: document.getElementById('container') as HTMLElement,
          height: 1200,
          background: {
            color: '#fffbe6', // 设置画布背景颜色
          },
          grid: {
            size: 10, // 网格大小 10px
            visible: true, // 渲染网格背景
          },
          // 当源/目标是画布上的点时，需要开启 allowBlank 选项（默认已经开启）才能生效
          connecting: {
            allowBlank: false,
          },
        });
      });

      const obj1 = {
        x: 100,
        y: 100,
        width: 80,
        height: 40,
        attrs: {
          body: {
            fill: 'blue',
          },
          label: {
            text: 'Hello',
            fill: 'white',
          },
        },
      };
      const obj2 = {
        x: 100,
        y: 300,
        width: 80,
        height: 40,
        attrs: {
          body: {
            fill: 'blue',
          },
          label: {
            text: 'World',
            fill: 'white',
          },
        },
      };
      // 构造函数创建
      const test1 = () => {
        // 创建节点
        const rect1 = new Shape.Rect(obj1);
        const rect2 = new Shape.Rect(obj2);
        graph.addNode(rect1);
        graph.addNode(rect2);
        // 创建边
        const edge = new Shape.Edge({
          source: rect1,
          target: rect2,
        });
        // 添加到画布
        graph.addEdge(edge);
      };

      // 创建节点
      const rect21 = new Shape.Rect(obj1);
      const rect22 = new Shape.Rect(obj2);
      const edge = new Shape.Edge();
      const test21 = () => {
        graph.addNode(rect21).position(200, 100);
        graph.addNode(rect22).position(200, 300);
        graph.addEdge(edge);
      };
      const test22 = () => {
        edge.setSource(rect21).setTarget(rect22);
      };

      const test3 = () => {
        // 创建节点
        const rect1 = new Shape.Rect({
          x: 300,
          y: 100,
          width: 80,
          height: 40,
          label: 'rect1',
        });
        const rect2 = new Shape.Rect({
          x: 300,
          y: 200,
          width: 80,
          height: 40,
          label: 'rect2',
        });
        graph.addNode(rect1);
        graph.addNode(rect2);
        // 官方推荐
        graph.addEdge({
          shape: 'edge', // 指定使用何种图形，默认值为 'edge' 双线边：double-edge 阴影边：shadow-edge
          source: rect1,
          target: rect2,
          label: '默认边',
        });

        const rect3 = new Shape.Rect({
          x: 300,
          y: 300,
          width: 80,
          height: 40,
          label: 'rect3',
        });
        graph.addNode(rect3);
        graph.addEdge({
          shape: 'double-edge', // 指定使用何种图形，默认值为 'edge' 双线边：double-edge 阴影边：shadow-edge
          source: rect2,
          target: rect3,
          label: '双线边',
        });

        const rect4 = new Shape.Rect({
          x: 300,
          y: 450,
          width: 80,
          height: 40,
          label: 'rect4',
        });
        graph.addNode(rect4);
        graph.addEdge({
          shape: 'shadow-edge', // 指定使用何种图形，默认值为 'edge' 双线边：double-edge 阴影边：shadow-edge
          source: rect3,
          target: rect4,
          label: '阴影边',
        });
      };
      const test4 = () => {
        // 创建节点
        const rect1 = new Shape.Rect({
          id: 'rect1',
          x: 400,
          y: 100,
          width: 80,
          height: 40,
          label: 'rect1',
        });
        graph.addNode(rect1);
        const rect2 = new Shape.Rect({
          id: 'rect2',
          x: 400,
          y: 200,
          width: 80,
          height: 40,
          label: 'rect2',
        });
        graph.addNode(rect2);
        // 第一种方式
        graph.addEdge({
          source: rect1, // 源节点
          target: rect2, // 目标节点
          label: '通过节点方式添加边',
        });
        const rect3 = new Shape.Rect({
          id: 'rect3',
          ports: [
            {
              id: 'out-port-1',
              attrs: {
                circle: {
                  r: 6,
                  magnet: true, //使链接桩在连线交互时可以被连接上
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
            },
          ],
          x: 400,
          y: 300,
          width: 80,
          height: 40,
          label: 'rect3',
        });
        graph.addNode(rect3);

        // 第二种方式
        graph.addEdge({
          source: 'rect2', // 源节点
          target: 'rect3', // 目标节点
          label: '通过节点id的方式添加边',
        });
        // 第三种方式
        const rect4 = new Shape.Rect({
          id: 'rect4',
          ports: [
            {
              id: 'in-port-1',
              attrs: {
                circle: {
                  r: 6,
                  magnet: true, //使链接桩在连线交互时可以被连接上
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
            },
          ],
          x: 400,
          y: 400,
          width: 80,
          height: 40,
          label: 'rect4',
        });
        graph.addNode(rect4);
        graph.addEdge({
          source: { cell: rect3, port: 'out-port-1' }, // 源节点和链接桩 ID
          target: { cell: 'rect4', port: 'in-port-1' }, // 目标节点 ID 和链接桩 ID
          // （当源/目标是画布上的点时，需要开启 allowBlank 选项（默认已经开启）才能生效）（画布属性）
          label: '通过链接桩的方式添加',
        });
        // 第四种方式
        graph.addEdge({
          source: 'rect4', // 源节点 ID
          target: { x: 438, y: 500 }, // 目标点
          label: 'target为坐标',
        });
      };

      const test5 = () => {
        graph.addEdge({
          source: { x: 600, y: 100 },
          target: { x: 600, y: 500 },
          // 路径点
          vertices: [
            { x: 550, y: 200 },
            { x: 550, y: 350 },
          ],
        });
      };

      const test6 = () => {
        graph.addEdge({
          source: { x: 600, y: 100 },
          target: { x: 600, y: 500 },
          // 路径点
          vertices: [
            { x: 550, y: 200 },
            { x: 550, y: 350 },
          ],
          // 1、正交路由 orth https://x6.antv.vision/zh/docs/api/registry/router#orth
          router: {
            name: 'orth',
            args: {},
          },
        });
      };

      const test7 = () => {
        graph.addEdge({
          source: { x: 600, y: 100 },
          target: { x: 600, y: 500 },
          // 不推荐路径点
          // vertices: [
          //   { x: 550, y: 200 },
          //   { x: 550, y: 350 },
          // ],
          //2、oneSide 路由是正交路由 'orth' 的受限版本，该路生成一个严格的三段路由：从起始节点的 side 侧开始，经过中间段，再从终止节点的 side 侧结束路由。需要特别注意的是，使用该路由时请不要同时指定 vertices，否则路由效果会非常差。
          router: {
            name: 'oneSide',
            args: { side: 'right' }, // 'left' | 'right' | 'top' | 'bottom'
          },
        });
      };

      const test8 = () => {
        graph.addNode({
          id: 'barrier',
          x: 700,
          y: 200,
          width: 80,
          height: 40,
          label: '障碍节点',
        });
        graph.addEdge({
          source: { x: 700, y: 100 },
          target: { x: 700, y: 500 },
          // 路径点
          // vertices: [
          //   { x: 650, y: 200 },
          //   { x: 650, y: 350 },
          // ],
          // 3、manhattan 曼哈顿路由 'manhattan' 路由是正交路由 'orth' 的智能版本，该路由由水平或垂直的正交线段组成，并自动避开路径上的其他节点（障碍）。
          router: {
            name: 'manhattan',
            // args: {
            //   startDirections: ['top'],
            //   endDirections: ['bottom'],
            // },
          },
        });
      };

      const test9 = () => {
        graph.addEdge({
          source: { x: 800, y: 100 },
          target: { x: 800, y: 500 },
          // 路径点
          vertices: [
            { x: 850, y: 200 },
            { x: 850, y: 350 },
          ],
          // 4、地铁路由 'metro' 是曼哈顿路由 manhattan 的一个变种，它由水平或垂直的正交线段和斜角线段组成，类似地铁轨道图，并自动避开路径上的其他节点（障碍）。其选项与 manhattan 路由一样，但 maxDirectionChange 的默认值为 45，表示路由线段的最大倾斜角度为 45 度。
          router: {
            name: 'metro',
            args: {
              maxDirectionChange: 100, // 默认45
              // startDirections: ['top'],
              // endDirections: ['bottom'],
            },
          },
        });
      };

      const test10 = () => {
        graph.addEdge({
          source: { x: 850, y: 100 },
          target: { x: 850, y: 500 },
          // 路径点
          vertices: [
            { x: 900, y: 200 },
            { x: 900, y: 350 },
          ],
          // 5、实体关系路由 'er' 由 Z 字形的斜角线段组成，常用于表示 ER 图中的实体之间的连线。
          router: {
            name: 'er',
            args: {
              // 路由的第一个点和最后一个点与节点之间的距离。当取值为 'center' 时，节点距离的中心作为路由点坐标。
              offset: 32,
              // 路由的第一个点和最后一个点与节点之间的最小距离。
              min: 16,
              // 路由方向，缺省时将自动选择最优方向。'T' | 'B' | 'L' | 'R' | 'H' | 'V'
              direction: undefined,
            },
          },
        });
      };

      const test11 = () => {
        graph.addEdge({
          source: { x: 900, y: 100 },
          target: { x: 900, y: 500 },
          // 路径点
          vertices: [
            { x: 950, y: 200 },
            { x: 950, y: 350 },
          ],
          // 6、自定义路由
          router: {
            name: 'random',
            args: {
              bounces: 3,
            },
          },
        });
      };

      const test12 = () => {
        graph.addEdge({
          source: { x: 1000, y: 100 },
          target: { x: 1000, y: 500 },
          vertices: [
            { x: 1050, y: 200 },
            { x: 1050, y: 300 },
          ],
          router: 'orth',
          // 系统的默认连接器，将起点、路由点、终点通过直线按顺序连接。
          connector: 'normal',
          // 或
          // connector: {
          //   name: 'normal',
          // },
        });
      };

      const test13 = () => {
        graph.addEdge({
          source: { x: 1050, y: 100 },
          target: { x: 1050, y: 500 },
          vertices: [
            { x: 1100, y: 200 },
            { x: 1100, y: 300 },
          ],
          router: 'orth',
          // 平滑连接器，通过三次贝塞尔链接起点、路由点和终点。
          connector: 'smooth',
        });
      };

      const test14 = () => {
        graph.addEdge({
          source: { x: 1100, y: 100 },
          target: { x: 1100, y: 500 },
          vertices: [
            { x: 1150, y: 200 },
            { x: 1150, y: 300 },
          ],
          router: 'orth',
          //圆角连接器，将起点、路由点、终点通过直线按顺序连接，并在线段连接处通过圆弧连接（倒圆角）。
          connector: 'rounded',
        });
      };

      const test15 = () => {
        graph.addEdge({
          source: { x: 800, y: 300 },
          target: { x: 1400, y: 300 },
          // vertices: [
          //   { x: 1150, y: 200 },
          //   { x: 1150, y: 300 },
          // ],
          router: 'orth',
          // 跳线连接器，用直线连接起点、路由点和终点，并在边与边的交叉处用跳线符号链接。
          connector: {
            name: 'jumpover',
            args: {
              type: 'arc', // 'arc' | 'gap' | 'cubic' 跳线类型。
              size: 5, // 跳线大小。
              radius: 0, // 倒角半径。
              raw: false, // 是否返回一个 Path 对象，默认值为 false 返回序列化后的字符串
            },
          },
        });
      };

      const test16 = () => {
        graph.addEdge({
          source: { x: 1200, y: 100 },
          target: { x: 1200, y: 500 },
          vertices: [
            { x: 1250, y: 200 },
            { x: 1250, y: 300 },
          ],
          router: 'orth',
          // 跳线连接器，用直线连接起点、路由点和终点，并在边与边的交叉处用跳线符号链接。
          connector: {
            name: 'wobble',
            args: { spread: 16 },
          },
        });
      };

      const busRoutes = () => {
        graph.addEdge({
          source: { x: 100, y: 50 },
          target: { x: 1400, y: 50 },
          labels: [
            {
              markup: [
                {
                  tagName: 'circle',
                  selector: 'dot',
                },
                {
                  tagName: 'text',
                  selector: 'txt',
                },
              ],
              attrs: {
                txt: {
                  fill: '#7c68fc',
                  textAnchor: 'middle',
                  textVerticalAnchor: 'middle',
                  refX: 0,
                  refY: 20,
                  text: '始发站',
                },
                dot: {
                  fill: '#fff',
                  stroke: 'red',
                  strokeWidth: 1,
                  r: 5,
                  cx: 0,
                  cy: 0,
                },
              },
              position: {
                distance: 0, // 位置
              },
            },
            {
              markup: [
                {
                  tagName: 'circle',
                  selector: 'dot',
                },
                {
                  tagName: 'text',
                  selector: 'txt',
                },
              ],
              attrs: {
                txt: {
                  fill: '#7c68fc',
                  textAnchor: 'middle',
                  textVerticalAnchor: 'middle',
                  refX: 0,
                  refY: 20,
                  text: '站点A',
                },
                dot: {
                  fill: '#fff',
                  stroke: '#000',
                  strokeWidth: 1,
                  r: 5,
                  cx: 0,
                  cy: 0,
                },
              },
              position: {
                distance: 0.2, // 位置
              },
            },
            {
              markup: [
                {
                  tagName: 'circle',
                  selector: 'dot',
                },
                {
                  tagName: 'text',
                  selector: 'txt',
                },
              ],
              attrs: {
                txt: {
                  fill: '#7c68fc',
                  textAnchor: 'middle',
                  textVerticalAnchor: 'middle',
                  refX: 0,
                  refY: 20,
                  text: '站点B（车辆当前位置）',
                },
                dot: {
                  fill: 'green',
                  stroke: '#000',
                  strokeWidth: 1,
                  r: 5,
                  cx: 0,
                  cy: 0,
                },
              },
              position: {
                distance: 0.5, // 位置
              },
            },
            {
              markup: [
                {
                  tagName: 'circle',
                  selector: 'dot',
                },
                {
                  tagName: 'text',
                  selector: 'txt',
                },
              ],
              attrs: {
                txt: {
                  fill: '#7c68fc',
                  textAnchor: 'middle',
                  textVerticalAnchor: 'middle',
                  refX: 0,
                  refY: 20,
                  text: '终点站',
                },
                dot: {
                  fill: '#fff',
                  stroke: 'red',
                  strokeWidth: 1,
                  r: 5,
                  cx: 0,
                  cy: 0,
                },
              },
              position: {
                distance: 1, // 位置
              },
            },
          ],
          attrs: {
            line: {
              sourceMarker: '',
              targetMarker: '',
            },
          },
        });
      };

      return {
        test1,
        test21,
        test22,
        test3,
        test4,
        test5,
        test6,
        test7,
        test8,
        test9,
        test10,
        test11,
        test12,
        test13,
        test14,
        test15,
        test16,
        busRoutes,
      };
    },
  });
</script>

<style scoped></style>
