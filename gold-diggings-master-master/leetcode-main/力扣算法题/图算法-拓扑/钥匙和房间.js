


// 841. 钥匙和房间
// https://leetcode.cn/problems/keys-and-rooms/?envType=study-plan-v2&envId=leetcode-75

var canVisitAllRooms = function (rooms) {

    // BFS 队列遍历 逐个访问房间  将钥匙推入队列尾部
    // 使用set进行钥匙判断
    const queue = [0]
    const keys = new Set([0])

    for (let i = 0; i < queue.length; i++) {
        let room = rooms[queue[i]]
        for (let j = 0; j < room.length; j++) {
            let k = room[j]
            if (!keys.has(k)) {
                queue.push(k)
                keys.add(k)
            }
        }
    }


    // 检查钥匙数量
    return keys.size == rooms.length
};

canVisitAllRooms([[1], [2], [3], []])