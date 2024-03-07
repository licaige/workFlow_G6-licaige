import React from './react';
import ReactDOM from './react-dom';
class Counter extends React.Component {
  static defaultProps = {
    name: 'zhufeng'//定义默认属性
  }
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    console.log('Counter 1.constructor');
  }
  componentWillMount() {
    console.log('Counter 2.componentWillMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Counter 5.shouldComponentUpdate');
    return nextState.number % 2 === 0;//偶数才更新
  }
  componentWillUpdate() {
    console.log('Counter 6.componentWillUpdate');
  }
  handleClick = () => {
    debugger
    this.setState({ number: this.state.number + 1 });
  }

  render() {
    console.log('Counter 3.render');
    return (
      <div>
        <p>{this.state.number}</p>
        {this.state.number === 4 ? null : <ChildCounter count={this.state.number} />}
        <button onClick={this.handleClick}>+</button>
        {null}
      </div>
    )
  }
  componentDidUpdate() {
    console.log('Counter 7.componentDidUpdate');
  }
  componentDidMount() {
    console.log('Counter 4.componentDidMount');
  }
}
class ChildCounter extends React.Component {
  componentWillUnmount() {
    console.log('ChildCounter 6.componentWillUnmount');
  }
  componentWillReceiveProps(newProps) {
    console.log('ChildCounter 4.componentWillReceiveProps');
  }
  componentWillMount() {
    console.log('ChildCounter 1.componentWillMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('ChildCounter 5.shouldComponentUpdate');

    return nextProps.count % 3 === 0;
  }
  render() {
    console.log('ChildCounter 2.render');
    return <div>{this.props.count}</div>
  }
  componentDidMount() {
    console.log('ChildCounter 3.componentDidMount');
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'));
/**

 */