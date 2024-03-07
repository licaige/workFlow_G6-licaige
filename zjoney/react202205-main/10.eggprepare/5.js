const Mock = require('mockjs');
let result = Mock.mock({
  "code": 0,
  message: '成功',
  "data|2": [
    {
      "id": "@id",
      "ip": "@ip",
      "name": "@cname",
      "userId": "@id",
      "stars|2": ['*'],
      "colors|2": { red: 'red', yellow: 'yellow', blue: 'blue' },
      "avatar": "@image()",
      "createAt": "@datetime"
    }
  ]
});
console.log(JSON.stringify(result));