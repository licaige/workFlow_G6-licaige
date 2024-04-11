<template>
  <div class="panal">
    <div class="bg"></div>
    <ScrollBox :list="leftTypeData" :active="active" @getActive="getActive">
      
    </ScrollBox>
    <div class="right-panal">
      <legentTree :treeList="list">
      </legentTree>
    </div>
  </div>
</template>

<script>
import ScrollBox from '@/components/ScrollBox/index.vue'
import legentTree from '@/components/legentTree.vue'
export default {
  components: { ScrollBox, legentTree },

  data() {
    return {
      active: 0,
      leftTypeData: [
        {
          name: '防洪现状及能力类',
          show: true,
          isInView: false,
          children: [
            { id: 0, name: '经济社会' },
            { id: 1, name: '洪涝灾害事件' },
            { id: 2, name: '洪涝灾害损失' },
            { id: 3, name: '防洪保护区' },
            { id: 4, name: '蓄滞洪区' },
            { id: 5, name: '洪泛区' },
            { id: 6, name: '防洪城市 （镇）' },
            { id: 7, name: '水库' },
            { id: 8, name: '堤防工程' },
            { id: 9, name: '水闸工程' },
            { id: 10, name: '泵站' },
          ]
        },
        {
          name: '水帐分析类',
          show: true,
          isInView: false,
          children: [
            { id: 11, name: '设计洪水' },
            { id: 12, name: '设计暴雨' },
            { id: 13, name: '设计高潮位' },
            { id: 14, name: '测站特大洪水' },
            { id: 15, name: '设计水沙' },
          ]
        },
        {
          name: '防洪区划及防洪标准类',
          show: true,
          isInView: false,
          children: [
            { id: 16, name: '防洪保护区（规划）' },
            { id: 17, name: '蓄滞洪区（规划）' },
            { id: 18, name: '洪泛区（规划）' },
            { id: 19, name: '防洪城市（规划）' },
          ]
        },
        {
          name: '防洪目标及总体布局',
          show: true,
          isInView: false,
          children: [
            { id: 20, name: '控制节点规划成果' },
            { id: 21, name: '洪水处置方案' },
            { id: 22, name: '规划蓄滞洪区能力' },
            { id: 23, name: '河道规划行洪能力' },
          ]
        },
        {
          name: '防洪方案及措施类',
          show: true,
          isInView: false,
          children: [
            { id: 24, name: '湖泊规划成果' },
            { id: 25, name: '重点涝区规划成果' },
            { id: 26, name: '重要堤防建设' },
            { id: 27, name: '河道整治' },
            { id: 28, name: '新辟分洪通道建设' },
            { id: 29, name: '蓄滞洪区建设' },
            { id: 30, name: '洲滩民垸治理' },
            { id: 31, name: '水库建设' },
            { id: 32, name: '水闸工程建设' },
            { id: 33, name: '防洪非工程措施建设' },
            { id: 34, name: '重点涝区治理' },
          ]
        },
        {
          name: '水帐分析类2',
          show: true,
          isInView: false,
          children: [
            { id: 35, name: '设计洪水' },
            { id: 36, name: '设计暴雨' },
            { id: 37, name: '设计高潮位' },
            { id: 38, name: '测站特大洪水' },
            { id: 39, name: '设计水沙' },
          ]
        },
        {
          name: '防洪区划及防洪标准类2',
          show: true,
          isInView: false,
          children: [
            { id: 40, name: '防洪保护区（规划）' },
            { id: 41, name: '蓄滞洪区（规划）' },
            { id: 42, name: '洪泛区（规划）' },
            { id: 43, name: '防洪城市（规划）' },
          ]
        },
        {
          name: '防洪目标及总体布局2',
          show: true,
          isInView: false,
          children: [
            { id: 44, name: '控制节点规划成果' },
            { id: 45, name: '洪水处置方案' },
            { id: 46, name: '规划蓄滞洪区能力' },
            { id: 47, name: '河道规划行洪能力' },
          ]
        },
        {
          name: '防洪方案及措施类2',
          show: true,
          isInView: false,
          children: [
            { id: 48, name: '湖泊规划成果' },
            { id: 49, name: '重点涝区规划成果' },
            { id: 50, name: '重要堤防建设' },
            { id: 51, name: '河道整治' },
            { id: 52, name: '新辟分洪通道建设' },
            { id: 53, name: '蓄滞洪区建设' },
            { id: 54, name: '洲滩民垸治理' },
            { id: 55, name: '水库建设' },
            { id: 56, name: '水闸工程建设' },
            { id: 57, name: '防洪非工程措施建设' },
            { id: 58, name: '重点涝区治理' },
          ]
        },
        {
          name: '水帐分析类3',
          show: true,
          isInView: false,
          children: [
            { id: 59, name: '设计洪水' },
            { id: 60, name: '设计暴雨' },
            { id: 61, name: '设计高潮位' },
            { id: 62, name: '测站特大洪水' },
            { id: 63, name: '设计水沙' },
          ]
        },
        {
          name: '防洪区划及防洪标准类3',
          show: true,
          isInView: false,
          children: [
            { id: 64, name: '防洪保护区（规划）' },
            { id: 65, name: '蓄滞洪区（规划）' },
            { id: 66, name: '洪泛区（规划）' },
            { id: 67, name: '防洪城市（规划）' },
          ]
        },
        {
          name: '防洪目标及总体布局3',
          show: true,
          isInView: false,
          children: [
            { id: 68, name: '控制节点规划成果' },
            { id: 69, name: '洪水处置方案' },
            { id: 70, name: '规划蓄滞洪区能力' },
            { id: 71, name: '河道规划行洪能力' },
          ]
        },
        {
          name: '防洪方案及措施类3',
          show: true,
          isInView: false,
          children: [
            { id: 72, name: '湖泊规划成果' },
            { id: 73, name: '重点涝区规划成果' },
            { id: 74, name: '重要堤防建设' },
            { id: 75, name: '河道整治' },
            { id: 76, name: '新辟分洪通道建设' },
            { id: 77, name: '蓄滞洪区建设' },
            { id: 78, name: '洲滩民垸治理' },
            { id: 79, name: '水库建设' },
            { id: 80, name: '水闸工程建设' },
            { id: 81, name: '防洪非工程措施建设' },
            { id: 82, name: '重点涝区治理' },
          ]
        },
      ],
      list: [
        {
          title: "新生界",
          children: [
            {
              title: "第四系",
              children: [
                {
                  title: "全新统",
                  icon: "legent1",
                  content: "冲洪积：黏土、粉土、砂土、砂砾石等",
                },
                {
                  title: "上更新统",
                  icon: "legent2",
                  content: "冲洪积：黏土、粉土、砂土、砂砾石等",
                },
                {
                  title: "中更新统",
                  icon: "legent3",
                  content: "卵砾、棕褐色砂质黏土",
                },
              ],
            },
            {
              title: "古近系",
              children: [
                {
                  title: "始-古新统",
                  icon: "legent4",
                  content: "砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
                },
              ],
            },
          ],
        },
        {
          title: "中生界",
          children: [
            {
              title: "白垩系",
              children: [
                {
                  title: "上、下统",
                  icon: "legent5",
                  content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
                },
              ],
            },
            {
              title: "侏罗系",
              children: [
                {
                  title: "上中下统",
                  icon: "legent6",
                  content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
                },
              ],
            },
            {
              title: "三叠系",
              children: [
                {
                  title: "中统上统",
                  icon: "legent7",
                  content: "巴东组+沙镇西组：泥岩、粉砂岩、夹灰岩，局部夹煤层",
                },
                {
                  title: "下统",
                  children: [
                    {
                      title: "下统1",
                      icon: "legent8",
                      content: "嘉陵江组：白云质灰岩、灰岩",
                    },
                    {
                      title: "下统2",
                      icon: "legent9",
                      content: "大冶组：浅灰色薄层微晶灰岩，底部为黄绿色页岩",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "古生界",
          children: [
            {
              title: "二叠系",
              children: [
                {
                  title: "上、下统",
                  icon: "legent10",
                  content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
                },
              ],
            },
            {
              title: "石炭系+泥盆系",
              icon: "legent11",
              content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
            },
            {
              title: "志留系",
              icon: "legent12",
              content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
            },
            {
              title: "奥陶系",
              children: [
                {
                  title: "中统上统",
                  icon: "legent13",
                  content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
                },
                {
                  title: "下统",
                  icon: "legent14",
                  content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
                },
              ],
            },
            {
              title: "寒武系",
              children: [
                {
                  title: "中统上统",
                  icon: "legent15",
                  content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
                },
                {
                  title: "下统",
                  icon: "legent16",
                  content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
                },
              ],
            },
          ],
        },
        {
          title: "元古界",
          children: [
            {
              title: "震旦系",
              children: [
                {
                  title: "上统",
                  icon: "legent17",
                  content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
                },
                {
                  title: "下统",
                  icon: "legent18",
                  content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
                },
              ],
            },
            {
              title: "青白口系",
              children: [
                {
                  title: "耀岭河群",
                  icon: "legent19",
                  content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
                },
              ],
            },
            {
              title: "蓟县系",
              children: [
                {
                  title: "武当山群",
                  icon: "legent20",
                  content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
                },
              ],
            },
            {
              title: "神农架群",
              icon: "legent21",
              content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
            },
            {
              title: "",
              icon: "legent22",
              content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
            },
            {
              title: "",
              icon: "legent23",
              content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
            },
            {
              title: "",
              icon: "legent24",
              content: "粉砂岩、黏土质粉质砂岩夹长石石英砂岩",
            },
          ],
        },
        {
          title: "太古界",
          children: [
            {
              title: "太古界1",
              icon: "legent25",
              content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
            },
            {
              title: "太古界2",
              icon: "legent26",
              content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
            },
            {
              title: "太古界3",
              icon: "legent27",
              content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
            },
          ],
        },
        {
          title: "岩浆界",
          children: [
            {
              title: "岩浆界1",
              icon: "legent28",
              content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
            },
            {
              title: "岩浆界2",
              icon: "legent29",
              content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
            },
            {
              title: "岩浆界3",
              icon: "legent30",
              content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
            },
            {
              title: "岩浆界4",
              icon: "legent31",
              content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
            },
            {
              title: "岩浆界5",
              icon: "legent32",
              content: "长石砂岩、粘土质长石砂岩、含砾砂岩，底部为灰岩",
            },
          ],
        },
        {
          title: "",
          icon: "legent33",
          content: "分水岭线",
        },
        {
          title: "",
          icon: "legent34",
          content: "正断层",
        },
        {
          title: "",
          icon: "legent35",
          content: "逆断层",
        },
        {
          title: "",
          icon: "legent36",
          content: "平移断层",
        },
        {
          title: "",
          icon: "legent37",
          content: "向斜",
        },
        {
          title: "",
          icon: "legent38",
          content: "背斜",
        },
        {
          title: "",
          icon: "legent39",
          content: "可研推荐线路",
        },
        {
          title: "",
          icon: "legent40",
          content: "比选1线路",
        },
        {
          title: "",
          icon: "legent41",
          content: "比选2线路",
        },
      ],
    };
  },

  mounted() {
    
  },

  methods: {
    getActive(val) {
      this.active = val
    }
  },
};
</script>

<style lang="less" scoped>
.panal ::v-deep {
  height: 100%;
  width: 100%;
  // min-height: 1080px;
  // min-width: 1894px;
  & > .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.45);
    pointer-events: none;
  }
  .right-panal {
    position: absolute;
    top: 70px;
    right: 15px;
    width: 420px;
    height: calc(100% - 70px);
    padding: 0 20px;
    overflow: auto;
  }
}
</style>