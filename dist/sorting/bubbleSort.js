"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swap_1 = __importDefault(require("./swap"));
const bubbleSort = (arr, options = { direction: 'ascending' }) => {
    // TODO: change to work with strings
    for (let i = arr.length - 1; i > 0; i--) {
        let hasSwapped = false;
        const { direction } = options;
        for (let j = 0; j < i; j++) {
            let a = arr[j];
            let b = arr[j + 1];
            if (direction === 'ascending' && a > b || direction === 'descending' && a < b) {
                swap_1.default(arr, j, j + 1);
                hasSwapped = true;
            }
        }
        if (!hasSwapped) {
            return arr;
        }
    }
    return arr;
};
let arr = [1, 5, 3, 4, 7, 9];
console.log(bubbleSort(arr));
exports.default = bubbleSort;
