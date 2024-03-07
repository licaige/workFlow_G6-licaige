const array = [1, 6, 10, 15, 17, 21, 29, 35, 39, 45, 90, 150, 254];
const searchValue1 = 10;
const searchValue2 = 1;

function binarySearch(value, array) {
    let startValue = 0;
    let endValue = array.length - 1;
    while (startValue <= endValue) {
        let midValue = parseInt((startValue + endValue) / 2);
        if (value < array[midValue]) {
            endValue = midValue - 1;
        } else if (value > array[midValue]) {
            startValue = midValue + 1;
        } else {
            return midValue;
        }
    }
    return -1
}
console.log(binarySearch(searchValue2, array));