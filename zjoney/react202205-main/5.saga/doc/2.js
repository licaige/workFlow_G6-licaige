
function* rootSaga() {
  console.log('start');
  yield { type: 'PUT', action: { type: 'ADD' } }
  //yield new Promise(resolve => setTimeout(resolve, 1000));
  //yield readFile;
  yield 'delay1000'
  yield { type: "PUT", action: { type: "MINUS" } }
}
function readFile(callback) {
  setTimeout(callback, 1000);
}

function runSaga(saga) {
  //执行生成器，返回一个迭代器
  const it = saga();
  function next() {
    const { done, value: effect } = it.next();
    debugger
    if (!done) {//如果done=false
      if (effect === 'delay1000') {
        setTimeout(next, 1000);
      } else if (typeof effect === 'function') {
        effect(next);
      } else if (effect.type === 'PUT') {
        console.log(`向仓库派发一个动作 ${JSON.stringify(effect.action)}`);
        next();
      } else if (effect instanceof Promise) {
        effect.then(next);
      } else {
        next();
      }
    }
  }
  next();
}
runSaga(rootSaga);