// 默认字符串s与字符串t长度相同
let s = 'abcd';
let t = 'bcdf';
let i = 2;

// 1.知识点，字符串在js中某种意义上是常量，请查阅红宝书相关章节


function equalSubstring(s, t, i) {
    console.log(s[i]);
    console.log(t[i]);
    s.replace(1, s[i])
    if (i > s.length) return
    let temp = s[i];
    t[i] = 1;
    return {
        s: s,
        t: t
    }
}
console.log(equalSubstring(s, t, i));