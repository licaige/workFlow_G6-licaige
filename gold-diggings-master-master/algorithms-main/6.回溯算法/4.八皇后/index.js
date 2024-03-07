var solveNQueens = function (n) {
    const res = [], deepStack = [];
    const backtrack = (deepStack) => {
        if (deepStack.length === n) {
            return res.push(deepStack);
        }
        for (let i = 0; i < n; i += 1) {
            if (!deepStack.includes('Q')) {
                deepStack.push('Q');
                backtrack(deepStack.slice());
                deepStack.pop();
            } else {
                deepStack.push('.');
            }
        }
    };
    backtrack(deepStack);
    return res;
};
console.log(solveNQueens(4));
