"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge = (arr1, arr2, options = { direction: 'ascending' }) => {
    // fat and ugly code, but fairly efficient
    // TODO: should instead infer ascending vs descending by peeking at the first two values of one of the arrays
    let newArr = [];
    let arr1Index = 0;
    let arr2Index = 0;
    const { direction } = options;
    while (newArr.length < (arr1.length + arr2.length)) {
        if (!arr2[arr2Index]) {
            newArr.push(arr1[arr1Index]);
            arr1Index++;
            continue;
        }
        else if (!arr1[arr1Index]) {
            newArr.push(arr2[arr2Index]);
            arr2Index++;
            continue;
        }
        if (direction === 'ascending' && arr1[arr1Index] <= arr2[arr2Index]
            || direction === 'descending' && arr1[arr1Index] >= arr2[arr2Index]) {
            newArr.push(arr1[arr1Index]);
            arr1Index++;
            // || direction === 'descending' && arr1[arr1Index] <= arr2[arr2Index]
        }
        if (direction === 'ascending' && arr1[arr1Index] >= arr2[arr2Index]
            || direction === 'descending' && arr1[arr1Index] <= arr2[arr2Index]) {
            newArr.push(arr2[arr2Index]);
            arr2Index++;
        }
    }
    return newArr;
};
console.log(merge([1, 2, 8, 11, 49, 99], [1, 3, 10]));
exports.default = merge;
