



var longestCommonPrefix = function(strs) {
    var re = '';
    if (!strs.length) return re;
    for (var j=0;j<strs[0].length;j++){//第j位
        for (var i=1;i<strs.length;i++){//第i个
            if (strs[i][j]!=strs[0][j]) return re
        }
        re += strs[0][j];
    }
    return re;
};



var longestCommonPrefix = function(strs) {
   var result = ''
   for(let i=0;i<strs[0].length;i++){
       let flag = strs[0][i]
       for(let j=1; j<strs.length; j++){
           if(flag!=strs[j][i]) return result
       }
       result += flag
   }
   return result
};

