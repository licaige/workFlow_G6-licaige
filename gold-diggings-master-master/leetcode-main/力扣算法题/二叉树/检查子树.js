

// 检查子树。你有两棵非常大的二叉树 上万个节点
// 设计算法  判断 T2 是否为 T1 的子树。

// 如果 T1 有这么一个节点 n，其子树与 T2 一模一样，则 T2 为 T1 的子树，
// 也就是说，从节点 n 处把树砍断，得到的树与 T2 完全相同。


// 方案一  找到母树所有节点跟子树相同root的节点  保存节点进行遍历检查
// 检查方案  用二叉树构造字符串  比较两个字符串

var checkSubTree = function (t1, t2) {
    let res = false

    // 用二叉树构造字符串
    const check = (root) => {
        let res = ""
        const accumulate = (root) => {
            res += root.val
            root.left && accumulate(root.left)
            root.right && accumulate(root.right)
        }
        accumulate(root)

        return res
    }


    const s2 = check(t2)

    const dfs = (root) => {
        if (root.val == t2.val) {
            const s1 = check(root)
            if (s1 == s2) {
                res = true
                return
            }
        }

        root.left && dfs(root.left)
        root.right && dfs(root.right)
    }

    dfs(t1)

    return res
};