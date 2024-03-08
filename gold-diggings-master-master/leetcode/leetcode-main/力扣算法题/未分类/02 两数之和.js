
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/two-sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



// 普通写法
var twoSum = function(nums, target) {

    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            result = nums[i]+nums[j]
            if(result == target){
                return [i,j]
            }
        }
    }
};


// 利用target减去一项再进行查找
var twoSum = function(nums, target) {
    const arr = []
    nums.forEach(element => {
        let a = target-element
        
    });

};

console.log(twoSum([2,7,11,15],9));