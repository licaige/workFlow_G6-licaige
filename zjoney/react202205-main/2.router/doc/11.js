
// path === '*' || path === '/*' ? "(.*)$" : "(?:\\/(.+)|\\/*)$"

let path = '*';// /*
let regexpSource = "(?:\\/(.+)|\\/*)$";
let pathname = '/xxx';
let result = pathname.match(regexpSource);
let starValue = result[1];
console.log(starValue);

regexpSource += end ? "\\/*$" : "(?:\b|\\/|$)"

