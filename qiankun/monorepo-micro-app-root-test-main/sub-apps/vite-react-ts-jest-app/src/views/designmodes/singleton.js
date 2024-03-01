import React, { useState, useEffect, useRef } from "react";
// import ReactDOM from 'react-dom';
import { renderRoutes, matchRoutes } from "react-router-config";
import { useImmer } from "use-immer";
import { Row, Col, Button, message, notification } from "antd";
// import { RocketOutlined } from "@ant-design/icons";
// import { $Api } from "@@api";

export default function SingleTon(props) {

  const CreateHtml = (function() {
    let instance;
    let CreateDiv = function(html) {
      if (instance) {
        return instance;
      }
      this.html = html;
      this.init();
      return instance = this;
    };
    CreateDiv.prototype.init = function() {
      // let div = document.createElement('div');
      // div.innerHTML = this.html;
      // document.body.appendChild('div');
      message.info(`Hello ${this.html}`);
      // const e = React.createElement;
      // ReactDOM.render(
      //   e('div', null, `Hello ${this.html}`),
      //   document.getElementById('refSingeton')
      // );
    };
    return CreateDiv;
  })();
  

  let CreateEl = function(html) {
    this.html = html;
    this.init();
  }
  CreateEl.prototype.init = function() {
    // let div = document.createElement('div');
    // div.innerHTML = this.html;
    // document.appendChild(div);
    message.info(`CreateEl ${this.html}`);
  };
  const proxySingletonCreateEl = (function() {
    let instance;
    return function(html) {
      if (!instance) {
        instance = new CreateEl(html);
      }
      return instance;
    }
  })();

  const getSingle = function(fn) {
    let result;
    return function() {
      return result || (result = fn.apply(this, arguments));
    }
  };
  const createSingleIframe = getSingle((title, content) => notification.info({
    message: title,
    description: content,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  }));
  const modalFn = (title) => {
    let content = `通用惰性单例，在getSinge函数中，实际上也提到了和高阶函数的概念。单例模式是一种简单但非常实用的模式，<br/>
    特别是惰性单例技术，在合适的时候才创建，并且只创建唯一的一个。为符合单一职责原则，创建对象和管理单例的职责被分布在两个不同的方法中，这两个方法组合才更具有单例模式的威力。`;
    createSingleIframe(title, content);
  };
  
  let a, b, c, d;
  useEffect(() => {
    a = new CreateHtml('test1');
    b = new CreateHtml('test2');
    c = new proxySingletonCreateEl('test3');
    d = new proxySingletonCreateEl('test4');
    return () => {
    //  cleanup
    }
  }, [])

  return (
    <dl className="page-box">
      <dt>
        <h3 className="page-title">单例模式</h3>
      </dt>
      <dd>
        <p>单例模式定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。</p>
        <p>单例模式是一种常用的模式，有些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的window对象等。</p>
        <h5>透明单例模式</h5>
        <p>{String(a === b)}</p>
        <h5>代理单例模式</h5>
        <p>{String(c === d)}</p>
        <p>通过引入代理类的方式，我们完成了一个单例模式的编写，跟之前不同的是，现在把负责管理单例的逻辑移到了代理类proxySingletonCreateDiv中。本例是缓存代理的应用之一。</p>
        <h5>惰性单例模式</h5>
        <Button onClick={() => modalFn('惰性单例模式')} size={"small"}>惰性单例</Button>
        <Button onClick={() => modalFn('通用惰性单例')} size={"small"}>通用惰性单例</Button>
      </dd>
    </dl>
  );
};
