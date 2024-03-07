const { pathToRegexp } = require('path-to-regexp');
const regexp = pathToRegexp('/home', [], { end: false })
//end:true ^\/home[\/#\?]?$
console.log(regexp);
/* console.log(regexp.test('/home'));
console.log(regexp.test('/home/'));
console.log(regexp.test('/home#'));
console.log(regexp.test('/home?'));
console.log(regexp.test('/home/add')); */
//  ^\/home  (?:[\/#\?](?=[]|$))? (?=[\/#\?]|[]|$)
//    /home  ([\/#\?](?=[]|$))?

//    /home
console.log(regexp.test('/home/add'));
//?:
//?=