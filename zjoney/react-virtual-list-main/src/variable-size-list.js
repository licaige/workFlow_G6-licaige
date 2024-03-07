
import React from "react";
import { VariableSizeList } from "./react-window";
import './variable-size-list.css'
const rowSizes = new Array(1000).fill(true).map(() => 25 + Math.round(Math.random() * 50));
const getItemSize = index => rowSizes[index];
const Row = ({ index, style }) => {
  return <div className={index % 2 ? 'ListItmeOdd' : 'ListItemEven'} style={style}>
    Row {index}
  </div>
}
function App() {

  return (
    <VariableSizeList
      className="List"
      height={200}
      width={200}
      itemSize={getItemSize}
      itemCount={1000}
    >
      {Row}
    </VariableSizeList>
  )
}
export default App;