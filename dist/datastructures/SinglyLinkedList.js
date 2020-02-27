"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
class SinglyLinkedList {
    constructor() {
        this._length = 0;
        this.head = null;
        this.tail = null;
        // don't like how Object.keys(new SinglyLinkedList) shows `_length` but not the public setter `length`
        // there should be a way to fix this?
        // ? maybe make length a public getter with a private setter so that it's readonly outside
        // ? the class, but modifiable inside by the other methods?
        // when implemented, tsc error: Getter and setter accessors do not agree in visibility.ts(2379)
        // typescript doesn't support this, 
        // see https://github.com/microsoft/TypeScript/issues/2845
        // design meeting notes: https://github.com/microsoft/TypeScript/issues/6735
        // instead, i'm using a slightly uglier work around where there is no setter,
        // but the prop itself is private, giving the same functionality.
    }
    get length() {
        return this._length;
    }
    push(value) {
        const node = new Node_1.default(value);
        // add node to end of list
        // O(1) since we keep track of tail node
        if (!this.head || !this.tail) {
            this.head = node;
        }
        else {
            this.tail.next = node;
        }
        this.tail = node;
        this._length++;
        return this.tail;
    }
    pop() {
        // remove last node from list
        // O(n) time since we have to iterate over the whole list to find the new tail, and make the new tail's next point to null.
        if (!this.head)
            return null;
        const node = this.head;
        if (!node.next) {
            this.head = null;
            this.tail = null;
            this._length--;
            return node;
        }
        else {
            let childNode = node.next;
            while (childNode.next !== null) {
                // list traversal
                childNode = childNode.next;
            }
            node.next = null;
            this.tail = node;
            this._length--;
            return childNode;
        }
    }
    unshift(value) {
        // add node as first of list
        // O(1)
        const node = new Node_1.default(value);
        if (!this.length)
            this.tail = node;
        node.next = this.head;
        this.head = node;
        this._length++;
        return this.head;
    }
    shift() {
        // remove first node from list
        // O(1)
        if (!this.head)
            return null;
        const newHead = this.head.next;
        const oldHead = this.head;
        oldHead.next = null;
        this.head = newHead || null;
        if (this.length === 1)
            this.tail = null;
        this._length--;
        return oldHead;
    }
}
// const list = new SinglyLinkedList();
exports.default = SinglyLinkedList;
