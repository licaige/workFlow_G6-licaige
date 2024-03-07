import React from './react';
import ReactDOM from './react-dom';
//import { createRoot } from 'react-dom/client';
class Counter extends React.Component {
  constructor(props) {
    super(props);
    //组件里可以定义状态对象
    this.state = { number: 0 }
  }
  handleClick = (event) => {
    console.log(event.currentTarget, event.target);
    //event.stopPropagation();
    this.setState({ number: this.state.number + 1 });
    console.log(this.state);
    this.setState({ number: this.state.number + 1 });
    console.log(this.state);
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state);
      this.setState({ number: this.state.number + 1 });
      console.log(this.state);
    }, 50);
  }
  handleDivClick = (event) => {
    console.log(event.currentTarget, event.target);
    console.log('handleDivClick');
  }
  render() {
    return (
      <div id="counter" onClick={this.handleDivClick}>
        <p>number:{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
//ReactDOM.render 是17写的法
ReactDOM.render(<Counter />, document.getElementById('root'));

//createRoot(document.getElementById('root')).render(<Counter />);