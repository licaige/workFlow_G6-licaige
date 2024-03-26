# # 引入

```html
<div id="page-box"></div>

<script src="./js/LHYPage.js"></script>
```

# # 调用

```js
(function(){
    var oContainer = document.querySelector("#page-box");
    var page = new LHYPage({
        container: oContainer,
        curPage: 88,
        allPage: 100,
        callBack: function(curPage) {
            console.log(curPage);
        }
    });
})();
```

# # 参数解读

| 参数        | 描述                  | 类型       |
| --------- | ------------------- | -------- |
| container | 显示分页控件的容器           | String   |
| curPage   | 当前页码                | Number   |
| allPage   | 总页码                 | Number   |
| callBack  | 页面切换之后的回调函数（返回当前页码） | Function |

# # 类名解读

| 类名                       | 描述    | 备注     |
| ------------------------ | ----- | ------ |
| . first-page             | 首页    |        |
| . prev-page              | 上一页   |        |
| . page-box > .page       | 页码    | 中间5个页码 |
| .page-box > .cur-page    | 当前页码  |        |
| . next-page              | 下一页   |        |
| . last-page              | 尾页    |        |
| . all-page               | 总页码   |        |
| .jump-box > . jump-input | 跳转输入框 |        |
| .jump-box > .jump-btn    | 跳转按钮  |        |

# # 开发者注

该插件我没有去设置默认样式，只实现了交互功能，各部分的样式设计调用者可根据“类名解读”中的类名来设置相应的样式。