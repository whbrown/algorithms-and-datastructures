"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function productOfArray(arr) {
    if (!arr.length)
        return 1;
    else {
        return arr[0] * productOfArray(arr.slice(1));
    }
}
exports.default = productOfArray;
