"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
const IndexError_1 = __importDefault(require("../utils/IndexError"));
class Stack {
    constructor() {
        this._length = 0;
        this.head = null;
        this.tail = null;
    }
    get length() {
        return this._length;
    }
    push(value) {
        // renamed version of SinglyLinkedList's unshift
        // add node as first of list
        // O(1)
        const node = new Node_1.default(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        else {
            node.next = this.head;
            this.head = node;
        }
        this._length++;
        return this.head;
    }
    pop() {
        // renamed version of SinglyLinkedList's shift
        // O(1)
        if (!this.head)
            return;
        const newHead = this.head.next;
        const oldHead = this.head;
        oldHead.next = null;
        this.head = newHead || null;
        if (this.length === 1)
            this.tail = null;
        this._length--;
        return oldHead;
    }
    get(index) {
        if (!this.head || (index > this.length - 1 || index < 0))
            throw new IndexError_1.default('list index out of range.');
        let counter = 0;
        let node = this.head;
        while (counter < index) {
            if (!node.next)
                return null;
            node = node.next;
            counter++;
        }
        return node;
    }
    set(value, index) {
        const selectedNode = this.get(index);
        if (selectedNode) {
            selectedNode.data = value;
        }
        return selectedNode;
    }
}
exports.default = Stack;
