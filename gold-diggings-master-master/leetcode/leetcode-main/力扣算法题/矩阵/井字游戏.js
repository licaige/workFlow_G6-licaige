/*
 * @Author: Luzy
 * @Date: 2023-07-29 11:37:20
 * @LastEditors: Luzy
 * @LastEditTime: 2023-07-29 12:44:11
 * @Description: 
 */

// 面试题16  井字游戏
// https://leetcode.cn/problems/tic-tac-toe-lcci/?envType=study-plan-v2&envId=cracking-the-coding-interview




// 规则  某行/列全为相同时获胜
// 方案  逐步检查行列和对角线  看出是否有胜利者 
// 记录是否有空格判断平局
// 注意行列 交叉线不能为全空

var tictactoe = function (board) {
    let length = board.length
    let hasBlock = false
    let res = ""

    // 判断行
    for (let i = 0; i < length; i++) {
        let isSame = true
        for (let j = 1; j < length; j++) {
            if (board[i][j] == " ") {
                hasBlock = true
            }

            if (board[i][j] !== board[i][j - 1]) {
                isSame = false
                break
            }
        }

        if (isSame && board[i][0] !== " ") {
            res = board[i][0]
            break
        }
    }
    if (res != "") return res

    // 判断列
    for (let i = 0; i < length; i++) {
        let isSame = true
        for (let j = 1; j < length; j++) {

            if (board[j][i] == " ") {
                hasBlock = true
            }

            if (board[j][i] !== board[j - 1][i]) {
                isSame = false
                break
            }
        }

        if (isSame && board[0][i] !== " ") {
            res = board[0][i]
            break
        }
    }
    if (res != "") return res
    // 判断交叉线A
    let isSame_1 = true
    let x = 1
    let y = 1
    while (x < length) {
        if (board[y][x] != board[y - 1][x - 1]) {
            isSame_1 = false
            break
        }
        x++
        y++
    }
    if (isSame_1 && board[0][0] != " ") return board[0][0]
    
    // 判断交叉线B
    let isSame_2 = true
    let x2 = length - 2
    let y2 = 1
    while (x2 >= 0) {
        if (board[y2][x2] != board[y2 - 1][x2 + 1]) {
            isSame_2 = false
            break
        }
        x2--
        y2++
    }
    if (isSame_2 && board[0][length - 1] != " ") return board[0][length - 1]


    // 平局
    if (res == "") {
        return hasBlock ? "Pending" : "Draw"
    }
};





// x获胜  对角相连
let b1 = [
    "   X O  O ",
    " X X    O ",
    "X  X    O ",
    "X    OX O ",
    "X   XO  O ",
    "X  X O  O ",
    "O  X O  O ",
    "     O  OX",
    "     O  O ",
    "   X XXXO "]
// Draw平局  占满  无玩家获胜
let b2 = [
    "OOX",
    "XXO",
    "OXO"
]
// Pending平局  未占满  无玩家获胜  
let b3 = [
    "OOX",
    "XXO",
    "OX "
]

console.log(tictactoe(b1));