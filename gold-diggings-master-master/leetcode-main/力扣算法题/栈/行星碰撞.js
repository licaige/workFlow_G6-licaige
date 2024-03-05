
// 行星碰撞

// 给定一个整数数组 asteroids，表示在同一行的行星。

// 对于数组中的每一个元素，其绝对值表示行星的大小，正负表示行星的移动方向（正表示向右移动，负表示向左移动）。每一颗行星以相同的速度移动。

// 找出碰撞后剩下的所有行星。碰撞规则：两个行星相互碰撞，较小的行星会爆炸。如果两颗行星大小相同，则两颗行星都会爆炸。两颗移动方向相同的行星，永远不会发生碰撞。


// 输入：asteroids = [5,10,-5]
// 输出：[5,10]
// 解释：10 和 -5 碰撞后只剩下 10 。 5 和 10 永远不会发生碰撞。

var asteroidCollision = function (asteroids) {

    let res = []

    // 遇到正数入栈  
    // 遇到负数 跟栈顶元素比较  进行碰撞
    for (let i = 0; i < asteroids.length; i++) {
        let b = asteroids[i]

        if (b > 0) { res.push(b) }

        else {
            debugger
            let a = res[res.length - 1]

            if ((a + b) > 0) {
                continue
            } else if ((a + b) == 0) {
                res.pop()
                continue
            } else if (a < 0 && b < 0) {
                res.push(b)
                continue
            }
            // 进行碰撞
            else {


                while (res.length) {
                    let _a = res[res.length - 1]
                    let _b = asteroids[i]

                    if ((_a + _b) < 0) {
                        res.pop()
                    } else if ((a + b) == 0) {
                        res.pop()
                        break
                    }

                    if (!res.length) {
                        res.push(_b)
                    }

                }
            }

        }
    }
};

asteroidCollision([10, 2, -5])

