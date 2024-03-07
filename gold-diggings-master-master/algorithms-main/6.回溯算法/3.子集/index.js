var subsets = function (nums) {
    const res = [];
    const dfs = (start, cur) => {
        if (start === nums.length) {
            return res.push(cur.slice());
        };
        cur.push(nums[start]);
        dfs(start + 1, cur);
        cur.pop();
        dfs(start + 1, cur);
    };
    dfs(0, []);
    return res;
};

// 测试
const arr = [1, 2, 3];
console.log(subsets(arr));
