let express = require('express');
let nunjucks = require('nunjucks');
const path = require('path');
let app = express();
nunjucks.configure(path.resolve(__dirname, 'views'), {
  autoescape: true,//自动转义
  express: app//用的是express
});
app.get('/', (req, res) => {
  res.render('index.html', { username: 'zhufeng{{}} &;nbsp;<script/>' });
});
app.listen(3000, () => console.log('3000'));