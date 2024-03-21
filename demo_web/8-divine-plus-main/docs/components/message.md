# Message

消息提示

## 基本用法

<MessageBase/>

## 不同状态

<MessageType/>

## Empty 组件属性

| 属性      | 描述                                          | 类型         | 可选值                             | 默认值 |
| --------- | --------------------------------------------- | ------------ | ---------------------------------- | ------ |
| message   | 消息文字                                      | string/VNode | -                                  | -      |
| type      | 主题类型                                      | string       | 'success'/'warning'/'error'/'info' | info   |
| duration  | 显示时间, 毫秒。设为 0 则不会自动关闭         | number       | 3000                               |
| showClose | 是否显示关闭按钮                              | boolean      | -                                  | false  |
| offset    | Message 距离窗口顶部的偏移量                  | number       | -                                  | 20     |
| onClose   | 关闭时的回调函数, 参数为被关闭的 message 实例 | function     | -                                  | -      |
