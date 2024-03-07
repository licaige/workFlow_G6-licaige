const permute = function (nums) {
    const res = [];
    function swap(p, q) {
        if (p === q) return;
        [nums[p], nums[q]] = [nums[q], nums[p]]
    }
    function backtrack(p, q) {
        if (p === q) {
            return res.push([...nums]);
        }
        for (let i = 0; i < nums.length; i += 1) {
            swap(p, i);
            backtrack(p + 1, q);
            swap(i, p);
        }
    }
    backtrack(0, nums.length - 1);
    return res;
}

// 测试
const arr = [1, 2, 3];
console.log(permute(arr));
