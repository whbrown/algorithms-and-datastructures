"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swap = (arr, firstIndex, secondIndex) => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};
exports.default = swap;
