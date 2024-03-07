import React from './react';
import ReactDOM from './react-dom';
class Counter extends React.Component {
  state = { number: 0 }
  render() {
    return (
      <div>
        <ChildCounter number={this.state.number} />
        <button onClick={() => this.setState({ number: this.state.number + 1 })}>+</button>
      </div>
    )
  }
}
class ChildCounter extends React.Component {
  state = { count: 0 }
  //componentWillReceiveProps
  static getDerivedStateFromProps(nextProps, prevState) {
    const { number } = nextProps;
    if (number % 2 == 0) {
      return { count: number * 2 }
    } else if (number % 3 == 0) {
      return { count: number * 3 }
    } else {
      return null;
    }
  }
  render() {
    //Cannot assign to read only property 'number' of object '#<Object>'
    this.props.number++;
    return (
      <div>{this.state.count}</div>
    )
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'));