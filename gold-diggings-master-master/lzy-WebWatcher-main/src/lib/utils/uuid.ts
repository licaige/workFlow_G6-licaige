

/**
 * 补全字符
 * @param {*} num 初始值
 * @param {*} len 需要补全的位数
 * @param {*} placeholder 补全的值
 * @returns 补全后的值
 */
function pad(
    num: number,
    len: number,
    placeholder: string = '0'
) {
    const str = String(num);
    if (str.length < len) {
        let result = str;
        for (let i = 0; i < len - str.length; i += 1) {
            result = placeholder + result;
        }
        return result;
    }
    return str;
}

/**
 * 获取一个全局唯一随机字符串
*/
export function uuid() {
    const date = new Date();
    // 获取日期并补全
    let year = date.getFullYear()
    let month = pad(date.getMonth() + 1, 2)
    let day = pad(date.getDate(), 2)
    let hour = pad(date.getHours(), 2)
    let minute = pad(date.getMinutes(), 2)
    let second = pad(date.getSeconds(), 2)
    let millisecond = pad(date.getMilliseconds(), 3)

    // yyyy-MM-dd的16进制表示,7位数字
    const hexDate = parseInt(`${year}${month}${day}`, 10).toString(16);

    // hh-mm-ss-ms的16进制表示，最大也是7位
    const hexTime = parseInt(`${hour}${minute}${second}${millisecond}`, 10).toString(16);

    // 第8位数字表示后面的time字符串的长度
    let guid = hexDate + hexTime.length + hexTime;

    // 补充随机数，补足32位的16进制数
    while (guid.length < 32) {
        guid += Math.floor(Math.random() * 16).toString(16);
    }

    // 分为三段，前两段包含时间戳信息
    return `${guid.slice(0, 8)}-${guid.slice(8, 16)}-${guid.slice(16)}`;
}