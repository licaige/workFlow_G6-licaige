/**
 * 1.了解清楚FC FC的泛型参数
 * 2.正常的函数组件的FC 默认的使用children
 * 3.明确了不带有他它的属性 VoidFunctionComponent
 * 4.小陷阱
 */
//========1.了解清楚FC FC的泛型参数========
import React from 'react';
import { FC, VFC, SFC } from 'react';
//非常传统的组件接受参数
type AppProps = { message: string };
const App = ({ message }: AppProps) => <div>{message}</div>;
console.log(App);
//vue的解构这个数据的时候
// const App2: FunctionComponent<{ message: string }> = ({ message }) => (
//   <div>{message}</div>
// );
//========2.正常的函数组件的FC 默认的使用children========
//除了默认的参数 还有一个children
const App22: FC<{ title: string }> = ({ children, title }) => (
  <div title={title}>{children}</div>
);
console.log(App22);

//========3.明确了不带有他它的属性 VoidFunctionComponent========
//Props中一定的显式的解构
type Props = { foo: string };

// OK now, in future, error
// const FunctionComponent: FC<Props> = ({ foo, children }: Props) => {
//   return (
//     <div>
//       {foo} {children}
//     </div>
//   ); // OK
// };
// console.log('FunctionComponent: ', FunctionComponent);
// 明确的的表示这是一个不带有children =》FunctionComponent
const VoidFunctionComponent: VFC<Props> = ({ foo }) => {
  return (
    <div>
      {foo}
      {/* {children} */}
    </div>
  );
};
console.log('VoidFunctionComponent: ', VoidFunctionComponent);

//========4.小陷阱========
// const MyConditionalComponent = ({ shouldRender = true }) =>
//   shouldRender ? <div /> : false; // JS中常见的操作引擎React内部的错误
// const el = <MyConditionalComponent />; // throws an error

// const MyArrayComponent = () => Array(5).fill(<div />);
const MyArrayComponent2 = () =>
  (Array(5).fill(<div />) as unknown) as JSX.Element;
const el2 = <MyArrayComponent2 />; // throws an error
console.log('el2: ', el2);
