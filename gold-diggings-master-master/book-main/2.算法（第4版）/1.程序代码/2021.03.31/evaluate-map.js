// 不可以set会重复设置
function Evaluate(formula) {
    const ops = [];
    const vals = [];
    if (formula.indexOf('sqrt') !== -1) {
        formula = formula.replace('sqrt', '#');
    }
    console.log(formula);
    dealMath(formula, ops, vals)
    console.log(vals.pop());
}

function dealMath(formula, ops, vals) {
    formula.split('').forEach(s => {
        const map = new Map()
            .set('(', () => { })
            .set('+', ops.push(s))
            .set('-', ops.push(s))
            .set('*', ops.push(s))
            .set('/', ops.push(s))
            .set('#', ops.push(s))
            .set(')', temp(ops, vals));
        map.get(s) || vals.push(parseFloat(s));
    })
}

function temp(ops, vals) {
    let op = ops.pop();
    let v = vals.pop();
    if (op === '+') {
        v = vals.pop() + v;
    } else if (op === '-') {
        v = vals.pop() - v;
    } else if (op === '*') {
        v = vals.pop() * v;
    } else if (op === '/') {
        v = vals.pop() / v;
    } else if (op === '#') {
        v = Math.sqrt(v);
    }
    vals.push(parseFloat(v));
}

// const formula = '(1+((2+3)*(4*5)))';
const formula = '((1+sqrt(5))/2)';
Evaluate(formula);
