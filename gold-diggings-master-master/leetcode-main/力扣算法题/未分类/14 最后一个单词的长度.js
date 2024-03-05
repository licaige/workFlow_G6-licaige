
// 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中最后一个单词的长度。

// 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。
// 输入：s = "   fly me   to   the moon  "
// 输出：4



var lengthOf = function(s){
    // 以空格拆分
    let arr =s.trim().split(' ')
    // 返回最后的单词
    let word = arr[arr.length-1]
    // 返回单词长度
    console.log(word.length);
    return word.length
}






var lengthOf1 = function(s){
    return s.trim().split(' ').pop().length
}


// 指针从后往前刷   如果指针指向' ' 结果不变  
// 指针指向字母 result++  
// 如果指针指向空格且result不为0  返回结果
var lengthOf2 = function(s){
       let result = 0
       let flag = ' '
   for(let i=s.length-1;i>=0;i--){
           flag = s[i]
       if(flag!=' '){ result++ } 
       else if(flag===' '&& result>0 ){   
           return result 
        }
   }
   return result
}




var lengthOf2 = function(s){
     var arr=s.split(' ');
     arr = arr.filter((x) => x != "");
     return arr[arr.length - 1].length;
}


 
lengthOf2("   fly me   to   the moon  ")
console.log(lengthOf2("  "));