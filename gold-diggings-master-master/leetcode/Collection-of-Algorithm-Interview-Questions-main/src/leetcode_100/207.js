/**
 * 课程表HOT
 * https://leetcode.cn/problems/course-schedule/description/
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
// 有向无环图
var canFinish = function(numCourses, prerequisites) {
  // 构造图，使用邻接表构造
  const edges = [...Array(numCourses)].map(() => []);
  // 根据课程表，prerequisites[1]是前置课程，所以要放在路径的前面
  for (const [back, front] of prerequisites) {
    edges[front].push(back);
  }
  // 使用栈记录遍历的节点
  const visited = [];
  // 标记是否存在环
  let valid = true;
  // 深度优先遍历
  const dfs = (u) => {
    // 初始状态为1，表示正在以u为起点，遍历其邻接的节点
    visited[u] = 1;
    // 遍历u节点的相邻节点
    for (const v of edges[u]) {
      // 状态为0表示当前节点未被访问，因此访问完此节点以后，继续遍历下一个相邻节点
      if (!visited[v]) {
        dfs(v);
        // 如果访问的路径中出现了环，则剩余的节点不需要再遍历了
        if (!valid) return;
      } else if (visited[v] === 1) {
        // 如果u的相邻节点状态又出现了1，表示正在访问，说明出现了环，才会导致路径重复访问
        valid = false;
        return;
      }
    }
  };
  // 从课程中选取节点开始遍历
  for (let i = 0; i < numCourses; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  return valid;
};
