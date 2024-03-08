

// Dota2 参议院

// https://leetcode.cn/problems/dota2-senate/?envType=study-plan-v2&envId=leetcode-75


// 实际上就是
// RRDDD   每轮前面的会删除后面一位敌对的元素

// 动态删除R删除后面的D  D删除后面的R  查看最终存活的元素种类
// RRDDD = RRDDDRRDDD -> RRD -> R 




var predictPartyVictory = function (senate) {
    let res = undefined
    let queue = senate.split("")
    debugger
    const check = () => {
        if (queue.indexOf('R') == -1) {
            res = "Dire"
        }
        if (queue.indexOf('D') == -1) {
            res = "Radiant"
        }
    }

    // 删除后面的成员 menber== "R"|"D"
    const del = (i, menber) => {

        let round = 0

        while (i <= queue.length) {
            if (queue[i] == menber) {
                queue.splice(i, 1)
                break
            }
            i++

            if (i == queue.length) {
                if (round == 0) {
                    i = 0
                    round++
                } else {
                    break
                }
            }
        }
    }

    // 多轮遍历
    const deep = () => {
        queue.forEach((item, i) => {
            if (item == "R") { del(i, "D") }
            else { del(i, "R") }
        })

        check()
        if (!res) {
            deep()
        }
    }

    deep()


    return res
};


predictPartyVictory("RDD")