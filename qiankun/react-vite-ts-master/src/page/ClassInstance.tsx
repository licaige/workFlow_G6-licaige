import { Component } from 'react'
class ClassInstance extends Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick(type:string,event:any){
    console.log('this is:', type, event);
  };
  render() {
    return (
      <button onClick={this.handleClick.bind(this,'e')}>
        Click me
      </button>
    );
  }
}

export default ClassInstance