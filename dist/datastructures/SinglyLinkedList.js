"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SinglyLinkedList {
    constructor() {
        this.push = (node) => {
            // add node to end of list
            if (!this.head || !this.tail) {
                this.head = node;
            }
            else {
                this.tail.next = node;
            }
            this.tail = node;
            this.length++;
            return this.tail;
        };
        this.pop = () => {
            // remove last node from list
            // O(n) time since we have to iterate over the whole list to find the new tail
            if (!this.head)
                return null;
            let node = this.head;
            if (!node.next) {
                this.head = null;
                this.tail = null;
                this.length--;
                return node;
            }
            else {
                let childNode = node.next;
                while (childNode.next !== null) {
                    childNode = childNode.next;
                }
                node.next = null;
                this.tail = node;
                this.length--;
                return childNode;
            }
        };
        this.shift = (node) => {
            // add node as first of list
            this.length++;
            node.next = this.head;
            this.head = node;
            return this.head;
        };
        this.unshift = () => {
            // remove first node from list
            if (!this.head)
                return null;
            const nextHead = this.head.next;
            const oldHead = this.head;
            this.head = nextHead || null;
            this.length--;
            return oldHead;
        };
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}
exports.default = SinglyLinkedList;
