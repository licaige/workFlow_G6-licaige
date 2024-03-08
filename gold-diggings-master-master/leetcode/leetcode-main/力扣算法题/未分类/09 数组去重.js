

let arr1 = [-3,-1,-1,-1,0,1]

var removeDuplicates = function(nums) {
    let i = 0;
    for(let j = 1;j < nums.length;j++){
        if(nums[i] !== nums[j]){
            i++;
            nums[i] = nums[j]
        }
    }
    return i + 1
};

let res =removeDuplicates(arr1)
console.log(res);
console.log(arr1);



function fn (arr){
    // 先让数组从小到大排列
    arr.sort(function(n1,n2){
        return n1-n2
    })
    // 当arr[i]=arr[i+1]时  去除arr[i+1]
    // 注意 循环结束条件需要-1
    for(let i = 0;i<arr.length-1;i++){
        if(arr[i]===arr[i+1]){
            arr.splice(i,1)
        // 假设arr[0]被删除  这一次的arr[1]变成了下次的arr[0]  需要将i-- 再执行下次for循环
            i--
        }
    }
    return arr.length
}


