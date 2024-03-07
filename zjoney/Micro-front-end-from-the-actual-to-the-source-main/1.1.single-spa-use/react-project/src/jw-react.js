import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});
// 接入协议 ， 子应用必须提供接入协议
// 对于single-spa 而言 保留接入协议 就可以接入到项目中
export const { bootstrap, mount, unmount } = lifecycles;


// qiankun 写一个自己改写的接入协议