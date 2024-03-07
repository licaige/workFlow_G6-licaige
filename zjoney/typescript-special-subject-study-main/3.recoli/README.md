1.Atom + Selector ：： Stateful
2.Atom + useRecoilValue 读取 3.状态不变！！ 组件随着一个 Atom 概念变化呢？？
4.Atom 类 组件读取 Atom 数据将会隐式订阅它
5.Stateful 订阅发布功能
6.useRecoilValue
订阅 () => updateState({}) ！== useState({}) hooks 变了组件也跟着变了
7.useRecoilState
[value, useCallback((value) => atom.setState(value), [atom])]
8.Selector 传进来 Selector 表示一小块派生状态。派生状态是状态通过纯函数计算得来。
get: ({ get }) => {
const text = get(textState);
return text + '🏮' + Math.random();
},
9.type SelectorGenerator<T> = (context: { get: <V>(dep: Stateful<T>) => V }) => T;

10.第一步执行 get 函数 第二部 结构函数参数的 get

Selector 生效 == get
获得小的 atom

Selector 生效 (获得小的 atom (哪一个？？？atom))

11.this.value Atom 影响着你的 Selector 复杂请求
