const { pathToRegexp } = require('path-to-regexp');
const params = [];
const regexp = pathToRegexp('/user/:id/:name', params, { end: false, sensitive: true })
/* console.log(regexp, params);
//:id => [^\\/#\\?]+?
///^\/user(?:\/([^\/#\?]+?))[\/#\?]?$/ 
console.log('/user/add'.match(regexp));
console.log('/user/100'.match(regexp));
console.log('/user/100/'.match(regexp));
console.log('/user/100?'.match(regexp));
console.log('/user/100#'.match(regexp)); */
let result = '/user/100/zhufeng'.match(regexp);
console.log(result);

const paramNames = params.map(item => item.name);//[ 'id', 'name' ]
const memo = paramNames.reduce((memo, name, index) => {
  memo[name] = result[index + 1];
  return memo;
}, {});
console.log(memo);//{ id: '100', name: 'zhufeng' }