const Mock = require('mockjs');
const express = require('express');
const logger = require('morgan');
const app = express();
//日志中间件，当客户端访问服务器的会打印访问的日志
app.use(logger('dev'));
app.get('/news', (req, res) => {
  let result = Mock.mock({
    "data|10": [
      {
        "id": "@id",
        "title": "@csentence",
        "url": "@url",
        "image": "@image(300X200)",
        "createAt": "@datetime"
      }
    ]
  });
  res.json(result);
});
app.get('/refresh', (req, res) => {
  res.json({ title: '新闻列表' + new Date().toLocaleTimeString() });
});

app.listen(3000, () => console.log('mock server is started at port 3000'));