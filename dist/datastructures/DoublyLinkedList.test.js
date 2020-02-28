"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DoublyLinkedList_1 = __importDefault(require("./DoublyLinkedList"));
const SinglyLinkedList_test_1 = require("./SinglyLinkedList.test");
function testTraversalDLL(list) {
    // backwards traversal
    if (!list.tail)
        return true; // empty list
    let node = list.tail;
    let countedLength = 1;
    while (node.prev) {
        // console.log(node.data)
        node = node.prev;
        countedLength++;
    }
    return (node === list.head && countedLength === list.length);
}
exports.testTraversalDLL = testTraversalDLL;
test('popping from an empty list returns void', () => {
    const list = new DoublyLinkedList_1.default();
    expect(list.pop()).toBeUndefined();
});
test('shifting from an empty list returns void', () => {
    const list = new DoublyLinkedList_1.default();
    expect(list.shift()).toBeUndefined();
});
test('pushed node to empty list, node -> new head & tail', () => {
    const list = new DoublyLinkedList_1.default();
    list.push('value');
    expect(list.head.data === 'value' && list.tail.data === 'value').toBe(true);
});
test('unshifting node to empty list, node -> new head & tail', () => {
    const list = new DoublyLinkedList_1.default();
    list.unshift('value');
    expect(list.head.data === 'value' && list.tail.data === 'value').toBe(true);
});
test('insert as 0, or without index, on empty list, node -> new head & tail', () => {
    const list = new DoublyLinkedList_1.default();
    list.insert('value', 0);
    expect(list.head.data === 'value' && list.tail.data === 'value').toBe(true);
});
test('Able to insert in the middle of the list and maintain traversal', () => {
    const list = new DoublyLinkedList_1.default();
    list.push('Van Gogh');
    list.unshift('Matisse');
    list.push('Gauguin');
    list.unshift('Picasso');
    list.insert('Toulouse-Lautrec', 1);
    expect(SinglyLinkedList_test_1.testTraverseSLL(list)).toBe(true);
    expect(testTraversalDLL(list)).toBe(true);
});
test(`Able to traverse a list mutated by pushes, pops, shifts, unshifts, inserts, and removals all the way from head to tail`, () => {
    const list = new DoublyLinkedList_1.default();
    for (let i = 1; i < 100; i++) {
        if (list.length > 1 && list.head.next === null) {
            console.log('caught length inconsistency at: ', i);
            console.log(list.log());
            throw new Error;
        }
        if (i % 2 === 0) {
            list.push(`push: ${i}`);
        }
        if (i % 3 === 0) {
            list.unshift(`unshift: ${i}`);
        }
        if (i % 5 === 0) {
            list.pop();
        }
        if (i % 7 === 0) {
            list.shift();
        }
        if (i === 1)
            list.insert(`insert: ${i}`);
        if (i % 9 === 0) {
            list.insert(`insert: ${i}`, Math.floor(Math.random() * list.length));
        }
        if (i === 20)
            list.removeIndex(list.length - 1);
        if (i % 11 === 0) {
            list.removeIndex(Math.floor(Math.random() * list.length - 1));
        }
    }
    expect(SinglyLinkedList_test_1.testTraverseSLL(list)).toBe(true);
    expect(testTraversalDLL(list)).toBe(true);
});
