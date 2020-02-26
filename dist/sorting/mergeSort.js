"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = __importDefault(require("./merge"));
const mergeSort = (arr, options = { direction: 'ascending' }) => {
    if (arr.length <= 1) {
        return arr;
    }
    const { direction } = options;
    const left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)), { direction: direction });
    const right = mergeSort(arr.slice(Math.floor(arr.length / 2)), { direction: direction });
    return merge_1.default(left, right, { direction });
};
exports.default = mergeSort;
// console.log(mergeSort([72, 1, 5, 7, 2, 10, 55, 12, 33, 73], { direction: 'descending' }))
