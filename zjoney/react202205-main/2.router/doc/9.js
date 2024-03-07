//pathnameBase
//因为*能匹配所有的内容，也需要重要重新计算 pathnameBase

let path = '/user/*';
let pathname = '/user/100/detail';
let pathRegexp = /^\/user(?:\/(.+)|\/*)$/;
let match = pathname.match(pathRegexp);
console.log(match);
let matchedPathname = match[0];//匹配的路径名
let starValue = match[1];// *这一部分对应的字符串
console.log('matchedPathname', matchedPathname);
console.log('matchedPathname.length', matchedPathname.length);
console.log('starValue', starValue);
console.log('starValue.length', starValue.length);
let pathnameBase = matchedPathname.slice(0, matchedPathname.length - starValue.length);
console.log('pathnameBase', pathnameBase);
pathnameBase = pathnameBase.replace(/(.)\/+$/, '$1');// /user/ => /user
console.log(pathnameBase);



// /user/detail/id
// ['/user/*','/detail','/id']