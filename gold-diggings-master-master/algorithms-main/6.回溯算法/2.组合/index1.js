var combine = function (n, k) {
    const res = [];
    const backtrack = (start, cur) => {
        if (cur.length === k) {
            return res.push([...cur]);
        }
        for (let i = start; i < n + 1; i += 1) {
            cur.push(i);
            backtrack(i + 1, cur);
            cur.pop();
        }
    }
    backtrack(1, []);
    return res;
}
console.log(combine(4, 2));
