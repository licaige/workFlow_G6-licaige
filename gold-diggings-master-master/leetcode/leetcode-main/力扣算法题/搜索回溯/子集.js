//幂集。编写一种方法，返回某集合的所有子集。集合中不包含重复的元素。

// 说明：解集不能包含重复的子集。



// path ：当前的集合
// index：当前选择的范围的起点
// 构建回溯树

//       root 
//    1   2   3  可获得 1 2 3
//   2 3  3      可获得 12 13 23
//  3            可获得 123




var subsets = function (nums) {
    const res = []

    const dfs = (path, index) => {

        res.push([...path])

        for (let i = index; i < nums.length; i++) {
            dfs([...path, nums[i]], i + 1)
        }
    }

    dfs([], 0);

    return res;
};


// 方案二 
var subsets = function (nums) {
    const res = [];

    const dfs = (path, index) => {
        res.push(path.slice());  // 使用slice比展开运算符更快
        for (let i = index; i < nums.length; i++) {
            path.push(nums[i]);
            dfs(path, i + 1);
            path.pop(); // 添加后使用pop还原path,用于下个循环,节约空间
        }
    };

    dfs([], 0);
    return res;
};


subsets([1, 2, 3])