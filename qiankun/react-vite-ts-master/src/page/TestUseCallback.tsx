import { Component } from 'react'
type PropType<T> = {
  color:T,
  arr?:Array<any> | undefined,
  cb:Function
}
type StateType = {
  noUpdateState:string | undefined,
  updateState:string | undefined
}
class TestUseCallback extends Component<PropType<string>,StateType>{
  constructor(props:PropType<string>){
    super(props);
    this.state = {
      noUpdateState:'pending',
      updateState:'update'
    }
  }
  shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any): boolean {
    console.log(nextProps)
    // if(this.props.color != nextProps.color){
    //   return true
    // }
    if(this.state.updateState != nextState.updateState){
      return true
    }
    if(this.props.cb != nextProps.cb){
      return true
    }
    return false
  }
  changeState(flag:number){
    let updateState = this.state.updateState == 'update' ? 'update1' : 'update'
    let noUpdateState = this.state.noUpdateState == 'pending' ? 'pending1' : 'pending'
    if(flag == 1){
      this.setState({
        updateState
      })
    }else{
      console.log(this.state)
      this.setState({
        noUpdateState
      })
    }
  }
  render() {
    console.log('修改状态updateState更新组件')
    return (
      <div>
        <h3>test useCallback and shouldComponentUpdate</h3>
        <p onClick={this.changeState.bind(this,2)}>修改状态不更新组件</p>
        <p onClick={this.changeState.bind(this,1)}>修改状态更新组件</p>
      </div>
    );
  }
}

export default TestUseCallback