import * as effectTypes from './effectTypes';
const CANCEL_TASK = Symbol.for('CANCEL_TASK');
/**
 * 运行saga
 * @param {*} env 环境对象
 * @param {*} saga 可能是一个生成器，也可能是一个迭代器
 */
function runSaga(env, saga, callback) {
  const runTask = { cancel: () => next(CANCEL_TASK) };
  const { channel, dispatch } = env;
  let it = typeof saga === 'function' ? saga() : saga;
  function next(value, isError) {
    let result;
    if (isError) {
      result = it.throw(value);
    } else if (value === CANCEL_TASK) {
      result = it.return();//如果取消了当前的saga执行任务，就表示当前的saga直接结束了
    } else {
      result = it.next(value);
    }
    let { done, value: effect } = result;
    if (!done) {
      //如果产出的指令对象是一个迭代器的话，会相当于开启一个新的子进程运行此迭代器
      if (typeof effect[Symbol.iterator] == 'function') {
        runSaga(env, effect);
        next();//当前的saga会继续向后执行
      } else if (effect instanceof Promise) {
        effect.then(next);
      } else {
        switch (effect.type) {
          case effectTypes.TAKE:
            channel.once(effect.actionType, next);
            break;
          case effectTypes.PUT:
            dispatch(effect.action);
            next();
            break;
          case effectTypes.FORK:
            const task = runSaga(env, effect.saga);//开启新的子进程运行saga
            next(task);//当前的saga会继续向下执行
            break;
          case effectTypes.CALL:
            effect.fn(...effect.args).then(next);
            break;
          case effectTypes.CPS:
            effect.fn(...effect.args, (err, data) => {
              if (err) {
                next(err, true)
              } else {
                next(data);
              }
            });
            break;
          case effectTypes.ALL:
            const { iterators } = effect;
            let result = [];
            let counter = 0;
            iterators.forEach((iterator, index) => {
              runSaga(env, iterator, (data) => {
                result[index] = data;
                if (++counter === iterators.length) {
                  next(result);
                }
              })
            });
            break;
          case effectTypes.CANCEL:
            effect.task.cancel();
            next();
            break;
          default:
            break;
        }
      }
    } else {
      callback && callback(effect);
    }
  }
  next();
  return runTask;
}
export default runSaga;