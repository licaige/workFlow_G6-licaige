import path from 'path';
import express from 'express';
import ejs from 'ejs';
import config from './config.js';

const { port, host, __dirname } = config;
const app = express();

app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'html');

app.get('/', function (req, res) {
  res.render('iframe.html');
});

// 启动node 服务
app.listen(port.micro, host);
console.log(`server start at http://${host}:${port.micro}/`);