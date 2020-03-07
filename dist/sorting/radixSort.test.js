"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const radixSort_1 = require("./radixSort");
describe('findDigit fn works properly', () => {
    test('findDigit exists', () => {
        expect(typeof radixSort_1.findDigit).toBe('function');
    });
    test('findDigit works with decimal numbers', () => {
        const getDecimalDigit = radixSort_1.findDigit(10);
        const num = 3178;
        expect(getDecimalDigit(num, 1)).toBe(8);
        expect(getDecimalDigit(num, 2)).toBe(7);
        expect(getDecimalDigit(num, 3)).toBe(1);
        expect(getDecimalDigit(num, 4)).toBe(3);
    });
    test('findDigit works with binary numbers', () => {
        const getBinaryDigit = radixSort_1.findDigit(2);
        const num = 0b1101;
        expect(getBinaryDigit(num, 1)).toBe(1);
        expect(getBinaryDigit(num, 2)).toBe(0);
        expect(getBinaryDigit(num, 3)).toBe(1);
        expect(getBinaryDigit(num, 4)).toBe(1);
    });
    test('findDigit works with hex numbers', () => {
        const getHexDigit = radixSort_1.findDigit(16);
        const num = 0x3D7E9A;
        expect(getHexDigit(num, 1)).toBe(10);
        expect(getHexDigit(num, 2)).toBe(9);
        expect(getHexDigit(num, 3)).toBe(14);
        expect(getHexDigit(num, 4)).toBe(7);
        expect(getHexDigit(num, 5)).toBe(13);
        expect(getHexDigit(num, 6)).toBe(3);
    });
});
