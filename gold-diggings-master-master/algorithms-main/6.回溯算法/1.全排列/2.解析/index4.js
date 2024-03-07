const permute = function (nums) {
    const len = nums.length, res = [], deepStack = [];
    const backtrack = (deepStack) => {
        if (deepStack.length === len) {
            return res.push(deepStack.slice());
        }
        for (let i = 0; i < len; i += 1) {
            if (!deepStack.includes(nums[i])) {
                deepStack.push(nums[i]);
                backtrack(deepStack);
                deepStack.pop();
            }
        }
    }
    backtrack(deepStack);
    return res;
}

console.log(permute([1, 2, 3]));
