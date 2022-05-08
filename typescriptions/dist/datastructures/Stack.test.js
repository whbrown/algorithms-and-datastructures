"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SinglyLinkedList_test_1 = require("./SinglyLinkedList.test");
const Stack_1 = __importDefault(require("./Stack"));
let stack = new Stack_1.default();
beforeEach(() => stack = new Stack_1.default());
describe('base functionality', () => {
    test('stack class exists', () => {
        expect(typeof stack).toBe('object');
    });
    test('can push onto stack', () => {
        stack.push(`push: 0`);
        expect(stack.head).toBeTruthy();
        expect(stack.tail).toBeTruthy();
        expect(stack.head.data).toBe(`push: 0`);
        expect(stack.tail.data).toBe(`push: 0`);
    });
    test(`popping from stack gets last item pushed`, () => {
        stack.push('Walrus');
        stack.push('Orca');
        stack.push('Leopard seal');
        const poppedNode = stack.pop();
        expect(poppedNode).toBeTruthy();
        expect(poppedNode.data).toBe('Leopard seal');
    });
    test('get value of node with get method', () => {
        var _a, _b;
        stack = SinglyLinkedList_test_1.fillListWithDummyData(stack);
        const thirdNodeFromTop = stack.get(2);
        expect(thirdNodeFromTop).toBe((_b = (_a = stack.head) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.next);
    });
    test('able to set value of a node by index (distance from the top)', () => {
        var _a;
        stack = SinglyLinkedList_test_1.fillListWithDummyData(stack);
        const thirdNodeFromTop = stack.set('set: test', 2);
        expect((_a = stack.get(2)) === null || _a === void 0 ? void 0 : _a.data).toBe('set: test');
    });
});
test('full traversal from top to bottom of stack', () => {
    stack = SinglyLinkedList_test_1.fillListWithDummyData(stack);
    expect(SinglyLinkedList_test_1.testTraversalSLL(stack)).toBe(true);
});
