let nunjucks = require('nunjucks');
nunjucks.configure('views', { autoescape: true });//自动转义
const login = nunjucks.render('login.html', { name: 'zhufeng' });
console.log(login);
const reg = nunjucks.render('reg.html', { name: 'zhufeng' });
console.log(reg);
const users = nunjucks.render('users.html', { users: [{ id: 1, name: 'zhufeng1' }, { id: 2, name: 'zhufeng2' }, { id: 3, name: 'zhufeng3' }] });
console.log(users);