const permute = function (nums) {
    const len = nums.length, res = [], deepStack = [];
    const backtrack = (deepStack) => {
        //递归终止条件
        if (deepStack.length === len) {
            return res.push(deepStack);
        }
        for (let i = 0; i < len; i++) {
            if (!deepStack.includes(nums[i])) {
                deepStack.push(nums[i]);
                backtrack(deepStack.slice());
                deepStack.pop();
            }
        }
    }
    backtrack(deepStack);
    return res;
}
const arr = [1, 2, 3];
console.log(permute(arr));
