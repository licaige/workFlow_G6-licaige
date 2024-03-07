import React from 'react';
import ReactReduxContext from './ReactReduxContext';
import { bindActionCreators } from '../redux';
/**
 * 连接 组件和仓库 
 * @param {*} mapStateToProps 把仓库中的状态映射为组件的属性对象
 * @param {*} mapDispatchToProps  把store.dispatch方法映射为组件的属性对象 参数可以是一个对象，也可以是一个函数
 */
function connect(mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return class extends React.Component {
            static contextType = ReactReduxContext;
            constructor(props, context) {//this.context
                super(props);
                const { store } = context;
                const { getState, subscribe, dispatch } = store;
                //先获取仓库中的总状态{counter1:{number:0},counter2:{number:0}}
                this.state = mapStateToProps(getState());
                //订阅仓库中的的状态变化事件，当仓库中的状态发生改变后重新用新的映射状态进行setState
                this.unsubscribe = subscribe(() => {
                    this.setState(mapStateToProps(getState()));
                });

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
                return (
                    <OldComponent {...this.props}  {...this.state} {...this.dispatchProps} />
                )
            }
        }
    }
}
export default connect;