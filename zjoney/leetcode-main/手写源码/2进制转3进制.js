/**
 * 首先将二进制数转换为十进制数，
 * 然后使用循环将其转换为三进制数
 * 最后返回三进制数
 * @param {*} binary 
 * @returns 
 */
function binaryToTernary(binary) {
  let decimal = parseInt(binary, 2); 
  let ternary = '';
  while (decimal > 0) {
    ternary = (decimal % 3) + ternary; 
    decimal = Math.floor(decimal / 3);
  }
  return ternary;
}

let binaryNumber = '101010';

let ternaryNumber = binaryToTernary(binaryNumber);
console.log(ternaryNumber)// 1120