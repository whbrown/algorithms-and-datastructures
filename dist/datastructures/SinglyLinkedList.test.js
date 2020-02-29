"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SinglyLinkedList_1 = __importDefault(require("./SinglyLinkedList"));
const randomRange_1 = __importDefault(require("../utils/randomRange"));
function fillListWithDummyData(list) {
    // let randomNum = randomRange(0, 2);
    for (let i = 0; i < randomRange_1.default(25, 50); i++) {
        list.push(`push: ${i}`);
        // randomNum = randomRange(0, 2); // only push and unshift
        // switch (randomNum) {
        //   case 0:
        //     list.push(`push: ${i}`);
        //     break;
        //   case 1:
        //     list.unshift(`unshift: ${i}`);
        //     break;
        //   case 2:
        //     list.pop();
        //     break;
        //   case 3:
        //     list.shift();
        //     break;
        //   case 4:
        //     list.insert(`insert: ${i}`, randomRange(0, list.length));
        //     break;
        //   case 5:
        //     list.removeIndex(randomRange(0, list.length));
        //     break;
        //   case 6:
        //     list.set(`set: ${i}`, randomRange(0, list.length));
        //   default:
        //     list.push(`push: ${i}`);
        // }
    }
    return list;
}
exports.fillListWithDummyData = fillListWithDummyData;
function testTraversalSLL(list) {
    if (!list.head)
        return true; // empty list
    let node = list.head;
    let countedLength = 1;
    while (node.next) {
        // console.log(node.data)
        node = node.next;
        countedLength++;
    }
    return (node === list.tail && countedLength === list.length);
}
exports.testTraversalSLL = testTraversalSLL;
let list = new SinglyLinkedList_1.default();
beforeEach(() => list = new SinglyLinkedList_1.default());
describe('Checking empty lists', () => {
    test('popping from an empty list returns void', () => {
        expect(list.pop()).toBeUndefined();
    });
    test('shifting from an empty list returns void', () => {
        expect(list.shift()).toBeUndefined();
    });
    test('pushed node to empty list, node -> new head & tail', () => {
        list.push('value');
        expect(list.head.data === 'value' && list.tail.data === 'value').toBe(true);
    });
    test('unshifting node to empty list, node -> new head & tail', () => {
        list.unshift('value');
        expect(list.head.data === 'value' && list.tail.data === 'value').toBe(true);
    });
    test('insert as 0, or without index, on empty list, node -> new head & tail', () => {
        list.insert('value', 0);
        expect(list.head.data === 'value' && list.tail.data === 'value').toBe(true);
    });
});
test('test traversal of several randomly created lists', () => {
    const list1 = fillListWithDummyData(list);
    const list2 = fillListWithDummyData(list);
    expect(testTraversalSLL(list1)).toBe(true);
    expect(testTraversalSLL(list2)).toBe(true);
});
test('Able to insert in the middle of the list and maintain traversal', () => {
    list.push('Van Gogh');
    list.unshift('Matisse');
    list.push('Gauguin');
    list.unshift('Picasso');
    list.insert('Toulouse-Lautrec', 1);
    expect(testTraversalSLL(list)).toBe(true);
});
test(`Able to traverse a list mutated by pushes, pops, shifts, unshifts, inserts, and removals all the way from head to tail`, () => {
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
            list.removeIndex(Math.floor(Math.random() * list.length));
        }
    }
    expect(testTraversalSLL(list)).toBe(true);
});
