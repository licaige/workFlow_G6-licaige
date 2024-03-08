/**
 * 盛最多水的容器HOT
 * https://leetcode-cn.com/problems/container-with-most-water/
 * @param {*} height 
 * @returns 
 */
// 双指针
var maxArea = function(height) {
  let l = 0, r = height.length - 1, ans = 0;
  while (l < r) {
      // 获取当前左右指针为边界的面积，如果面积比记录的大，则更换记录的最大面积
      const area = Math.min(height[l], height[r]) * (r - l);
      if (area > ans) {
          ans = area;
      }
      // 如果左指针的值比右指针的值小，则左指针向右移动，否则右指针向左移动
      // 假设x < y，它们的距离为t，则构成的面积为min(x,y)*t也就是x*t
      // 如果假设移动右指针，得到的值为y1，距离为t1，肯定知道t1<t
      // 此时如果y1<y,那么y1<x,那么min(x,y1)*t1<min(x,y)*t
      // 如果y1>y，那么min(x,y1) = x，也就是min(x,y1)*t1 = x*t1 < x*t
      // 所以无论右指针如何移动，都是min(x,yt)*t1 < min(x,y)*t1
      // 所以移动那个较小的值的指针
      if (height[l] <= height[r]) {
          l++;
      } else {
          r--;
      }
  }
  return ans;
};
