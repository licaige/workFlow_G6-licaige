import React from './react';
import ReactDOM from './react-dom';
class ClassComponent extends React.Component {
  render() {
    return <h1 className='title' style={{ color: this.props.color }}>{this.props.name}:{this.props.children}</h1>
  }
}
//let props = {name:'zhufeng',age:12};
let element = <ClassComponent color="orange" name="zhufeng" age={12} >我是类组件的儿子</ClassComponent>
console.log(element);
ReactDOM.render(element, document.getElementById('root'));



//React17 fiber
//React18 加入优先级调度 并发执行