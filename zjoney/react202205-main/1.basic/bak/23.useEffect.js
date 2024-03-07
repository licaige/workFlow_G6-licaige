import React from './react';
import ReactDOM from './react-dom';
function Counter() {
  const [number, setNumber] = React.useState(0);
  React.useEffect(() => {
    console.log('开启一个定时器');
    const timer = setInterval(() => {
      setNumber(number => number + 1);
    }, 1000);
    return () => {
      console.log('销毁老的定时器');
      clearInterval(timer);
    }
  });
  return (
    <p>{number}</p>
  )
}
ReactDOM.render(<Counter />, document.getElementById('root'));