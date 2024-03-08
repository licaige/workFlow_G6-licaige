

var singleNumber = function(nums) {
    let result = null
    // 遍历数组  用每一项进行filter筛选  筛选后返回满足条件的项(数组)
  nums.forEach(item1 => {
    let res = nums.filter(item=>{
        return item == item1
    })
    // 如果返回的数组只有一位  那么此项就只有一个
    if(res.length == 1){
        result = res[0]
    }
  });
  return result
  
};



const arr = [2,2,1,1,3,4,3]
console.log(singleNumber(arr));