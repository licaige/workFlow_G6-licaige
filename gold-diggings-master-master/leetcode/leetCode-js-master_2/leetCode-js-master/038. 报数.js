/**报数序列是指一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：
 * 1.     1
 * 2.     11
 * 3.     21
 * 4.     1211
 * 5.     111221
 *
 * 1 被读作  "one 1"  ("一个一") , 即 11。
 * 11 被读作 "two 1s" ("两个一"）, 即 21。
 * 21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。
 * 给定一个正整数 n ，输出报数序列的第 n 项。
 * 注意：整数顺序将表示为一个字符串。
 *
 * 示例 1:
 * 输入: 1
 * 输出: "1"
 *
 * 示例 2:
 * 输入: 4
 * 输出: "1211
 */


/**理解题意是关键
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    var pre = '1';
    var next = '';
    n -= 1;
    if (n === 0 ) return '1';

    for (var i = 1; i <= n; i++) {
        next = say(pre);
        pre = next;
    }

    return next;

    function say(str) {
        var result = '';
        var count = {num: null, counts: null};
        for (var i = 0, len = str.length; i < len; i++) {
            if (!count.num) {
                count.num = str[i];
                count.counts = 1;
            } else {
                if (count.num === str[i]) {
                    count.counts++;
                } else {
                    result += count.counts + '' + count.num;
                    count.num = str[i];
                    count.counts = 1;
                }
            }
        }
        result += count.counts + '' + count.num;

        return result;
    }
};