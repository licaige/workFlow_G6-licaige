let nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: true });//自动转义
//let result = nunjucks.renderString('hello {{username}}', { username: 'zhufeng' });
//过滤器
//let result = nunjucks.renderString('{{names|join(",")}}', { names: ['zhufeng1', 'zhufeng2'] });
//先替换再转首字母大写
//let result = nunjucks.renderString('{{word|replace("hello","world")|capitalize}}', { word: 'hello' });

/* let result = nunjucks.renderString(`
{% if score > 90 %}
优
{% elseif score >80 %}
良
{% elseif score >70 %}
中
{% elseif score >60 %}
及格
{% else %}
不及格
{% endif %}
`, { score: 79 }); */
//for 可以遍历数组或者对象
let result = nunjucks.renderString(`
  <ul>
    {% for item in users%}
      <li>第{{loop.index}}名{{item.id}}:{{item.name}}</li>
    {% endfor %}
  </ul>
`, { users: [{ id: 1, name: 'zhufeng1' }, { id: 2, name: 'zhufeng2' }, { id: 3, name: 'zhufeng3' }] });

console.log(result);