/*
 * @lc app=leetcode.cn id=207 lang=javascript
 *
 * [207] 课程表
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {



    const map = new Map();
    let valid = true;
    let ans = 0
    let visit = []

    const dfs=(key)=>{
        // 这种情况是 环的情况
        if(visit[key]===1){
            return valid=false;
        // 这种情况是 已经遍历过的就不遍历
        }else if(visit[key]===2){
            return
        }



        const rest = map.get(key);
        if(!rest){
            // 如果遍历到最后一个元素
            visit[key] = 2;
            ans++
        }else {
            // 还没有遍历到最后一个元素，先设置为 1 
            visit[key] = 1
            for (let i = 0; i < rest.length; i++) {
                dfs(rest[i])
            }
            // 等递归遍历完剩下的就 回溯并设计为已经遍历
            visit[key] = 2
            ans++
        }
       
    }

    // 先构造 map，会是一个图的形式

    for (let i = 0; i < prerequisites.length; i++) {
        let key = prerequisites[i][0]

        if(map.has(key)){
            map.set(key,[...map.get(key),prerequisites[i][1]])
        }else  {
            map.set(key,[prerequisites[i][1]])
        }
    }
    console.log(map)


    for (let i = 0; i < prerequisites.length; i++) {
        // 如果还没有遍历过的，就递归遍历
        if(!visit[i]){
            dfs(prerequisites[i][0])
        }
    }

    if(!valid){
        return false
    }
    return numCourses>=ans


    

};
// @lc code=end

// 4  
//1 2 
//3
