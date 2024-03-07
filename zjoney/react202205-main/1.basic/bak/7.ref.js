import React from './react';
import ReactDOM from './react-dom';
/* class Username extends React.Component {
  constructor() {
    super()
    this.input = React.createRef();
  }
  getFocus = () => {
    this.input.current.focus();
  }
  render() {
    return <input ref={this.input} />;
  }
} */
Username.xx = xx;
Username.prototype.yy = yy;
function Username(props, ref) {
  let usernameRef = React.createRef();
  ref.current = {
    focus: () => {
      usernameRef.current.focus();
    }
  }
  return <input ref={usernameRef} />;
}
const ForwardUsername = React.forwardRef(Username);
console.log(ForwardUsername);
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
  }
  getFocus = () => {
    this.usernameRef.current.focus();
    //this.usernameRef.current.remove();
  }
  render() {
    return (
      <div>
        <ForwardUsername ref={this.usernameRef} />
        <button onClick={this.getFocus}>获得焦点</button>
      </div>
    )
  }
}
ReactDOM.render(<Form />, document.getElementById('root'));

//createRoot(document.getElementById('root')).render(<Counter />);
//Function components cannot be given refs.
// Attempts to access this ref will fail.
//Did you mean to use React.forwardRef() ?