



var drawLine = function (length, w, x1, x2, y) {
    // w为屏幕宽度  
    let a = (w - x1) % 32
    let start = w - x1 - a

    let b = (w - x2) % 32
    let end = x2 + b
    debugger
    let part1 = new Array(start / 32).fill(0)
    let part3 = new Array(w - x2 + b / 32).fill(0)
    // 将直线所在行分割为多个32长度的片段

    let part2 = []
    let p = ""

    for (let i = start; i < end; i++) {

        if (i >= x1 && i <= x2) {
            p += "1"
        } else {
            p += "0"
        }

        if (p.length >= 32) {
            part2.push(p)
            p = ""
        }
    }


    debugger

};


let length = 1, w = 32, x1 = 30, x2 = 31, y = 0
drawLine(length, w, x1, x2, y)