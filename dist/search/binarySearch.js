"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function binarySearch(arr, // array must be sorted!
val) {
    // Binary search algorithm, returns index of value if found, -1 if not.
    let left = 0;
    let right = arr.length - 1;
    if (val > arr[right] || val < arr[left])
        return -1;
    let selectedIndex = Math.floor((left + right) / 2);
    while (left < right) {
        if (arr[selectedIndex] === val)
            return selectedIndex;
        if (val < arr[selectedIndex]) {
            right = selectedIndex - 1;
        }
        else {
            left = selectedIndex + 1;
        }
        selectedIndex = Math.floor((left + right) / 2);
    }
    if (arr[selectedIndex] === val)
        return selectedIndex;
    return -1;
}
exports.default = binarySearch;
// let arr = [1, 2, 6, 9, 10, 11, 56, 101, 156];
// for (let num of [...arr, 10495, 12, 5543, 3, 54, 153]) {
//   console.log(binarySearch(arr, num), num);
// }
