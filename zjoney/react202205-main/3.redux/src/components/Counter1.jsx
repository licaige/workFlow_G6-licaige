import React from 'react';
import actionCreators from '../store/actionCreators/counter1';
import { connect } from '../react-redux1';
class Counter1 extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={this.props.add1}>+</button>
        <button onClick={this.props.minus1}>-</button>
        <button onClick={this.props.thunkAdd}>thunkAdd</button>
        <button onClick={this.props.promiseAdd}>promiseAdd</button>
      </div >
    )
  }
}
//把仓库中的状态映射为组件的属性对象 仓库到组件的输出
const mapStateToProps = state => state.counter1;
//const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)
export default connect(
  mapStateToProps,
  actionCreators //组件的输出，在组件里派发动作，修改仓库
)(Counter1);