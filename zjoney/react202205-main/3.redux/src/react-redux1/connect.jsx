import React from 'react'
import ReactReduxContext from './ReactReduxContext'
import { bindActionCreators } from '../redux'
/**
 * 连接 组件和仓库
 * @param {*} mapStateToProps 
 * @param {*} mapDispatchToProps 
 * @returns 
 */
function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return class extends React.Component {
      static contextType = ReactReduxContext;
      constructor(props, context) { // this.context
        super(props);
        const { store } = context;
        const { getState, subscribe, dispatch } = store;
        // 获取仓库中的状态
        this.state = mapStateToProps(getState());
        // 订阅仓库的状态
        this.unsubscribe = subscribe(() => this.setState(mapStateToProps(getState())))


        let dispatchProps;
        //如果说mapDispatchToProps是一个函数的话，
        if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(dispatch);
        } else {//如果它是一个对象的话
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        }
        this.dispatchProps = dispatchProps;
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        return <OldComponent {...this.props} {...this.state} {...this.dispatchProps}/>
      }
    }

  }
}
export default connect;