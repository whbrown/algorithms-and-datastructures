"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function linearSearch(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
    return -1;
}
exports.default = linearSearch;
