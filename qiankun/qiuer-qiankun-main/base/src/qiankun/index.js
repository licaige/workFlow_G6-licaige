/**
 * 用于存放我们各个微应用的数组。
 * 以后有多少个微应用，这个数组中就会存放多少个对象
 */
const apps = [
  /**
   * name: 微应用名称 - 具有唯一性
   * entry: 微应用入口 - 通过该地址加载微应用
   * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
];

import { message } from 'element-ui';
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
} from 'qiankun';

/**
 * 注册微应用
 * 第一个参数 - 微应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(apps, {
  // qiankun 生命周期钩子 - 微应用加载前
  beforeLoad: (app) => {
    console.log('before load', app.name);
    return Promise.resolve();
  },
  // qiankun 生命周期钩子 - 微应用挂载后
  afterMount: (app) => {
    console.log('after mount', app.name);
    return Promise.resolve();
  },
});

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event) => {
  console.error(event);
  const { message: msg } = event;
  // 加载失败时提示
  if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
    message.error('微应用加载失败，请检查应用是否可运行');
  }
});

// 导出 qiankun 的启动函数
export default start;

// 执行 start 就是在开启乾坤架构。
