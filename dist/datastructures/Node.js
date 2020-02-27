"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _Node {
    /// singly linked node
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class DoublyLinkedNode extends _Node {
    constructor(data) {
        super(data);
        this.prev = null;
    }
}
exports.DoublyLinkedNode = DoublyLinkedNode;
exports.default = _Node;
