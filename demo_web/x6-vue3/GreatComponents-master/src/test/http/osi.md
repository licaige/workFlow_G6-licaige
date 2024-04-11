# OSI

open system interconnect 开放式通信互联系统 ISO

在世界范围内将计算机连接成为网络的框架

## 7层模型

1. 应用层 data

    app交互 特定的网络应用 进程交互规则（HTTP DNS SMTP报文）

2. 表示层 AHead data

    数据压缩、数据加密、数据内容的描述（兼容性处理、优化）

3. 会话层 head AHead data

    建立、管理、终止表示层的会话连接

4. 传输层 tcp/udp head AHead data

    不同主机进程之间的通信（数据传输的稳定性 TCP UDP）

5. 网络层 IP tcp/udp head AHead data

    路由 交互节点 分组分包（IP）

6. 数据链路层 mac IP tcp/udp head AHead data

    IP报文包 帧 head data

7. 物理层 bit流

    光纤

## 传输方式

  A主机 -> mac IP tcp/udp head AHead data -> bit流 -> B主机拆解