"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selectionSort = (arr, options = { direction: 'ascending' }) => {
    // TODO: change to work with strings
    const { direction } = options;
    for (let i = 0; i < arr.length; i++) {
        let [compNum, compIndex] = [arr[i], i]; // compNum/Index === min or max depending on @param direction
        for (let j = i; j < arr.length; j++) {
            // console.log(arr, 'arr[j]:', arr[j], 'compNum:', compNum);
            if (direction === 'ascending' && arr[j] < compNum
                || direction === 'descending' && arr[j] > compNum) {
                [compNum, compIndex] = [arr[j], j];
            }
        }
        [arr[i], arr[compIndex]] = [arr[compIndex], arr[i]];
    }
    return arr;
};
// console.log(selectionSort([5, 1, 6, 3, 11, 10], 'descending'))
exports.default = selectionSort;
