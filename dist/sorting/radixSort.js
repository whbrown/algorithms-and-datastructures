"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findDigit = (radix) => {
    // currying to avoid repeated radix param
    return (num, place) => {
        return Math.floor(Math.abs(num) % Math.pow(radix, place) / Math.pow(radix, (place - 1)));
    };
};
exports.findDigit = findDigit;
const digitCount = (radix) => {
    return (num) => num.toString(radix).length;
};
exports.digitCount = digitCount;
const maxDigitCount = (nums, radix) => {
    if (!nums.length)
        return null;
    return nums.reduce((max, current) => {
        const currentDigitCount = digitCount(radix)(current);
        if (currentDigitCount > max) {
            max = currentDigitCount;
        }
        return max;
    }, 0);
};
exports.maxDigitCount = maxDigitCount;
const radixSort = (arr, radix) => {
    const getDigit = findDigit(radix); // make appropriate getDigit fn for radix of our nums[]
    if (!arr.length)
        return null;
    const maxDigits = maxDigitCount(arr, radix);
    for (let place = 1; place <= maxDigits; place++) {
        // first initialize buckets to place digits
        let buckets = []; // array of arrays (one array for each unique digit)
        for (let digit = 0; digit < radix; digit++) {
            buckets.push([]);
        }
        // now loop over arr
        for (let num of arr) {
            let bucket = getDigit(num, place);
            buckets[bucket].push(num);
        }
        arr = buckets.reduce((newArr, bucket) => {
            return newArr.concat(bucket);
        }, []);
    }
    return arr;
};
exports.default = radixSort;
