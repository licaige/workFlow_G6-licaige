function Evaluate(formula) {
    const ops = [];
    const vals = [];

    if (formula.indexOf('sqrt') !== -1) {
        formula = formula.replace('sqrt', '#');
    }
    console.log(formula);
    formula.split('').forEach(s => {
        if (s === '(') {

        } else if (s === '+') {
            ops.push(s);
        } else if (s === '-') {
            ops.push(s);
        } else if (s === '*') {
            ops.push(s);
        } else if (s === '/') {
            ops.push(s)
        } else if (s === '#') {
            ops.push(s)
        } else if (s === ')') {
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
        } else {
            vals.push(parseFloat(s));
        }
    })
    console.log(vals.pop());
}
// const formula = '(1+((2+3)*(4*5)))';
const formula = '((1+sqrt(5))/2)';
Evaluate(formula);
