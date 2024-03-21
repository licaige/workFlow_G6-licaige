import type { App, Component, AppContext } from "vue";
import type { TDirective } from "../directives/utils";

// components
// 注意：
// - 这里没用 @ 是因为 vuepress2 使用文档中没法配置 client 端的别名
// - 核心原因是本库基于了两套构建工具 webpack 和 vite ，会有不兼容的情况
import DvIcon from "../components/icon/icon.vue";
import DvRate from "../components/rate/rate.vue";

import Divider from "../components/divider/index.vue";
import Container from "../components/container/container.vue";
import Header from "../components/container/header.vue";
import Footer from "../components/container/footer.vue";
import Aside from "../components/container/aside.vue";
import Main from "../components/container/main.vue";
import Row from "../components/row/index.vue";
import Col from "../components/col/index.vue";

import Tag from "../components/tag/index.vue";
import Badge from "../components/badge/index.vue";
import Backtop from "../components/backtop/index.vue";
import Empty from "../components/empty/empty.vue";
import WaterMark from "../components/watermark/watermark.vue";
import Scrollbar from "../components/scrollbar/scrollbar.vue";
import Progress from "../components/progress/progress.vue";

import Breadcrumb from "../components/breadcrumb/breadcrumb.vue";
import BreadcrumbItem from "../components/breadcrumb/breadcrumb-item.vue";

import Timeline from "../components/timeline/timeline.vue";
import TimelineItem from "../components/timeline/timeline-item.vue";

import Collapse from "../components/collapse/collapse.vue";
import CollapseItem from "../components/collapse/collapse-item.vue";
import CollapseTransition from "../components/collapse/collapse-transition.vue";

// functions
import Message from "../components/message/message";

// directives
import {
  vDvPermission,
  vDvLazy,
  vDvInfiniteScroll,
  vDvClickAway,
} from "../directives";

// icons
// - 用于 breadcrumb 组件的 separator-

// 注意
// 这里不使用 require.context 是因为本项目使用了两套构建方式，require.context 只在webpack环境中存在
// - 1. docs，使用 vite 构建
// - 2. examples，使用 webpack 构建
// import { requireComps } from "./requireContext";
// const components = requireComps();

const components = [
  DvIcon,
  DvRate,

  Container,
  Header,
  Footer,
  Aside,
  Main,

  Row,
  Col,

  Divider,
  Tag,
  Badge,
  Backtop,
  Empty,
  WaterMark,
  Scrollbar,
  Progress,

  Breadcrumb,
  BreadcrumbItem,

  Timeline,
  TimelineItem,

  Collapse,
  CollapseItem,
  CollapseTransition,
];

const functions: {
  (): void;
  $name: string;
  name: string;
  _context: AppContext;
  type?: any;
}[] = [Message];

const directives = [vDvPermission, vDvLazy, vDvInfiniteScroll, vDvClickAway];

// 1
// 插件声明：声明所有插件
// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册

// 2
// app.component()
// 1.如果同时传递一个 ( 组件名字符串 )，( 及其定义 )，则 ( 注册一个全局组件 ) ---- 存
// 2.如果 ( 只传递一个名字 )，则会返回用该名字注册的组件 (如果存在的话) ---------- 取

export const installComponents = (app: App) => {
  components.forEach((comp: Component) => {
    app.component(comp.name as string, comp);
  });
};

export const installFunctions = (app: App) => {
  functions.forEach((func) => {
    func._context = app._context;
    app.config.globalProperties[func.$name] = func;
  });
};

export const installDirectives = (app: App) => {
  directives.forEach((directive: TDirective) => {
    app.directive(directive.name, directive.options);
  });
};

// export const installRouter = (app: App) => {
//   app.use(router);
// };

export {
  Message as DvMessage,
  Divider as DvDivider,
  Breadcrumb as DvBreadcrumb,
  BreadcrumbItem as DvBreadcrumbItem,
  Container as DvContainer,
  Header as DvHeader,
  Footer as DvFooter,
  Aside as DvAside,
  Main as DvMain,
  Row as DvRow,
  Col as DvCol,
  Tag as DvTag,
  Badge as DvBadge,
  Backtop as DvBacktop,
  Empty as DvEmpty,
  WaterMark as DvWaterMark,
  Timeline as DvTimeline,
  TimelineItem as DvTimelineItem,
  Scrollbar as DvScrollbar,
};
