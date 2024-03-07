import React from 'react';
import ReactDOM from 'react-dom';
function Counter() {
  const valueRef = React.useRef();
  const [state, setState] = React.useState(0);
  const handleClick = () => {
    let newValue = state + 1;
    valueRef.current = newValue;
    setState(newValue);
    getNewValue();
  }
  const getNewValue = () => {
    console.log(valueRef.current);
  }
  return (
    <div>
      <p>{state}</p>
      <button onClick={handleClick}>+</button>
      <button onClick={getNewValue}>获取最新的状态</button>
    </div>
  )
}
ReactDOM.render(<Counter />, document.getElementById('root'));
/**
 * 如何获取 最新的state
 */