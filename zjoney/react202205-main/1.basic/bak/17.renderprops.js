import React from 'react';
import ReactDOM from 'react-dom';
function withTracker(OldComponent) {
  return class MouseTracker extends React.Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 }
    }
    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <OldComponent {...this.state} />
        </div>
      )
    }
  }
}
function Demo(props) {
  return (
    <>
      <h1>移动鼠标11111</h1>
      <p>当前鼠标的位置111是{props.x}:{props.y}</p>
    </>
  )
}

const TrackerDemo = withTracker(Demo);

ReactDOM.render(<TrackerDemo />, document.getElementById('root'));