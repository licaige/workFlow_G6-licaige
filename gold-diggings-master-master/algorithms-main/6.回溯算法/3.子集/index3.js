var subsets = function (nums) {
    const res = [];
    const dfs = (start, cur) => {
        if (start === nums.length) {
            return res.push([...cur]);
        }
        dfs(start + 1, cur);
        cur.push(nums[start]);
        dfs(start + 1, cur);
        cur.pop();
    };
    dfs(0, [])
    return res;
}

// 测试
console.log(sunsets([1, 2, 3]));
