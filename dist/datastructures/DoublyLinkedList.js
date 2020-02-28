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
                // set new head's prev to null
                this.head.next.prev = null;
            }
            return super.shift();
        };
        this.get = (index) => {
            if (index < (this.length / 2)) {
                return super.get(index);
            }
            else {
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
        this.insert = (value, index) => super.insert(value, index, { prevEnabled: true });
    }
    ;
}
;
exports.default = DoublyLinkedList;
