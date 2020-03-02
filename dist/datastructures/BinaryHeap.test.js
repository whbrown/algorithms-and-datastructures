"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryHeap_1 = __importDefault(require("./BinaryHeap"));
let MaxBH = new BinaryHeap_1.default('max');
let MinBH = new BinaryHeap_1.default('min');
beforeEach(() => {
    MaxBH = new BinaryHeap_1.default('max');
    MinBH = new BinaryHeap_1.default('min');
});
describe('max binary heap base functionality', () => {
    test('insert method exists', () => {
        expect(typeof MaxBH.insert).toBe('function');
    });
});
describe('max binary heap insert method tests', () => {
    test('can insert value as root', () => {
        MaxBH.insert(100);
        expect(MaxBH.values).toEqual([100]);
    });
    test('inserting a small number first then larger will result in the larger value bubbling up', () => {
        MaxBH.insert(25);
        MaxBH.insert(100);
        expect(MaxBH.values).toEqual([100, 25]);
    });
    test('inserting many small numbers first then larger will result in the larger value bubbling up to root, and a proper max binary heap', () => {
        MaxBH.insert(25);
        MaxBH.insert(30);
        MaxBH.insert(35);
        MaxBH.insert(40);
        MaxBH.insert(45);
        MaxBH.insert(50);
        MaxBH.insert(60);
        MaxBH.insert(100);
        expect(MaxBH.values).toEqual([100, 60, 50, 40, 35, 30, 45, 25]);
    });
});
describe('min binary heap insert method tests', () => {
    test('can insert value as root', () => {
        MinBH.insert(100);
        expect(MinBH.values).toEqual([100]);
    });
    test('inserting a large number first then smaller will result in the larger value bubbling up', () => {
        MinBH.insert(100);
        MinBH.insert(25);
        expect(MinBH.values).toEqual([25, 100]);
    });
    test('inserting many small numbers first then larger will result in the larger value bubbling up to root, and a proper max binary heap', () => {
        MinBH.insert(100);
        MinBH.insert(95);
        MinBH.insert(90);
        MinBH.insert(85);
        MinBH.insert(80);
        MinBH.insert(25);
        MinBH.insert(20);
        MinBH.insert(1);
        MinBH.insert(0);
        expect(MinBH.values).toEqual([0, 1, 25, 20, 90, 95, 80, 100, 85]);
    });
    test('can initialize a binary heap with an array of values, which it will insert into binary heap format', () => {
        MaxBH = new BinaryHeap_1.default('max', [1, 2, 3, 100]);
        MinBH = new BinaryHeap_1.default('min', [1, 2, 3, 100]);
        expect(MaxBH.values).toEqual([100, 3, 2, 1]);
        expect(MinBH.values).toEqual([1, 2, 3, 100]);
    });
    test('max: can extract root node and heap will sink down a new root node from the end, and end up with a heap with proper form', () => {
        MaxBH = new BinaryHeap_1.default('max', [100, 200, 300, 400, 500]);
        const extractedMaxNode = MaxBH.extract();
        expect(extractedMaxNode).toBe(500);
        expect(MaxBH.values).toEqual([400, 300, 200, 100]);
    });
    test('min: can extract root node and heap will sink down a new root node from the end, and end up with a heap with proper form', () => {
        MinBH = new BinaryHeap_1.default('min', [500, 400, 300, 200, 100]);
        const extractedMinNode = MinBH.extract();
        expect(extractedMinNode).toBe(100);
        expect(MinBH.values).toEqual([200, 300, 400, 500]);
    });
});
