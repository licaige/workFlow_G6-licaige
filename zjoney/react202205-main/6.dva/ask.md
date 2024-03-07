
现在reducer type 不对吧还 
肉包子
 dipatch 调用 不行吧 
14:37
bu
刚才装包包错是因为， vite创建项目安装的包的版本和 dva 自己依赖的版本冲突导致的吗？ 
是的
dva只支持17



青衣
key 不一致吧 
bu
connect第二个参数 应该传 actionCreator.counter1  

connect第二个参数是一个对象，但是此对象的第一层属性必须是函数，如果不是函数就忽略 了

肉包子
 结构出来的  都有前缀 需要处理一下 
青衣
要把前缀去掉才一致 



bu
如果新增其他中间件， 或者更改路由模式得怎么弄？ 

原始的history 监听函数参数  (history.location, history.action);

unction HistoryRouter(_a) {

   react_1.default.useLayoutEffect(function () { return history.listen(setState); }, [history]);

history5.0是有变化的
history.listen((location,action));

 4.0 
history.listen({location,action});


动态CMS前后端的项目
antdesignpro 
umi4
formily
@formily/reactivity
mobx