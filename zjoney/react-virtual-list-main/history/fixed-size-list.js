import React from 'react';
import { FixedSizeList } from './react-window';
import './fixed-size-list.css'
const Row = ({ index, style, isScrolling }) => {
  return (
    <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      {isScrolling ? 'scrolling' : ` Row ${index}`}
    </div>
  )
}

function App() {
  const listRef = React.useRef();
  return (
    <>
      <button onClick={() => listRef.current.scrollToItem(50)}>50</button>
      <FixedSizeList
        className='List'
        height={200}
        width={200}
        itemSize={50}
        itemCount={1000}
        useIsScrolling
        ref={listRef}
      >
        {Row}
      </FixedSizeList>
    </>
  )
}
export default App;