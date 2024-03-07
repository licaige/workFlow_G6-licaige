var permute = function (nums) {
    const len = nums.length, res = [], deepStack = [];
    const backtrack = function (deepStack) {
        if (deepStack.length === len) {
            return res.push(deepStack);
        };
        for (let i = 0; i < len; i++) {
            if (!deepStack.includes(nums[i])) {
                deepStack.push(nums[i]);
                backtrack(deepStack.slice());
                deepStack.pop();
            };
        }
    }
    backtrack(deepStack);
    return res;
}
