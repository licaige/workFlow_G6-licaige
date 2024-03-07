import React from './react';
import ReactDOM from './react-dom';
class ScrollList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { messages: [] };
    this.wrapper = React.createRef();
  }
  addMessage = () => {
    this.setState({ messages: [`${this.state.messages.length}`, ...this.state.messages] });
  }
  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.addMessage();
    }, 1000);
  }
  componentWillUnmount() {
    window.clearInterval(this.timer);
  }
  getSnapshotBeforeUpdate() {
    return {
      prevScrollTop: this.wrapper.current.scrollTop,//在DOM更新前向上卷去的高度
      prevScrollHeight: this.wrapper.current.scrollHeight//在DOM更新后内容的高度
    }
  }
  componentDidUpdate(prevProps, prevState, { prevScrollTop, prevScrollHeight }) {
    this.wrapper.current.scrollTop = prevScrollTop + (this.wrapper.current.scrollHeight - prevScrollHeight);
  }
  render() {
    let style = {
      height: '100px',
      width: '200px',
      border: '1px solid red',
      overflow: 'auto'
    }
    return (
      <div style={style} ref={this.wrapper}>
        {
          this.state.messages.map((message, index) => <div key={index}>{message}</div>)
        }
      </div>
    )
  }
}
ReactDOM.render(<ScrollList />, document.getElementById('root'));