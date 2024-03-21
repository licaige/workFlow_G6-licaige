<template>
  <!-- 第一个根节点 -->
  <div class="app">
    <section class="block">
      <h4>Divider测试</h4>
      <DvDivider direction="horizontal" style="width: auto">
        <template v-slot:default>center</template>
      </DvDivider>
      <DvDivider
        direction="horizontal"
        contentPosition="left"
        borderStyle="dashed"
        style="width: auto"
      >
        <template v-slot:default>left</template>
      </DvDivider>
      <DvDivider
        direction="horizontal"
        contentPosition="right"
        style="width: auto"
      >
        <template v-slot:default>right</template>
      </DvDivider>
      <div>divider测试</div>
    </section>

    <section class="block">
      <h4>Breadcrumb测试</h4>
      <DvBreadcrumb separator-icon="youjiantou">
        <DvBreadcrumbItem :to="{ path: '/home' }">主页</DvBreadcrumbItem>
        <DvBreadcrumbItem><a href="/">列表</a></DvBreadcrumbItem>
        <DvBreadcrumbItem>详情</DvBreadcrumbItem>
      </DvBreadcrumb>
      <DvBreadcrumb style="margin-top: 18px">
        <DvBreadcrumbItem :to="{ path: '/home' }">主页</DvBreadcrumbItem>
        <DvBreadcrumbItem><a href="/">列表</a></DvBreadcrumbItem>
        <DvBreadcrumbItem>详情</DvBreadcrumbItem>
      </DvBreadcrumb>
    </section>

    <section class="block">
      <h4>Container, Header, Aside, Main 测试</h4>
      <DvContainer>
        <DvHeader class="header">header</DvHeader>
        <DvContainer>
          <DvAside class="aside">aside</DvAside>
          <DvMain class="main">main</DvMain>
        </DvContainer>
        <DvFooter class="footer">footer</DvFooter>
      </DvContainer>
    </section>

    <section class="block">
      <h4>Row,Col 测试</h4>
      <dv-row :gutter="20" class="layout-flex">
        <dv-col :span="6">
          <div class="grid-content bg-purple" />
        </dv-col>
        <dv-col :span="6">
          <div class="grid-content bg-purple" />
        </dv-col>
        <dv-col :span="6">
          <div class="grid-content bg-purple" />
        </dv-col>
        <dv-col :span="6">
          <div class="grid-content bg-purple" />
        </dv-col>
      </dv-row>
    </section>

    <section class="block">
      <h4>Badge 测试</h4>
      <dv-badge :value="12" class="item">
        <button size="small">评论</button>
      </dv-badge>
      <dv-badge :value="199" :max="88" class="item">
        <button size="small">评论</button>
      </dv-badge>
      <dv-badge :value="199" :max="88" isDot class="item">
        <button size="small">评论</button>
      </dv-badge>
      <dv-badge :value="199" :max="88" type="primary" class="item">
        <button size="small">评论</button>
      </dv-badge>
      <dv-badge :value="199" :max="88" type="success" class="item">
        <button size="small">评论</button>
      </dv-badge>
      <dv-badge value="文本" :max="88" type="warning" class="item">
        <button size="small">评论</button>
      </dv-badge>
    </section>

    <section class="block">
      <h4>Tag 测试</h4>

      <dv-tag class="dvTagStyle">标签一</dv-tag>
      <dv-tag type="success" class="dvTagStyle">标签二</dv-tag>
      <dv-tag type="info" class="dvTagStyle">标签三</dv-tag>
      <dv-tag type="warning" class="dvTagStyle">标签四</dv-tag>
      <dv-tag
        type="danger"
        closable
        class="dvTagStyle"
        @close="onOff"
        v-if="!off"
        >可关闭</dv-tag
      >
      <dv-tag type="primary" backgroundColor="black" class="dvTagStyle"
        >自定义背景颜色</dv-tag
      >
      <dv-tag type="success" class="dvTagStyle" hit>是否带有边框描边</dv-tag>
      <dv-tag type="success" class="dvTagStyle" hit size="small"
        >size/small</dv-tag
      >

      <div style="margin: 20px 0">
        <dv-tag type="success" class="dvTagStyle" theme="dark"
          >主题/dark</dv-tag
        >
        <dv-tag type="success" class="dvTagStyle" them="plain"
          >主题/plain</dv-tag
        >
      </div>
    </section>

    <section class="block backtop" ref="app">
      <h4 class="backtop-title">Backtop 测试</h4>
      <p>向下滚动试试</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <dv-backtop :target="app"></dv-backtop>
    </section>

    <section class="block">
      <h4>Empty 测试</h4>
      <dv-empty description="description" />
      <dv-empty :image-size="40" description="description" />
    </section>

    <section class="block">
      <h4>Watermark 测试</h4>

      <dv-watermark
        content="水印效果"
        fontsize="20px"
        fontcolor="#FFB6C1"
        z-index="-1"
        gap="20"
        :imgSrc="icon2"
        imgWidth="10"
        imgHeight="10"
      >
        <div>
          <p>文字内容1</p>
          <p>文字内容3</p>
          <button>button还能点击吗</button>
        </div>
      </dv-watermark>
    </section>

    <section class="block">
      <h4>Timeline 测试</h4>

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
    </section>

    <section class="block">
      <h4>Message 测试</h4>
      <button @click="showMessage">触发Message</button>
      <div style="font-size: 20px">
        <!-- 由于SVG图标默认不携带任何属性 -->
        <!-- 你需要直接提供它们 -->
        <!-- <Edit style="width: 1em; height: 1em; margin-right: 8px" />
        <Share style="width: 1em; height: 1em; margin-right: 8px" />
        <Delete style="width: 1em; height: 1em; margin-right: 8px" />
        <Search style="width: 1em; height: 1em; margin-right: 8px" /> -->
      </div>
    </section>

    <section class="block">
      <h4>Scrollbar 测试</h4>
      <dv-scrollbar
        height="300"
        style="background: yellow"
        :native="false"
        :barStyle="{
          height: '130px',
          width: '8px',
          background: 'red',
        }"
        showHorizontalBar
      >
        <div v-for="value in 40" style="width: 900px">
          测试scrollbar测试scrollbar测试scrollbar测试scrollbar测试scrollbar测试scrollbar测试scrollbar测试scrollbar测试scrollbar测试scrollbar
        </div>
      </dv-scrollbar>
    </section>

    <section class="block">
      <h4>v-loading 测试</h4>
      <div
        v-loading="state.loading"
        dv-loading-text="Loading"
        dv-loading-background-color="rgba(255,182,193,0.2)"
      >
        <p>v-loading</p>
        <p>v-loading</p>
        <p>v-loading</p>
        <p>v-loading</p>
      </div>

      <div>
        <button @click="onShow">show loading</button>
        <button @click="onHide">hide loading</button>
        <div ref="refLoading">
          <p>v-loading</p>
          <p>v-loading</p>
          <p>v-loading</p>
          <p>v-loading</p>
        </div>
      </div>
    </section>

    <section class="block">
      <h4>Collapse 测试</h4>
      <DvCollapse v-model="state.collapse" accordion>
        <DvCollapseItem name="1" title="collapse-item1">
          <div>collapse-item</div>
          <div>collapse-item</div>
          <div>collapse-item</div>
          <div>collapse-item</div>
        </DvCollapseItem>
        <DvCollapseItem name="2" title="collapse-item2"
          >collapse-item2</DvCollapseItem
        >
        <DvCollapseItem name="3" title="collapse-item3"
          >collapse-item2</DvCollapseItem
        >
      </DvCollapse>
    </section>

    <section class="block">
      <h4>Progress 测试</h4>
      <dv-progress :percent="50"></dv-progress>
      <dv-progress :percent="100" :format="format"></dv-progress>
      <dv-progress :percent="80" status="success"></dv-progress>
      <dv-progress :percent="60" status="warning"></dv-progress>
      <dv-progress :percent="50" status="error"></dv-progress>

      <br />

      <dv-progress
        :text-inside="true"
        :stroke-width="26"
        :percent="60"
      ></dv-progress>
      <dv-progress
        :text-inside="true"
        :stroke-width="24"
        :percent="100"
        status="success"
      ></dv-progress>
      <dv-progress
        :text-inside="true"
        :stroke-width="22"
        :percent="80"
        status="warning"
      ></dv-progress>
      <dv-progress
        :text-inside="true"
        :stroke-width="20"
        :percent="30"
        status="error"
      ></dv-progress>

      <br />

      <dv-progress type="circle" :percent="25"></dv-progress>
      <dv-progress
        type="circle"
        :percent="25"
        backColor="black"
        textColor="red"
      ></dv-progress>
      <dv-progress type="circle" :percent="100" status="success"></dv-progress>

      <br />

      <dv-progress
        :percent="progressState.percent"
        :color="progressState.customColor"
      ></dv-progress>
      <dv-progress
        :percent="progressState.percent"
        :color="customColorMethod"
      ></dv-progress>
      <dv-progress
        :percent="progressState.percent"
        :color="progressState.customColors"
      ></dv-progress>
      <button @click="decrease">-</button>
      <button @click="increase">+</button>

      <br />

      <dv-progress
        type="dashboard"
        :percent="progressState.percent"
        :color="progressState.customColors"
      ></dv-progress>
      <button @click="decrease">-</button>
      <button @click="increase">+</button>
    </section>

    <section class="block">
      <h4>DvFullscreen 组件 测试</h4>
      <DvFullscreen>
        <div>
          <h1>这是要全屏的 标题</h1>
          <div>这是要全屏的 内容</div>
        </div>
      </DvFullscreen>
    </section>

    <section class="block" v-dv-fullscreen>
      <h4>DvFullscreen 指令 测试</h4>
      <div>
        <h1>这是要全屏的 标题</h1>
        <div>这是要全屏的 内容</div>
      </div>
    </section>

    <div>
      ----------------------------------------- 分割线
      -----------------------------------------
    </div>
    <div>
      ----------------------------------------- 分割线
      -----------------------------------------
    </div>
    <div>
      ----------------------------------------- 分割线
      -----------------------------------------
    </div>
    <div>
      ----------------------------------------- 分割线
      -----------------------------------------
    </div>
    <div>
      ----------------------------------------- 分割线
      -----------------------------------------
    </div>
    <div>
      ----------------------------------------- 分割线
      -----------------------------------------
    </div>
    <!-- ----------------------------------------- 分割线 ----------------------------------------- -->
    <!-- ----------------------------------------- 分割线 ----------------------------------------- -->
    <!-- ----------------------------------------- 分割线 ----------------------------------------- -->
    <!-- ----------------------------------------- 分割线 ----------------------------------------- -->
    <!-- ----------------------------------------- 分割线 ----------------------------------------- -->
    <!-- ----------------------------------------- 分割线 ----------------------------------------- -->
    <!-- ----------------------------------------- 分割线 ----------------------------------------- -->

    <section class="block">
      <h4>v-permission 测试</h4>
      <button v-dv-permission="{ target: [1, 2, 3], current: [1] }">
        按钮1-测试v-dvPermission
      </button>
      <button v-dv-permission="{ target: [1, 2, 3], current: [4] }">
        按钮2-测试v-dvPermission
      </button>
    </section>

    <section class="block">
      <h4>v-lazy 测试</h4>
      <img
        alt=""
        width="200"
        height="200"
        v-dv-lazy="'https://api.yimian.xyz/img?type=wallpaper'"
      />
    </section>

    <!-- 无限滚动测试 -->
    <section class="block">
      <h4>v-infinite-scroll 测试</h4>
      <h4>el === container</h4>

      <ul
        v-dv-infinite-scroll="fetchData"
        class="infinite-scroll"
        distance="20"
      >
        <li v-for="item in infiniteScrollState.count">{{ item }}</li>
      </ul>
    </section>

    <!-- 无限滚动测试 -->
    <section class="block">
      <h4>v-infinite-scroll 测试</h4>
      <h4>el !== container</h4>

      <div style="height: 200px; overflow: auto; marginbottom: 100px">
        <ul
          v-dv-infinite-scroll="fetchData2"
          style="background: red"
          :disabled="disabled"
        >
          <li v-for="item in infiniteScrollState.count2">{{ item }}</li>
        </ul>
        <p v-if="infiniteScrollState.loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </section>

    <!-- 测试 transition 内置组件 -->
    <section class="block">
      <h4>test transition</h4>

      <div class="transition">
        <p>css-transition</p>
        <transition
          name="side"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @after-enter="onAfterEnter"
          @enter-cancelled="onEnterCancelled"
          @before-leave="onBeforeLeave"
          @leave="onLeave"
          @after-leave="onAfterLeave"
          @leave-cancelled="onLeaveCancelled"
        >
          <p v-if="state.showTestTransition">test transition</p>
        </transition>
      </div>
      <div class="transition">
        <p>css-animation</p>
        <transition name="animation-side">
          <p v-show="state.showTestTransition">test transition</p>
        </transition>
      </div>

      <button @click="toggleShowTestTransition">toggle</button>
    </section>

    <!-- 测试 md-loader 把 markdown 转成 HTML -->
    <section class="block">
      <div v-html="ContainerMd"></div>
      <highlightjs language="javascript" code="var x = 5;" />
    </section>
  </div>

  <!-- 第二个根节点 -->
  <div>
    <section class="block">vue3可以有多个根节点了</section>
  </div>

  <!-- 第三个根节点 -->
  <!-- 测试 v-model -->
  <section class="block">
    <p>vue3中v-model的改变</p>
    <VModelTestFather></VModelTestFather>
  </section>

  <!-- 第四个根节点 -->
  <!-- 测试 provide 和 inject -->
  <section class="block">
    <h3>provide 和 inject</h3>
    <ProviderTest></ProviderTest>
  </section>

  <section class="block">
    <h3>测试 useThrottle</h3>
    <button @click="onThrottle">useThrottle</button>
  </section>

  <section class="block">
    <h3>测试 useState 测试</h3>
    <div>{{ stateA }}</div>

    <button @click="onUseState">useState</button>
  </section>

  <section class="block">
    <h3>测试 useLocalStorageState 测试</h3>
    <div>'stateLocal - 基本数据类型' {{ stateLocal }}</div>
    <div>'stateLocal2 - 引用数据类型' {{ stateLocal2 }}</div>

    <button @click="onUseLocalStorageState">useLocalStorageState</button>
    <button @click="onUseLocalStorageStateClear">clear</button>

    <br />

    <button @click="onUseLocalStorageState2">useLocalStorageState2</button>
    <button @click="onUseLocalStorageStateParams">setter函数参数</button>
    <button @click="onUseLocalStorageStateClear2">clear</button>
  </section>

  <section class="block">
    <h3>测试 useClickAway hooks 测试</h3>
    <div>
      {{ useClickAwayState }}
    </div>
    <button ref="RefUseClickAway">useClickAway</button>
    <br />
    <br />
    <button ref="RefUseClickAway2">useClickAway2</button>
  </section>

  <section class="block">
    <h3>测试 v-dv-click-away 指令 测试</h3>
    <div>
      {{ useClickAwayState2 }}
    </div>
    <button v-dv-click-away="useClickAwayObj">useClickAway</button>
  </section>

  <section class="block">
    <button @click="onDestroy">卸载/挂载组件</button>
    <span v-if="isShowTitle">
      <UserTitleTest />
    </span>
  </section>

  <section class="block">
    <h3>dv-icon 测试</h3>
    <i class="dv-icon-star" style="color: blueviolet; fontsize: 30px"></i>

    <dv-icon name="star" color="red" size="30" />
    <dv-icon name="star" class="star" />
  </section>

  <section class="block" ref="RefRateRoot">
    <h3>dv-rate 测试</h3>

    <dv-rate
      :max="5"
      v-model="stars"
      @clickOutside="clickOutside"
      iconName="star"
      :texts="['极差', '差', '一般', '良好', '优秀']"
      allowClear
      allowHalf
      :iconStyle="{ color: 'blue' }"
      :iconSelectedStyle="{ color: 'red', fontSize: '30px', width: '100px' }"
    />
    <i class="dv-icon-star1" style="position: relative">
      <i
        class="dv-icon-star1"
        style="
          position: absolute;
          left: 0;
          top: 0;
          color: red;
          width: 50%;
          overflow: hidden;
        "
      ></i>
    </i>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, getCurrentInstance, computed } from "vue";
import ContainerMd from "../docs/components/container-code.md";
import VModelTestFather from "./components/v-model-test-father.vue";
import ProviderTest from "./components/provide-test.vue";
import icon2 from "./images/2.png";
import { DvMessage } from "../packages/index";
import { useThrottle } from "../packages/index";
import { useLocalStorageState } from "../packages/index";
import { useState } from "../packages/index";
import { useClickAway } from "../packages/index";
import UserTitleTest from "./components/UserTitleTest.vue";

const stars = ref(1);

const clickOutside = () => {};

const state = reactive({
  showTestTransition: false,

  loading: false,
  instance: null,
  loadingInstance: null,

  collapse: ["1"],
});

const progressState = reactive({
  percent: 20,
  customColor: "#409eff",
  customColors: [
    { color: "#f56c6c", percent: 20 },
    { color: "#e6a23c", percent: 40 },
    { color: "#5cb87a", percent: 60 },
    { color: "#1989fa", percent: 80 },
    { color: "#6f7ad3", percent: 100 },
  ],
});

const infiniteScrollState = reactive({
  count: 10,

  count2: 10,
  loading: false,
});

const isShowTitle = ref(true);
const onDestroy = () => {
  isShowTitle.value = !isShowTitle.value;
};

const RefUseClickAway = ref();
const RefUseClickAway2 = ref();
const useClickAwayState = ref(1);
const useClickAwayState2 = ref(1);

onMounted(() => {
  useClickAway(() => {
    useClickAwayState.value = useClickAwayState.value + 1;
  }, [RefUseClickAway, RefUseClickAway2]);
});

const useClickAwayObj = [
  () => {
    useClickAwayState2.value = useClickAwayState2.value + 1;
  },
  [RefUseClickAway, RefUseClickAway2],
  ["click", "contextmenu"],
];

const [stateA, setStateA] = useState({ count: 1 });
const onUseState = () => {
  setStateA({ count: 2, num: "22" });
};

const [stateLocal, setStateLocal] = useLocalStorageState("local", 1);
const [stateLocal2, setStateLocal2] = useLocalStorageState("local2", { a: 10 });

const onUseLocalStorageState = () => {
  setStateLocal(2);
};
const onUseLocalStorageStateClear = () => {
  setStateLocal();
};

const onUseLocalStorageState2 = () => {
  setStateLocal2({ b: 10 });
};

const onUseLocalStorageStateParams = () => {
  setStateLocal2((preState) => {
    console.log("preState=======", preState);
    preState.x = 100;

    return preState;
  });
};

const onUseLocalStorageStateClear2 = () => {
  setStateLocal2();
};

const fetchData = () => {
  console.log("1111", 1111);
  infiniteScrollState.count = infiniteScrollState.count + 2;
};
const fetchData2 = () => {
  infiniteScrollState.loading = true;
  setTimeout(() => {
    infiniteScrollState.count2 = infiniteScrollState.count2 + 2;
    infiniteScrollState.loading = false;
  }, 2000);
};
const noMore = computed(() => infiniteScrollState.count2 > 30);
const disabled = computed(() => infiniteScrollState.loading || noMore.value);

const format = (percent) => {
  return percent === 100 ? "满" : `${percent}%`;
};

const customColorMethod = (percent) => {
  if (percent < 30) {
    return "#909399";
  } else if (percent < 70) {
    return "#e6a23c";
  } else {
    return "#67c23a";
  }
};

const increase = () => {
  progressState.percent += 10;
  if (progressState.percent > 100) {
    progressState.percent = 100;
  }
};
const decrease = () => {
  progressState.percent -= 10;
  if (progressState.percent < 0) {
    progressState.percent = 0;
  }
};

const app = ref();
const off = ref(false);
const refLoading = ref();

const showMessage = () => {
  // DvMessage.success("this is a string options");

  DvMessage.error({
    message: "this is a string options",
    type: "success",
    duration: 1000,
    showClose: true,
  });
};

onMounted(() => {
  let instance = (state.instance = getCurrentInstance());

  MessageComponentTest(instance);
  LoadingComponentTest(instance);
});

const MessageComponentTest = (instance) => {
  console.log("$message", instance.appContext.config.globalProperties.$message);
};

const Loading_directive = () => {
  setInterval(() => {
    state.loading = !state.loading;
  }, 3000);
};

const onShow = () => {
  state.loadingInstance = state.instance.proxy.$loading({
    target: refLoading.value,
    text: "loading...",
    background: "black",
  });
};

const onHide = () => {
  console.log("33333", state.loadingInstance);
  state.loadingInstance.close();
};

const LoadingComponentTest = () => {
  Loading_directive();
};

const onOff = () => {
  console.log("off");
  off.value = true;
};

const toggleShowTestTransition = () => {
  state.showTestTransition = !state.showTestTransition;
};

// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
const onBeforeEnter = () => {
  console.log("beforeEnter");
};

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
const onEnter = (el, done) => {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  console.log("enter");
  console.log("el", el);
  done();
};

// 当进入过渡完成时调用。
const onAfterEnter = (el) => {
  console.log("afterEnter");
};
const onEnterCancelled = (el) => {
  console.log("enterCancelled");
};
// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) {}
// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done();
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) {}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) {}

const onThrottle = useThrottle(() => console.log("1", 1), { delay: 1000 });
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  overflow: auto;
}

.block {
  margin: 20px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid red;
  display: block;
}

// container
.header,
.footer,
.main,
.aside {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  background: #c6e2ff;
}

.footer {
  background: #c6e2ff;
}

.main {
  height: 160px;
  background: #ecf5ff;
}

.aside {
  height: 160px;
  background: #d9ecff;
}

.item {
  margin-right: 30px;
}
</style>

<style lang="scss">
// row col
.layout-flex {
  height: 100px;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

<style lang="scss">
// transition组件
.transition {
  background-color: yellow;
  margin: 10px;
}

.side-enter-active,
.side-leave-active {
  transition: all 1s;
}

.side-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.side-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

// ------
.animation-side-enter-active,
.animation-side-leave-active {
  animation: s 1s;
}

@keyframes s {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>

<style lang="scss">
.backtop {
  height: 500px;
  overflow: auto;
}

.infinite-scroll {
  height: 200px;
  overflow: auto;
}
</style>
<style>
.dvTagStyle {
  margin-right: 10px;
}

.star {
  color: blue;
  font-size: 60px !important;
}
</style>
