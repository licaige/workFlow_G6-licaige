import React, { useState, useEffect, useRef } from "react";
// import ReactDOM from 'react-dom';
import { renderRoutes, matchRoutes } from "react-router-config";
import { useImmer } from "use-immer";
import { Row, Col, message, notification, Form, Input, Button } from "antd";
// import { RocketOutlined } from "@ant-design/icons";
// import { $Api } from "@@api";
export default function Strategy(props) {
  const refForm = useRef(null);
  function submitFn() {
    console.log("refForm:", refForm.current.children);
    // if (refFormChild['userName'].value === '') {
    //   message.error('用户名不能为空！');
    //   return false;
    // }
    // if (refFormChild.passWord.value.length < 6) {
    //   message.error('密码长度不能少于6位！');
    //   return false;
    // }
    let errorMsg = validateFn(refForm.current.children);
    if (errorMsg) {
      message.error(errorMsg);
      return false; // 阻止表单提交
    }
  }
  /** 校验逻辑封装成策略对象 */
  let strategies = {
    isNonEmpty: function(value, errMsg) {
      if (value === '') {
        return errMsg;
      }
    },
    minLength: function (value, length, errMsg) {
      if (value.length < length) {
        return errMsg;
      }
    },
    isMobile: function(value, errMsg) {
      if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
        return errMsg;
      }
    },
  };
  class Validator {
    constructor () {
      this.cache = []; // 保存校验规则 
    }
  
    // add(dom, rule, errMsg) {
    //   let ary = rule.split(':'); // 把strategy对象和参数分开
    //   this.cache.push(() => {
    //     let strategy = ary.shift(); // 选择的strategy
    //     ary.unshift(dom.value); // 把input的value添加进参数列表的开头
    //     ary.push(errMsg); // 把errMsg添加进参数列表
    //     return strategies[strategy].apply(dom, ary);
    //   });
    // }
    add(dom, rules) {
      let self = this;
      for (let i = 0, rule; rule = rules[i++];) {
        ((rule) => {
          let strategyAry = rule.strategy.split(':'); // 把strategy对象和参数分开
          let errMsg = rule.errorMsg;
          self.cache.push(() => {
            let strategy = strategyAry.shift(); // 选择的strategy
            strategyAry.unshift(dom.value); // 把input的value添加进参数列表的开头
            strategyAry.push(errMsg); // 把errMsg添加进参数列表
            return strategies[strategy].apply(dom, strategyAry);
          });
        })(rule);
      }
    }

    start() {
      for (let i = 0, validateFun; validateFun = this.cache[i++];) {
        let msg = validateFun(); // 开始校验，并取得校验后的返回信息
        if (msg) { // 如果有确切的返回值， 说明校验没有通过
          return msg;
        }
      }
    }
  };
  /** Validator类作为Context,负责用户的请求并委托给strategy对象 */
  const validateFn = (refFormChild) => {
    let validator = new Validator();
    /** 添加校验规则 */
    // validator.add(refFormChild.userName, 'isNonEmpty', '用户名不能为空！');
    validator.add(refFormChild.userName, [{
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空！',
    }, {
      strategy: 'minLength: 10',
      errorMsg: '用户名长度不能小于10！',
    }]);
    validator.add(refFormChild.passWord, [{
      strategy: 'isNonEmpty',
      errorMsg: '密码不能为空！',
    }, {
      strategy: 'minLength:6',
      errorMsg: '密码长度不能少于6位！',
    }]);
    validator.add(refFormChild.phoneNumber, [{
      strategy: 'isMobile',
      errorMsg: '手机号码格式不正确！',
    }]);
    let errMsg = validator.start(); // 启动校验，获得校验结果
    return errMsg;
  }
 
  // useEffect(() => {
  //   return () => {
  //   //  cleanup
  //   }
  // }, [])

  return (
    <dl className="page-box">
      <dt>
        <h3 className="page-title">策略模式</h3>
      </dt>
      <dd>
        <p>策略模式定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。</p>
        <form action={"http://localhost:3603/"} ref={refForm} method={"post"}>
          <Input name="userName"/>
          <Input name="passWord"/>
          <Input name="phoneNumber"/>
          <Button onClick={submitFn} size={"small"}>提交</Button>
        </form>
        <h5>策略模式的优缺点</h5>
        <strong>优点：</strong>
        <p>1.策略模式利用组合、委托和多肽等技术和思想，可以有效的避免多重条件选择语句。</p>
        <p>2.策略模式提供了对开放-封闭原则的完美支持，将算法封装在独立的strategy中，使得它们易于切换，易于理解，易于扩展。</p>
        <p>3.策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复复制粘贴工作。</p>
        <p>4.策略模式中利用组合和委托来让Context拥有执行算法的能力，这也是继承的一种更轻便的替代方案。</p>
        <strong>不严重的缺点：</strong>
        <p>1.策略模式会在程序中增加许多策略类或者策略对象，但实际上比逻辑堆彻在Context中要好。</p>
        <p>2.要使用策略模式，必须了解所有的strategy中，必须了解各个strategy之间的不同点，才能选择一个合适的strategy。此时strategy暴露所有实现，这违反最少知识原则。</p>
        <h5>一等函数对象与策略模式</h5>
        <p>在函数作为一等对象的语言中，策略模式是隐形的。strategy就是值为函数的变量。实际上js这种将函数作为一等对象的语言中，策略模式已经融入到语言本身当中，我们经常用高阶函数来封装不同的行为，
          并且把它传递到另一个函数中。当对这些函数发出调用的消息时，不同的函数会返回不同的执行结果。在js中，“函数对象的多态性”来得更加简单</p>
      </dd>
    </dl>
  );
};
