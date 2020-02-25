"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function maxSubArraySum(array, windowSize) {
    // return max sum of a continuous subarray of length windowSize
    if (!array.length)
        return null;
    let windowSum = array.slice(0, windowSize).reduce((a, b) => a + b);
    let maxSum = windowSum;
    for (let i = 0; i <= array.length - windowSize; i++) {
        console.log(windowSum, maxSum);
        maxSum = Math.max(maxSum, windowSum);
        windowSum -= array[i];
        windowSum += array[i + windowSize];
    }
    return maxSum;
}
exports.default = maxSubArraySum;
console.log(maxSubArraySum([2, 6, 9, 2, 1, 8, 5, 6, 2], 3));
