"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function factorial(num) {
    if (num < 0 || typeof num !== "number")
        return;
    if (num === 1 || num === 0)
        return 1;
    return num * factorial(num - 1);
}
exports.default = factorial;
