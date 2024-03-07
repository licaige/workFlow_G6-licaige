/**
 * React更新是异步的,是批量的
 * 实现原理
 * 1.同步模式
 * 2.并发模式
 */
//1.同步模式
let state=0;
let isBatchingUpdate = false;
let updateQueue = [];
function setState(newState){
  if(isBatchingUpdate){
    updateQueue.push(newState);
  }else{
    state=newState;
  }
}
function handleClick(){
    isBatchingUpdate=true;
    setState(state+1);
    setState(state+1);
    setTimeout(()=>{
        setState(state+1);
        setState(state+1);
    })
    isBatchingUpdate=false;
}
handleClick();
state=updateQueue.pop();
console.log(state);

setTimeout(()=>{
    console.log(state);
},2000);