import React from 'react'
import { Virtuoso } from 'react-virtuoso'
const items = [];
for (let i = 0; i < 200; i++) {
  const height = (30 + Math.random() * 20) + 'px';
  const style = {
    height,
    width: `100%`,
    backgroundColor: i % 2 ? 'green' : "orange"
  }
  items.push(<div style={style}>Row {i}</div>);
}
const App = () => (
  <Virtuoso
    style={{ height: '200px', width: '200px' }}
    totalCount={200}
    itemContent={index => items[index]}
  />
)
export default App;