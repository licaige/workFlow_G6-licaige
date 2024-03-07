//想实现异步1秒后加1
function thunk({ getState, dispatch }) {
    return function (next) {
        return function (action) {//此方法就是我们改造后的dispatch方法
            if (typeof action === 'function') {
                //把新的dispatch传递给了函数，这样就可以在函数里派发动作
                return action(getState, dispatch);
            }
            return next(action);
        }
    }
}
export default thunk;