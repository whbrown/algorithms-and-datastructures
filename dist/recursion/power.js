"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function power(base, exponent) {
    if (exponent === 0)
        return 1;
    return base * power(base, exponent - 1);
}
exports.default = power;
console.log(power(2, 4));
