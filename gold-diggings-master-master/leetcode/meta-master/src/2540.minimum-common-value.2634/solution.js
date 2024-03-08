/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var getCommon = function (nums1, nums2) {
    let index1 = 0;
    let index2 = 0;
    while (index1 < nums1.length && index2 < nums2.length) {
        const diff = nums1[index1] - nums2[index2];
        if (diff > 0) {
            index2++;
        } else if (diff < 0) {
            index1++;
        } else {
            return nums1[index1];
        }
    }

    return -1;
};
