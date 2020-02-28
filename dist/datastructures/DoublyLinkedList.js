"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SinglyLinkedList_1 = __importDefault(require("./SinglyLinkedList"));
class DoublyLinkedList extends SinglyLinkedList_1.default {
    constructor() {
        super();
        this.push = (value) => {
            const oldTail = this.tail;
            const node = super.push(value);
            node.prev = oldTail;
            return node;
        };
        this.pop = () => {
            // returns deleted item, O(1) time, unlike SinglyLinkedList's O(n) pop
            if (!this.tail)
                return null;
            const oldTail = this.tail;
            if (oldTail.prev) {
                this.tail = oldTail.prev;
                this.tail.next = null;
            }
            else {
                // one item list, with that item being popped off;
                this.head = null;
                this.tail = null;
            }
            oldTail.prev = null;
            this._length--;
            return oldTail;
        };
        this.unshift = (value) => {
            let oldHead = this.head;
            let node = super.unshift(value);
            if (oldHead) {
                oldHead.prev = node;
            }
            node.prev = null;
            return node;
        };
        this.shift = () => {
            if (this.head && this.head.next) {
                this.head.next.prev = null;
            }
            return super.shift();
        };
        this.get = (index) => {
            if (index < (this.length / 2)) {
                // start at head
                return super.get(index);
            }
            else {
                // count backwards from tail
                if (!this.tail || (index > this.length - 1 || index < 0))
                    return null;
                let counter = this.length - 1;
                let node = this.tail;
                while (counter > index) {
                    if (!node.prev)
                        return null;
                    node = node.prev;
                    counter--;
                }
                return node;
            }
        };
        this.insert = (value, index) => {
            if (index === 0)
                return this.unshift(value); // uses the doublylinkedlist's unshift/push/shift/pop as
            if (index === this.length)
                return this.push(value); // they already cover logic for dealing with prev
            return super.insert(value, index, { prevEnabled: true });
        };
        this.removeIndex = (index) => {
            if (index === 0)
                return this.shift();
            if (index === this.length)
                return this.pop();
            return super.removeIndex(index, { prevEnabled: true });
        };
    }
    ;
}
;
exports.default = DoublyLinkedList;
