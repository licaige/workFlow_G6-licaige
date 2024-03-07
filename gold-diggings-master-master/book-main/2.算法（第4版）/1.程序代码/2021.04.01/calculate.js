// 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

const s = "2-1 + 2";

var calculate = function (s) {
    const ops = [];
    const vals = [];
    s.split('').forEach((item,index,arr) => {
        if (item === '(' || item === ' ') {

        } else if (item === '+' || item === '-'){
            ops.push(item)
        }else if(item === ')'){
            let op = ops.pop();
            let v = vals.pop();
            if(op === '+'){
                v = vals.pop() + v;
            }else if(op === '-'){
                v = vals.pop() - v;
            }
            vals.push(parseFloat(v))
        }else{
            vals.push(parseFloat(item))
        }
    })
    let op = ops.pop();
    let v = vals.pop();
    if(op === '+'){
        v = vals.pop() + v;
    }else if(op === '-'){
        v = vals.pop() - v;
    }
    vals.push(parseFloat(v));
    return vals;
};
console.log(calculate(s));
