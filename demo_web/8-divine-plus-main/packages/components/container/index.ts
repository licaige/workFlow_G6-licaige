import Container from "./container.vue";
import Header from "./header.vue";
import Footer from "./footer.vue";
import Main from "./main.vue";
import Aside from "./aside.vue";
import { withInstall } from "@/utils";

// 使用方式
// 本项目采用两种组件的使用方式，(全局引入: 文件大 )，和 ( 通过路径单独引入某个组件 )
// - 全局注册使用: 在vue项目的入口文件，通过 vue.use() 来注册插件使用
// - 单独注册使用: 不在vue项目入口文件引入，而是直接通过路径引入

const DvContainer = withInstall(Container, { Header, Footer, Main, Aside });
export default DvContainer;
