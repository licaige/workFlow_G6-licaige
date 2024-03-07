//批量是通过更新优先级的机制实现的 

let state=0;
let isBatchingUpdate = false;
let updateQueue = [];
function setState(newState){
  //创建一个更新,每个更新会有一个优先级
  //优先级相同的更新会被合并
  let update = {payload:newState,priority:0};
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