import React from 'react';
import ReactDOM from 'react-dom';
function Child({ data, handleClick }) {
  console.log('Child render');
  return (<button onClick={handleClick}>{data.number}</button>)
}
//两个条件都要满足，1.属性不变不重新render
const MemoChild = React.memo(Child);
function App() {
  console.log('App render');
  const [name, setName] = React.useState('zhufeng');
  if (true) {
    const [number, setNumber] = React.useState(0);
  }
  const [number, setNumber] = React.useState(0);
  //第2个条就是属性不变，属性变了就重新render
  let data = React.useMemo(() => ({ number }), [number]);
  let handleClick = React.useCallback(() => setNumber(number + 1), [number])
  return (
    <div>
      <input type="text" value={name} onChange={event => setName(event.target.value)} />
      <MemoChild data={data} handleClick={handleClick} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));