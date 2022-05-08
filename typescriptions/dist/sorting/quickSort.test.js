"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quickSort_1 = __importDefault(require("./quickSort"));
let arr = [];
beforeEach(() => arr = [5, 2, 1, 8, 4, 7, 6, 3]);
describe('quicksort basic functionality', () => {
    test('quicksort exists', () => {
        expect(typeof quickSort_1.default).toBe('function');
    });
    test('quickSort returns same length array as it receives', () => {
        const originalLength = arr.length;
        expect(quickSort_1.default(arr).length).toBe(originalLength);
    });
    test('ascending: quicksort works on basic array', () => {
        quickSort_1.default(arr);
        expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });
    test('descending: quicksort works on basic array', () => {
        quickSort_1.default(arr, { direction: 'descending' });
        expect(arr).toEqual([8, 7, 6, 5, 4, 3, 2, 1]);
    });
});
