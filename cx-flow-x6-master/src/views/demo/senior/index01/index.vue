<template>
  <a-button @click="test1">心凌vue组件</a-button>
  <a-button @click="toJSON">toJSON</a-button>
  <a-button @click="fromJSON">fromJSON</a-button>
  <div id="container"></div>
</template>

<script lang="ts">
  import { Graph } from '@antv/x6'; // Node
  import { defineComponent, onMounted } from 'vue'; //  ref, inject

  import '@antv/x6-vue-shape';

  // import { Card  } from 'ant-design-vue';
  import Cyndi from './Cyndi.vue';

  // 第一种写法
  // Graph.registerNode("cyndi-shape", {
  //   inherit: "vue-shape",
  //   x: 200,
  //   y: 150,
  //   width: 250,
  //   height: 130,
  //   component: {
  //     template: `
  //       <a-card hoverable style="width: 240px">
  //         <template #cover>
  //           <img alt="example" :src="url" />
  //         </template>
  //         {{ title + "-" +context }}
  //       </a-card>
  //     `,
  //     components: {
  //       ACard: Card
  //     },
  //     setup() {
  //       const title = ref("默认标题")
  //       const context = ref("默认内容")
  //       const url = ref("https://wx4.sinaimg.cn/mw2000/91f7624dly1h2jgtp0mdlj20qo0va78p.jpg")
  //       onMounted(() => {
  //         const getNode: Function| undefined = inject<Function>("getNode");
  //         const node: Node = getNode?.()
  //         title.value = node?.data?.title
  //         context.value = node?.data?.context
  //         url.value = node?.data?.url
  //         // 监听数据改变事件
  //         node?.on("change:data", ({ current }) => {
  //           title.value = current.title;
  //         });
  //       })
  //       return {
  //         url,
  //         title,
  //         context
  //       };
  //     },
  //   },
  // });

  // 第二种封装抽离写法
  Graph.registerNode('cyndi-shape', {
    inherit: 'vue-shape',
    x: 200,
    y: 150,
    width: 250,
    height: 130,
    component: {
      template: `
      <cyndi/>
    `,
      components: {
        Cyndi: Cyndi,
      },
    },
  });

  export default defineComponent({
    setup() {
      let graph: Graph;

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
          // 当源/目标是画布上的点时，需要开启 allowBlank 选项（默认已经开启）才能生效
          connecting: {
            allowBlank: false,
          },
        });
      });

      const toJSON = () => {
        const json = graph.toJSON();
        console.log(json);
      };
      const fromJSON = () => {
        const json = {
          cells: [
            {
              position: {
                x: 10,
                y: 100,
              },
              size: {
                width: 250,
                height: 130,
              },
              view: 'vue-shape-view',
              shape: 'cyndi-shape',
              component: {
                template: '\n      <cyndi/>\n    ',
                components: {
                  Cyndi: {
                    name: 'Cyndi',
                    components: {
                      ACard: {
                        name: 'ACard',
                        mixins: [
                          {
                            methods: {},
                          },
                        ],
                        props: {
                          prefixCls: {
                            '0': false,
                            '1': true,
                          },
                          title: {
                            '0': false,
                            '1': true,
                            type: null,
                          },
                          extra: {
                            '0': false,
                            '1': true,
                            type: null,
                          },
                          bordered: {
                            '0': true,
                            '1': true,
                            default: true,
                          },
                          bodyStyle: {
                            '0': false,
                            '1': true,
                            type: [null, null],
                          },
                          headStyle: {
                            '0': false,
                            '1': true,
                            type: [null, null],
                          },
                          loading: {
                            '0': true,
                            '1': true,
                            default: false,
                          },
                          hoverable: {
                            '0': true,
                            '1': true,
                            default: false,
                          },
                          type: {
                            '0': false,
                            '1': true,
                          },
                          size: {
                            '0': false,
                            '1': true,
                            type: [null],
                          },
                          actions: {
                            '0': false,
                            '1': true,
                            type: null,
                          },
                          tabList: {
                            '0': false,
                            '1': true,
                          },
                          tabBarExtraContent: {
                            '0': false,
                            '1': true,
                            type: null,
                          },
                          activeTabKey: {
                            '0': false,
                            '1': true,
                          },
                          defaultActiveTabKey: {
                            '0': false,
                            '1': true,
                          },
                          cover: {
                            '0': false,
                            '1': true,
                            type: null,
                          },
                          onTabChange: {
                            '0': false,
                            '1': true,
                          },
                        },
                        methods: {},
                        Meta: {
                          name: 'ACardMeta',
                          props: {
                            prefixCls: {},
                            title: {
                              type: null,
                            },
                            description: {
                              type: null,
                            },
                            avatar: {
                              type: null,
                            },
                          },
                        },
                        Grid: {
                          name: 'ACardGrid',
                          __ANT_CARD_GRID: true,
                          props: {
                            prefixCls: {},
                            hoverable: {},
                          },
                        },
                      },
                    },
                    __hmrId: 'ea2ff248',
                    __file: 'src/views/senior/index01/Cyndi.vue',
                  },
                },
              },
              id: '27abdd0c-f282-4b4b-8a24-49ea7ed6ec68',
              zIndex: 10,
              data: {
                url: 'https://wx3.sinaimg.cn/mw2000/6d73d730ly1h2i6314id6j20u016fjys.jpg',
                title: '王心凌（Cyndi Wang）',
                context: '1982年9月5日出生于中国台湾省新竹县，中国台湾女歌手、演员。',
              },
            },
          ],
        };
        graph.fromJSON(json);
      };

      const test1 = () => {
        graph.addNode({
          x: 10,
          y: 100,
          zIndex: 10,
          shape: 'cyndi-shape',
          data: {
            url: 'https://wx3.sinaimg.cn/mw2000/6d73d730ly1h2i6314id6j20u016fjys.jpg',
            title: '王心凌（Cyndi Wang）',
            context: '1982年9月5日出生于中国台湾省新竹县，中国台湾女歌手、演员。',
          },
        });
      };
      return {
        test1,
        toJSON,
        fromJSON,
      };
    },
  });
</script>

<style scoped></style>
