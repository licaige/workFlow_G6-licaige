import React from './react';
import ReactDOM from './react-dom';

function Child(props, ref) {
  const inputRef = React.useRef();
  React.useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    }
  }));
  return (<input type="text" ref={inputRef} />)
}
const ForwardedChild = React.forwardRef(Child)
function Parent() {
  const inputRef = React.useRef();
  const getFocus = () => {
    inputRef.current.focus();
    inputRef.current.remove();
  }
  return (
    <div>
      <ForwardedChild ref={inputRef} />
      <button onClick={getFocus}>获得焦点</button>
    </div>
  )
}
ReactDOM.render(<Parent />, document.getElementById('root'));
/**
 * 如何获取 最新的state
 */