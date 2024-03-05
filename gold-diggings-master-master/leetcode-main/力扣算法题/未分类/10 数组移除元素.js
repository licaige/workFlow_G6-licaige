
// 数组删除指定元素
// 输入：nums = [3,2,2,3], val = 3
// 输出：2, nums = [2,2]


// 只能返回结果数组的长度  不能得到结果数组
var removeElement1 = function(nums, val) {
    let flag =0
    nums.forEach(item => {
        if(item!=val){
            nums[flag] = item
            flag++
        }
    });
    return flag
};




const nums1 = [3,2,2,3], 
      val1 = 3

removeElement2(nums1, val1)





// ---------------拷贝覆盖---------------
