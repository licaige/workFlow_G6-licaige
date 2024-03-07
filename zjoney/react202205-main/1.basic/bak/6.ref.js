import React from './react';
import ReactDOM from './react-dom';
class Sum extends React.Component {
  constructor(props) {
    super(props);
    this.a = React.createRef();//{current:null}
    this.b = React.createRef();//{current:null}
    this.result = React.createRef();//{current:null}
  }
  handleAdd = (event) => {
    let a = this.a.current.value;
    let b = this.b.current.value;
    this.result.current.value = a + b;
  }
  render() {
    return (
      <div>
        <input ref={this.a} />+<input ref={this.b} />
        <button onClick={this.handleAdd}>=</button><input ref={this.result} />
      </div>
    )
  }
}
ReactDOM.render(<Sum />, document.getElementById('root'));

//createRoot(document.getElementById('root')).render(<Counter />);