"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
const IndexError_1 = __importDefault(require("../utils/IndexError"));
class Queue {
    constructor() {
        this.enqueue = (value) => {
            const oldBack = this.back;
            const node = new Node_1.default(value);
            // add node to end of list
            // O(1) since we keep track of tail node
            if (!this.front || !this.back) {
                this.front = node;
            }
            else {
                this.back.next = node;
            }
            this.back = node;
            this._length++;
            node.prev = oldBack;
            return node;
        };
        this.dequeue = () => {
            if (this.front && this.front.next) {
                this.front.next.prev = null;
            }
            if (!this.front)
                return;
            const newFront = this.front.next;
            const oldFront = this.front;
            oldFront.next = null;
            this.front = newFront || null;
            if (this.length === 1)
                this.back = null;
            this._length--;
            return oldFront;
        };
        this.get = (index) => {
            if (index < (this.length / 2)) {
                // start at front
                if (!this.front || (index > this.length - 1 || index < 0))
                    throw new IndexError_1.default('list index out of range.');
                let counter = 0;
                let node = this.front;
                while (counter < index) {
                    if (!node.next)
                        return null;
                    node = node.next;
                    counter++;
                }
                return node;
            }
            else {
                // count from back
                if (!this.back || (index > this.length - 1 || index < 0))
                    throw new IndexError_1.default('list index out of range.');
                let counter = this.length - 1;
                let node = this.back;
                while (counter > index) {
                    if (!node.prev)
                        return null;
                    node = node.prev;
                    counter--;
                }
                return node;
            }
        };
        this.set = (value, index) => {
            const selectedNode = this.get(index);
            if (selectedNode) {
                selectedNode.data = value;
            }
            return selectedNode;
        };
        this._length = 0;
        this.back = null;
        this.front = null;
    }
    get length() {
        return this._length;
    }
}
exports.default = Queue;
