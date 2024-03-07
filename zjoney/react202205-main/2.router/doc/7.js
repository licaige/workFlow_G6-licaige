
let regexpSource = "/user/:id/:name".replace(/:(\w+)/g, (_, key) => {//key=id
  // console.log(_);
})
/**
 * :id
:name
 */


let result = '/user/age/age'.match(/\/user\/([^\/]+?)\/([^\/]+?)(\/|$)/);
console.log(result);
[
  '/user/100/a',
  '100',
  'a'
]

