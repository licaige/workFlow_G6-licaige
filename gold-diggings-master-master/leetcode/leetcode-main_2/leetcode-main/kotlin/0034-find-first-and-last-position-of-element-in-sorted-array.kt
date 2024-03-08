//same solution but with function
class Solution {
    fun searchRange(nums: IntArray, target: Int): IntArray {
        val res = intArrayOf(-1,-1)
        
        fun binarySearch(getLeft: Boolean): Int{
            var left = 0
            var right = nums.size-1
            var pos = -1
            while(left <= right){
                val mid = (left + right) / 2
                if(target > nums[mid]){
                    left = mid + 1
                }else if(target < nums[mid]){
                    right = mid - 1
                }else{
                    pos = mid
                    if(getLeft)
                        right = mid -1
                    else
                        left = mid + 1
                }
            }    
            return pos
        }
        
        res[0] = binarySearch(true)
        res[1] = binarySearch(false)
        
        return res
    }
}
