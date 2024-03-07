import React from './react';
import ReactDOM from './react-dom';
let a = 1;
function App() {
  const [number, setNumber] = React.useState(0);
  const [age, setAge] = React.useState(10);
  const handleClick = () => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1)
  };
  return (
    <div>
      <p>{number}</p>
      <p>{age}</p>
      <button onClick={handleClick}>+</button>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));