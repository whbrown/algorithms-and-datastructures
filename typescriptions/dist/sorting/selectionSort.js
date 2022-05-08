"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swap_1 = __importDefault(require("./swap"));
const selectionSort = (arr, options = { direction: 'ascending' }) => {
    // TODO: change to work with strings
    const { direction } = options;
    for (let i = 0; i < arr.length; i++) {
        let [compNum, compIndex] = [arr[i], i]; // compNum/Index === min or max depending on @param direction
        for (let j = i + 1; j < arr.length; j++) {
            // console.log(arr, 'arr[j]:', arr[j], 'compNum:', compNum);
            if (direction === 'ascending' && arr[j] < compNum
                || direction === 'descending' && arr[j] > compNum) {
                [compNum, compIndex] = [arr[j], j];
            }
        }
        if (compIndex !== i) {
            // swap
            swap_1.default(arr, i, compIndex);
        }
    }
    return arr;
};
// console.log(selectionSort([5, 1, 6, 3, 11, 10], 'descending'))
exports.default = selectionSort;
