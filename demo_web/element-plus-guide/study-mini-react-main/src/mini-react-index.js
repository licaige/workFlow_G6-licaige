// import React, {Component} from "react";
// import ReactDOM from "react-dom";
// import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
import ReactDOM from "./co-react/reactDom";
import Component from "./co-react/Component"
import "./index.css";

function FunctionComponent({name}) {
  return (
    <div className="border">
      <p>{name}</p>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

const jsx = (
  <div className="border">
    <h1>coboy</h1>
    <a href="https://www.amebyte.com.com/">amebyte</a>
    <FunctionComponent name="function" />
    <ClassComponent name="class" /> 
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log

// 原生标签
// 文本组件
// 函数组件
// 类组件

// /如何渲染节点
// 1、 渲染自己
// 2、更新节点
