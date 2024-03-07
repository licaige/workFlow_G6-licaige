//使用nunjucks渲染字符串
let nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: true });//自动转义
let result = nunjucks.renderString('hello {{username}} { <', { username: 'zhufeng' });
console.log(result);
/* nunjucks.configure('views', { autoescape: true });
const result = nunjucks.render('index.html', { username: 'zhufeng' });
console.log(result);
 */