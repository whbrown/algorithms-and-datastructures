"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
const IndexError_1 = __importDefault(require("../utils/IndexError"));
class SinglyLinkedList {
    constructor() {
        // TODO: use constructor to initiate a filled linked list like you can do with sets?
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
        // O(n) time since we have to iterate over the whole list to find the new tail,
        // and make the new tail's next point to null.
        if (!this.head)
            return;
        let node = this.head;
        if (!node.next) {
            this.head = null;
            this.tail = null;
            this._length--;
            return node;
        }
        else {
            console.assert(this.length > 1);
            let targetNode = node.next;
            while (targetNode.next !== null) {
                // list traversal
                node = targetNode;
                targetNode = targetNode.next;
            }
            node.next = null;
            this.tail = node;
            this._length--;
            return targetNode;
        }
    }
    unshift(value) {
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
    shift() {
        // remove first node from list
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
    insert(value, index, options = { prevEnabled: false }) {
        if (!index)
            return this.push(value);
        if (index > this.length - 1 || index < 0)
            throw new IndexError_1.default('list index out of range.');
        if (index === 0)
            return this.unshift(value);
        if (index === this.length)
            return this.push(value);
        const { prevEnabled } = options;
        let newNode = new Node_1.default(value);
        const prevNode = this.get(index - 1);
        // maybe move the out of bounds errors to top of function?
        const targetNode = prevNode.next;
        if (prevEnabled) {
            newNode.prev = prevNode;
            targetNode.prev = newNode; // assert exists because ^ insert as new tail node is covered
        }
        prevNode.next = newNode;
        newNode.next = targetNode;
        this._length++;
        return newNode;
    }
    removeIndex(index, options = { prevEnabled: false }) {
        if (index > this.length - 1 || index < 0)
            throw new IndexError_1.default('list index out of range.');
        if (index === 0)
            return this.shift();
        if (index === this.length - 1)
            return this.pop();
        const { prevEnabled } = options;
        const prevNode = this.get(index - 1);
        const targetNode = prevNode.next; // all three assert exists will be true
        const nextNode = targetNode.next; // because of first line's return null
        prevNode.next = nextNode;
        if (prevEnabled) {
            nextNode.prev = prevNode;
            targetNode.prev = null;
        }
        targetNode.next = null;
        this._length--;
        return targetNode;
    }
    log(beginning = 0, end = this.length - 1) {
        if ((beginning > this.length - 1 || beginning < 0)
            || (end > this.length - 1 || end < 0))
            throw new IndexError_1.default('list index out of range.');
        let node = this.get(beginning);
        let count = beginning;
        while (node) {
            console.log(`node ${count}`, node);
            if (node.next) {
                node = node.next;
                count++;
            }
            else
                return;
        }
    }
    toString(beginning = 0, end = this.length - 1) {
        if ((beginning > this.length - 1 || beginning < 0)
            || (end > this.length - 1 || end < 0))
            throw new IndexError_1.default('list index out of range.');
        let node = this.get(beginning);
        while (node) {
            console.log(node.data);
            if (node.next) {
                node = node.next;
            }
            else
                return;
        }
    }
}
exports.default = SinglyLinkedList;
