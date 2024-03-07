export const REACT_TEXT = Symbol('react.text');
export const REACT_FRAGMENT = Symbol('react.fragment');//类似于文档片断

export const REACT_CONTEXT = Symbol('react.context')
export const REACT_PROVIDER = Symbol('react.provider')
export const REACT_MEMO = Symbol('react.memo')
//注意 此逻辑在源码里没有的，是我们的为了后面方便DOM-DIFF添加的
//经过包装之后所有的儿子元素都是一个对象，而且也都有类型，可以方便后面的比较
export function wrapToVdom(element) {
  return typeof element === 'string' || typeof element === 'number' ? {
    type: REACT_TEXT, props: element
  } : element
}

/**
 * 浅比较两个对象是否相等
 * @param {*} obj1 
 * @param {*} obj2 
 */
export function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
//obj1={home:{name:'bj'}} obj2={home:{name:'bj'}}