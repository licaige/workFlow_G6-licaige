
// path === '*' || path === '/*' ? "(.*)$" : "(?:\\/(.+)|\\/*)$"

let path = '*';// /*
let regexpSource = "(.*)$";
let pathname = '/user/add';
let result = pathname.match(regexpSource);
let starValue = result[1];
console.log(starValue);