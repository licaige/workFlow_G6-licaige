/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 2*i+1  2*i+2
// arr.length/2- 1
var topKFrequent = function(nums, k) {

    const swap = (arr,i,j)=>{
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp
    }

    const setHeap = (i,arr,length)=>{
        let k = 2*i+1;
        while(k<length){
            if(k+1<length&& arr[k][1] < arr[k+1][1]){
                k = k+1;
            }
            if(arr[i][1]<arr[k][1]){
                swap(arr,i,k)
            }else {
                break
            }
            i = k;
            k = 2*k+1
        }
    }
    // 3
    // 2   1
    // 4 5 

    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const count = map.get(nums[i]);
        if(count){
            map.set(nums[i],count+1)
        }else {
            map.set(nums[i],1)
        }
    }
    const newArray = Array.from(map);


    for(let i = parseInt(newArray.length/2) - 1;i>=0;i--){
        setHeap(i,newArray,newArray.length)
    }


    let i =0;
    const res = []
    while(k--){
        console.log(newArray)
        res.push(newArray[0][0])
        swap(newArray,0,newArray.length-i-1);
        setHeap(0,newArray,newArray.length-i-1);
        i++
    }

    return res
};

topKFrequent;
// @lc code=end
// 1 2 3 

// 1
// 1 2
// 1 1
