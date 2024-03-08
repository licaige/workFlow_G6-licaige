
// 判断一个数字是否为回文数  121 = true 
//                         -121 = false        
//                         123 =false

var isPalindrome = function(x) {
    let result =x.toString().split('').reverse().join('')-0
     res = result===x 
                    ? true
                    : false
     return res

};






console.log(isPalindrome(-1));