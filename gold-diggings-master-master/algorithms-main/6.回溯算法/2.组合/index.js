var combine = function (n, k) {
    const res = [];
    const backtrack = (start, cur) => {
        if (cur.length === k) {
            return res.push(cur.slice())
        }
        for (let i = start; i < n + 1; i += 1) {
            cur.push(i);
            backtrack(i + 1, cur);
            cur.pop();
        }
    }
    backtrack(1, []);
    return res;
};

// 测试
console.log(combine(4, 2));
