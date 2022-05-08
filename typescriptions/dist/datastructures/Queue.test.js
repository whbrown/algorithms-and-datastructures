"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = __importDefault(require("./Queue"));
let queue = new Queue_1.default();
beforeEach(() => queue = new Queue_1.default());
describe('base functionality', () => {
    test('queue class exists', () => {
        expect(typeof queue).toBe('object');
    });
    test('enqueue method exists', () => {
        expect(queue.enqueue).toBeTruthy();
    });
    test('dequeue method exists', () => {
        expect(queue.dequeue).toBeTruthy();
    });
    test('get method exists', () => {
        expect(queue.get).toBeTruthy();
    });
    test('set method exists', () => {
        expect(queue.set).toBeTruthy();
    });
    test('enqueue method works', () => {
        var _a, _b;
        queue.enqueue('1');
        queue.enqueue('2');
        queue.enqueue('3');
        expect(queue).toHaveLength(3);
        expect((_a = queue.back) === null || _a === void 0 ? void 0 : _a.data).toBe('3');
        expect((_b = queue.front) === null || _b === void 0 ? void 0 : _b.data).toBe('1');
    });
    test('dequeue method works', () => {
        var _a, _b;
        expect(queue.dequeue()).toBeUndefined();
        queue.enqueue('1');
        queue.enqueue('2');
        queue.enqueue('3');
        queue.dequeue();
        expect(queue).toHaveLength(2);
        expect((_a = queue.back) === null || _a === void 0 ? void 0 : _a.data).toBe('3');
        expect((_b = queue.front) === null || _b === void 0 ? void 0 : _b.data).toBe('2');
    });
    test('get and set methods work', () => {
        var _a, _b;
        try {
            queue.set('Mad Hatter', 1);
        }
        catch (e) {
            expect(e).toBeTruthy();
        }
        queue.enqueue('March Hare');
        queue.set('The Dormouse', 0);
        queue.set('Alice', 0);
        expect((_a = queue.front) === null || _a === void 0 ? void 0 : _a.data).toBe('Alice');
        expect((_b = queue.back) === null || _b === void 0 ? void 0 : _b.data).toBe('Alice');
        expect(queue).toHaveLength(1);
    });
});
