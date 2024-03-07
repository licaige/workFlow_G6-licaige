import { REACT_ELEMENT, REACT_FORWARD_REF } from './element';
import { wrapToVdom, REACT_FRAGMENT, REACT_CONTEXT, REACT_PROVIDER, shallowEqual, REACT_MEMO } from './utils';
import { Component } from './Component'
import * as hooks from './react-dom';
function createElement(type, config, children) {
  let ref;//是后面用来获取真实DOM元素的
  let key;//用来实现DOM-DIFF，高效快速进行DOM比较
  if (config) {
    delete config.__source;
    delete config.__self;
    ref = config.ref;
    delete config.ref;
    key = config.key;
    delete config.key;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    //如果有多个儿子，那此处就是一个数组
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    //如果只有一个儿子，children是对象或者说字符串，如果没有儿子，就是undefined
    //children不一定是数组
    props.children = wrapToVdom(children);
  }
  return {
    $$typeof: REACT_ELEMENT,//表示这是一个虚拟DOM，也就是说这是一个React元素
    type,//虚拟DOM元素的类型
    ref,
    key,
    props//这是属性对象 id  className style ....
  }
}
function createRef() {
  return { current: null };
}
function forwardRef(render) {
  //$$typeof: Symbol(react.forward_ref)
  return {
    $$typeof: REACT_FORWARD_REF,
    render
  }
}
function createContext() {
  const context = { $$typeof: REACT_CONTEXT, _currentValue: undefined };
  context.Provider = {
    $$typeof: REACT_PROVIDER,
    _context: context
  }
  context.Consumer = {
    $$typeof: REACT_CONTEXT,
    _context: context
  }
  return context
}
function cloneElement(element, newProps, ...newChildren) {
  let children = element.props && element.props.children;
  if (newChildren.length > 0) {
    children = newChildren.map(wrapToVdom);
  }
  if (children.length == 1) children = children[0];
  let props = { ...element.props, ...newProps, children };
  return { ...element, props };
}
class PureComponent extends Component {
  shouldComponentUpdate(newProps, nextState) {
    return !shallowEqual(this.props, newProps) || !shallowEqual(this.state, nextState)
  }
}
/**
 * 
 * @param {*} type 待包装的函数组件
 * @param {*} compare 比较的方法
 * @returns 
 */
function memo(type, compare = shallowEqual) {
  return {
    $$typeof: REACT_MEMO,
    type,
    compare
  }
}
function useContext(context) {
  return context._currentValue;
}
const React = {
  createElement,
  Component,
  createRef,
  forwardRef,
  Fragment: REACT_FRAGMENT,
  createContext,
  cloneElement,
  PureComponent,
  memo,
  useContext,
  ...hooks
}
export default React;