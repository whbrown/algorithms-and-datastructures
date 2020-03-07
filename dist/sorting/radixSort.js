"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findDigit = (radix) => {
    // currying to avoid repeated radix param
    return (num, place) => {
        return Math.floor(num % Math.pow(radix, place) / Math.pow(radix, (place - 1)));
    };
};
exports.findDigit = findDigit;
const radixSort = () => { };
exports.default = radixSort;
