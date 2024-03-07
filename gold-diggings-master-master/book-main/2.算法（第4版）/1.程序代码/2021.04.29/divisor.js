let p,q,r;
p >= 0;
q >= 0;

// 反向质因数分解
function divisor(p,q){
    if(q === 0){
        return p;
    }
    r = p%q;
    return divisor(q,r);
}
console.log(divisor(50,80));
