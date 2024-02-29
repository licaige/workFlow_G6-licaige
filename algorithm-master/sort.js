// js的sort()排序
function compare (a, b) {
	return a - b // 升序
	//return b - a // 降序
}
function compareNum (a, b) {
  // 以对象的某一属性值进行降序
  return b.number - a.number
}
var sortList = [5, 0, 1, 10, -5]
console.log('sort:', sortList.sort())
console.log('compare sort:', sortList.sort(compare))

// 冒泡排序
function bubbleSort (list) {
	var len = list.length
	for (var i = 0; i < len; i++) {
		for (var j = i + 1; j < len; j++) {
			if (list[i] > list[j]) {
				const temp = list[i]
				list[i] = list[j]
				list[j] = temp
			}
		}
	}
	return list
}
var bubbleList = [-5, 0, 1, 10, 5]
console.log('bubbleSort:', bubbleSort(bubbleList))

//选择排序
var selectList = [5, 0, 1, 10, -5]
// function selectSort (list) {
// 	var len = list.length
// 	var minIndex
// 	for (var i = 0; i < len-1; i++) {
// 		minIndex = i
// 		for (var j = i + 1; j < len; j++) {
// 			if (list[minIndex] > list[j]) {
// 				minIndex = j
// 			}
// 		}
//     if (minIndex !== i) {
//       const temp = list[i]
//       list[i] = list[minIndex]
//       list[minIndex] = temp
//     }
// 	}
// 	return list
// }

// 选择排序
function selectSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}

console.log('selectSort:', selectSort(selectList))

// 插入排序
var insertList = [5, 0, 1, 10, -5]
function insertSort (list) {
	var len = list.length
	var preIndex, current
	for (var i = 1; i < len; i++) {
		preIndex = i - 1
		current = list[i]
		while (preIndex >= 0 && list[preIndex] > current) {
			list[preIndex + 1] = list[preIndex]
			preIndex--
		}
		list[preIndex + 1] = current
	}
	return list
}
console.log('insertSort:', insertSort(insertList))

var nums = [1, 2, [3, [4]], 5]
console.log('flat-nums:', nums.flat())