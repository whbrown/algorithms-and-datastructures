"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge = (arr1, arr2, options = { direction: 'ascending' }) => {
    // O(n+m) time
    // Takes two sorted arrays and merges them into one.
    let newArr = [];
    let arr1Index = 0;
    let arr2Index = 0;
    const { direction } = options;
    while (newArr.length < (arr1.length + arr2.length)) {
        if (!arr2[arr2Index]) {
            return newArr.concat(arr1.slice(arr1Index));
        }
        else if (!arr1[arr1Index]) {
            return newArr.concat(arr2.slice(arr2Index));
        }
        if (direction === 'ascending' && arr1[arr1Index] <= arr2[arr2Index]
            || direction === 'descending' && arr1[arr1Index] >= arr2[arr2Index]) {
            newArr.push(arr1[arr1Index]);
            arr1Index++;
        }
        if (direction === 'ascending' && arr1[arr1Index] >= arr2[arr2Index]
            || direction === 'descending' && arr1[arr1Index] <= arr2[arr2Index]) {
            newArr.push(arr2[arr2Index]);
            arr2Index++;
        }
    }
    return newArr;
};
exports.default = merge;
