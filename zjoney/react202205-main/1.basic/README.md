奈斯啊小刘超奈斯
那现在是不是把所有vDom都替换了呀 
瑞思拜
这种直接replaceChildren性能是不是赶不上Vue里面打补丁这种方式 


奈斯啊小刘超奈斯
pureComponent里面自己写shouldC就把这个覆盖了么? 

11:35
难忘记nice
hookIndex其实是跟着渲染走的，所以hooks的顺序不能打乱吗，要不然hookIndex都对应不上就乱了 
奈斯啊小刘超奈斯
是的 
是的
不能在if while for 使用hooks

React Hook "React.useState" is called conditionally.if while for
React Hooks must be called in the exact same order in every component render 
 react-hooks/rules-of-hooks

不能在循环中用是因为遍历的次数不一定是吧 是的
王小玟
调用hook的时候 hookIndex怎么变化 有点不明白 
