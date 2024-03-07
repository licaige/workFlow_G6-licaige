import React from './react';
import ReactDOM from './react-dom';
function Animation() {
  const ref = React.useRef();//React.createRef() = {current:null}
  React.useLayoutEffect(() => {
    ref.current.style.transition = `all 500ms`;
    ref.current.style.transform = `translate(500px)`;
  });
  let style = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'red'
  }
  return (
    <div style={style} ref={ref}></div>
  )
}
ReactDOM.render(<Animation />, document.getElementById('root'));