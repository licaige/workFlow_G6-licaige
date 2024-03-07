import React from 'react';
import ReactDOM from 'react-dom';

const loading = message => OldComponent => {
  return class extends React.Component {
    render() {
      const state = {
        show() {
          console.log('show', message);
        },
        hide() {
          console.log('hide', message);
        }
      }
      return (
        <OldComponent {...this.props} {...state} />
      )
    }
  }
}

@loading('消息')
class Counter extends React.Component {
  render() {
    return (
      <div>
        <p>Counter</p>
        <button onClick={this.props.show}>show</button>
        <button onClick={this.props.hide}>hide</button>
      </div>
    )
  }
}
//const LoadingCounter = loading('消息')(Counter);

ReactDOM.render(<Counter />, document.getElementById('root'));