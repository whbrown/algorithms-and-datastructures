"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SinglyLinkedList_1 = __importDefault(require("./SinglyLinkedList"));
// interface DoublyLinkedList<T> extends SinglyLinkedList<T> {
//   head: null | _Node<T>;
//   tail: null | _Node<T>;
//   push: (node: _Node<T>) => _Node<T>;
//   pop: () => _Node<T> | null;
//   shift: (node: _Node<T>) => _Node<T>;
//   unshift: () => _Node<T> | null;
// }
class DoublyLinkedList extends SinglyLinkedList_1.default {
    constructor() {
        super();
        this.push = (node) => {
            if (this.tail) {
                node.prev = this.tail;
            }
            super.push(node);
            return node;
        };
        this.pop = () => {
            // returns deleted item, O(1) time
            if (!this.tail)
                return null;
            const oldTail = this.tail;
            if (this.tail.prev) {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }
            else {
                // one item list, with that item being popped off;
                this.head = null;
                this.tail = null;
            }
            this._length--;
            return oldTail;
        };
        this.shift = (node) => {
            if (this.head) {
                this.head.prev = node;
            }
            return super.shift(node);
        };
        this.unshift = () => {
            if (this.head && this.head.next) {
                // set new head's prev to null
                this.head.next.prev = null;
            }
            return super.unshift();
        };
    }
    ;
}
;
exports.default = DoublyLinkedList;
// const doubleList = new DoublyLinkedList();
// doubleList.push(new DoublyLinkedNode('test'))
// doubleList.push(new DoublyLinkedNode('additional test'))
// doubleList.shift(new DoublyLinkedNode('yet another additional test'));
// doubleList.pop();
// console.log(doubleList);
