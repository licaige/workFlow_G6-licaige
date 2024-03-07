import React from './react';
import ReactDOM from './react-dom';
class Counter extends React.Component {
  constructor(props) {
    super(props);
    //组件里可以定义状态对象
    this.state = { number: 0 }
  }
  handleClick = () => {
    //调用setState可以修改状态，并且让组件刷新
    this.setState({ number: this.state.number + 1 });
  }
  render() {
    return (
      <div id="counter">
        <p>{this.props.title}</p>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
ReactDOM.render(<Counter title="计数器" />, document.getElementById('root'));



//React17 fiber
//React18 加入优先级调度 并发执行