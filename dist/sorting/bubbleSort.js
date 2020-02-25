"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bubbleSort = (arr, options = { direction: 'ascending' }) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let hasSwapped = false;
        const { direction } = options;
        for (let j = 0; j < i; j++) {
            let a = arr[j];
            let b = arr[j + 1];
            if (direction === 'ascending' && a > b || direction === 'descending' && a < b) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                hasSwapped = true;
            }
        }
        if (!hasSwapped) {
            return arr;
        }
    }
    return arr;
};
// let arr = [1, 5, 3, 4, 7, 9];
exports.default = bubbleSort;
