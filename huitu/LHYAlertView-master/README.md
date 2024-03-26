# User Guide

引入  `LHYAlertView.css` / `LHYAlertView.js`，调用语法如下：

```javascript
new LHYAlertView({ options...})
```

## 配置参数

| 键              | 值                                        |
| -------------- | ---------------------------------------- |
| type           | 弹出框类型，默认为“default”，支持default/alert/confirm/prompt。 |
| title          | 标题，默认为“温馨提示”。                            |
| message        | 显示文本信息。                                  |
| autoClose      | 指定弹出框自动关闭时间，默认不自动关闭，如果需要自动关闭，则设值为毫秒时间即可，如弹出框出现1秒钟后自动关闭弹出框，则直接设置其值为1000即可。 |
| placeholder    | 输入框占位符，针对于prompt类型时使用。                   |
| cancelTitle    | 取消按钮标题，默认为“取消”                           |
| sureTitle      | 确定按钮标题，默认为“确定”                           |
| cancelCallBack | 点击取消按钮时的回调函数                             |
| sureCallBack   | 点击确定按钮时的回调函数                             |

## 使用示例

### 1. 默认弹出框

```javascript
btn1.onclick = function () {
        new LHYAlertView({
            type: "default",
            autoClose: 1000,
            message: "恭喜您，登陆成功！"
        });
    };
```

### 2. 警告框

```javascript
btn2.onclick = function () {
        new LHYAlertView({
            type: "alert",
            message: "您确定要退出游戏吗？"
        });
    };
```

### 3. 确认框

```javascript
btn3.onclick = function () {
        new LHYAlertView({
            type: "confirm",
            title: "xxx 提示",
            message: "您确定要退出登录吗？",
            sureCallBack: function () {
                console.log("用户点击了确定按钮！");
            },
            cancelCallBack: function () {
                console.log("用户点击了取消按钮！");
            }
        });
    };
```

### 4. 输入框

```javascript
btn4.onclick = function () {
        new LHYAlertView({
            type: "prompt",
            title: "xxx 提示",
            placeholder: "请输入您的身份证号！",
            sureCallBack: function (text) {
                console.log(text);
            },
            cancelCallBack: function () {
                console.log("用户点击了取消按钮！");
            }
        });
    };
```

## 在线示例

https://lihongyao.github.io/components/LHYAlertView/index.html



