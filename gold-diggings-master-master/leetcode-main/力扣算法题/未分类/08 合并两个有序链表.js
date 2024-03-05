


var mergeTwoLists = function(list1,list2){
    // concat数组合并后  sort数组升序排序
    let newArr = list1.concat(list2)
    let result = newArr.sort()
    return result
}

let arr = [1,4,3,5,2]
let arr2 = [1,9,3]

// console.log(mergeTwoLists(arr,arr2));


// ------------简化版--------------------
var mergeTwoLists2 = function(list1,list2){
    list2.forEach(item => {
        list1.push(item)
    });
    return list1.sort()
}

console.log(mergeTwoLists2(arr,arr2));




