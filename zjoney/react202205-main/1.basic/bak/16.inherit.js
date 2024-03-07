import React from './react';
import ReactDOM from './react-dom';
//反向继承 假如说这个Button是别人写的，不能直接改源码
class Button extends React.Component {
  state = { name: 'Button' }
  componentDidMount() {
    console.log('Button componentDidMount');
  }
  componentWillMount() {
    console.log('Button componentWillMount');
  }
  render() {
    console.log('Button render');
    return <button name={this.state.name} title={this.props.title} ><span>button:</span></button>
  }
}
const counterWrapper = OldComponent => {
  return class NewButton extends OldComponent {
    state = { number: 0 }
    componentDidMount() {
      console.log('NewButton componentDidMount');
      super.componentDidMount();
    }
    componentWillMount() {
      console.log('NewButton componentWillMount');
      super.componentWillMount();
    }
    handleClick = () => {
      this.setState({ number: this.state.number + 1 });
    }
    render() {
      console.log('NewButton render');
      let element = super.render();
      let newProps = {
        ...element.props,
        onClick: this.handleClick
      }
      return React.cloneElement(element, newProps);

    }
  }
}
const CounterButton = counterWrapper(Button);
ReactDOM.render(<CounterButton title="按钮" />, document.getElementById('root'));