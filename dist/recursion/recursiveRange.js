"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function recursiveRange(num) {
    if (num <= 0)
        return 0;
    return num + recursiveRange(num - 1);
}
exports.default = recursiveRange;
console.log(recursiveRange(10));
