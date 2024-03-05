/*
 * @Author: Luzy
 * @Date: 2023-08-07 09:52:01
 * @LastEditors: Luzy
 * @LastEditTime: 2023-08-07 10:30:14
 * @Description: 
 */


// 给定 N 个人的出生年份和死亡年份，第 i 个人的出生年份为 birth[i]，死亡年份为 death[i]，实现一个方法以计算生存人数最多的年份。

// 你可以假设所有人都出生于 1900 年至 2000 年（含 1900 和 2000 ）之间。如果一个人在某一年的任意时期处于生存状态，那么他应该被纳入那一年的统计中。例如，生于 1908 年、死于 1909 年的人应当被列入 1908 年和 1909 年的计数。

// 如果有多个年份生存人数相同且均为最大值，输出其中最小的年份。



// 输入：
// birth = [1900, 1901, 1950]
// death = [1948, 1951, 2000]
// 输出： 1901


// 目标: 计算生存人数最多的年份

// 方案一  使用哈希表记录1900-2000年的年份
// 方案二  前缀累加和  
// 保存每一年的  总出生 总死亡数

// 出生  3    1    4    1
// 死亡  0    1    2    3
// 结果为总出生-总死亡数 
//      3-0  4-0  8-1  9-3


var maxAliveYear = function (birth, death) {

    const years = {}

    // 计算总出生和总死亡
    for (let y = 1900; y < 2000; y++) {
        // 初始化map
        if (!years[y]) {
            years[y] = [0, 0]
        }

        // 计算总出生
        for (let i = 0; i < birth.length; i++) {
            if (birth[i] <= y) {
                years[y][0]++
            }
        }
        // 计算总死亡
        for (let i = 0; i < death.length; i++) {
            if (death[i] < y) { // 这里是小于
                years[y][1]++
            }
        }
    }


    // 计算存活人口
    // 判断最大存活年
    let maxcount = 0
    let resYear = undefined

    for (let y in years) {
        let lives = years[y][0] - years[y][1]

        if (lives > maxcount) {
            maxcount = lives
            resYear = y
        }
    }


    return parseInt(resYear)
};


let birth = [1900, 1901, 1950],
    death = [1948, 1951, 2000]

maxAliveYear(birth, death)