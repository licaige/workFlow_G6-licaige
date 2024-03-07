

import { VariableSizeList } from "./react-window";
import './variable-size-list.css'
const items = [];
const itemCount=1000
for (let i = 0; i < 1000; i++) {
  const height = (30 + Math.floor(Math.random() * 20)) + 'px';
  const style = {
    height,
    width: '100%',
    backgroundColor: i % 2 ? 'green' : 'orange',
    display: 'flex',
    alignCenter: 'center',
    justfyContent: 'center'
  }
  items.push(<div style={style}>Row{i}</div>)
}
const Row = ({ index }) => items[index]
function App() {

  return (
    <VariableSizeList
      className="List"
      height={200}
      width={200}
      itemCount={itemCount}
      isDynamic = {true}
    >
      {Row}
    </VariableSizeList>
  )
}
export default App;