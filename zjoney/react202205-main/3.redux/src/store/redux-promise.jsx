//想实现异步1秒后加1
function promise({ getState, dispatch }) {
    return function (next) {
        return function (action) {//此方法就是我们改造后的dispatch方法
            if (action.then && typeof action.then === 'function') {
                action.then(dispatch)
            } else {
                next(action);
            }
        }
    }
}
export default promise;