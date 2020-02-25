"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fib(targetNum) {
    if (targetNum <= 0)
        return;
    if (targetNum === 1 || targetNum === 2)
        return 1;
    return fib(targetNum - 1) + fib(targetNum - 2);
}
exports.default = fib;
