//写一个个真正的日志中间件 中间件的格式是固定的
function logger({ getState, dispatch }) {
    return function (next) {
        return function (action) {//此方法就是我们改造后的dispatch方法
            console.log('老状态', getState());
            next(action);//调用原始的dispatch方法，传入动作action,发给仓库，仓库里会调用reducer计算新的状态
            console.log('新状态', getState());
            return action;
        }
    }
}
export default logger;