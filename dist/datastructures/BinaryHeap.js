"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryHeap {
    constructor(type, initialValues) {
        this.values = [];
        this.type = type;
        if (initialValues) {
            initialValues.forEach((value) => this.insert(value));
        }
    }
    insert(value) {
        // recursive insert implementation, returns the heap with the value inserted
        this.values.push(value);
        let valueIndex = this.values.length - 1;
        const helper = () => {
            let parentIndex = Math.floor((valueIndex - 1) / 2);
            if (this.type === 'max' && this.values[parentIndex] < value
                || this.type === 'min' && this.values[parentIndex] > value) {
                [this.values[valueIndex], this.values[parentIndex]] = [this.values[parentIndex], this.values[valueIndex]]; // swap parent and child
                valueIndex = parentIndex;
                helper();
            }
        };
        helper();
        return this.values;
    }
    extract() {
        // badly in need of a refactor
        if (!this.values.length)
            return;
        const newRoot = this.values.pop();
        const extractedNode = this.values[0];
        this.values[0] = newRoot;
        let nodeIndex = 0;
        if (this.type === 'max' && this.values[0] > Math.max(this.values[1], this.values[2]) || this.type === 'min' && this.values[0] < Math.min(this.values[1], this.values[2]))
            return extractedNode;
        const helper = () => {
            let children = { left: [this.values[nodeIndex * 2 + 1], nodeIndex * 2 + 1], right: [this.values[nodeIndex * 2 + 2], nodeIndex * 2 + 2] };
            if (nodeIndex * 2 + 1 >= this.values.length)
                return;
            if (this.type === 'max') {
                if ((children.left[0] <= this.values[nodeIndex] || children.left[0] === undefined) && (children.right[0] <= this.values[nodeIndex] || children.right[0] === undefined))
                    return;
                if (children.left[0] > children.right[0]) {
                    [this.values[nodeIndex], this.values[children.left[1]]] = [this.values[children.left[1]], this.values[nodeIndex]]; // swap
                    nodeIndex = children.left[1];
                }
                else {
                    [this.values[nodeIndex], this.values[children.right[1]]] = [this.values[children.right[1]], this.values[nodeIndex]]; // swap
                    nodeIndex = children.right[1];
                }
            }
            else if (this.type === 'min') {
                if ((children.left[0] >= this.values[nodeIndex] || children.left[0] === undefined) && (children.right[0] >= this.values[nodeIndex] || children.right[0] === undefined))
                    return;
                if (children.left[0] < children.right[0]) {
                    [this.values[nodeIndex], this.values[children.left[1]]] = [this.values[children.left[1]], this.values[nodeIndex]]; // swap
                    nodeIndex = children.left[1];
                }
                else {
                    [this.values[nodeIndex], this.values[children.right[1]]] = [this.values[children.right[1]], this.values[nodeIndex]]; // swap
                    nodeIndex = children.right[1];
                }
            }
            helper(); // recurse
        };
        helper();
        return extractedNode;
    }
}
// if ((this.type === 'max' && children.left[0] <= this.values[nodeIndex]) && (children.right[0] <= this.values[nodeIndex])) return;
exports.default = BinaryHeap;
// if (nodeIndex * 2 + 1 >= this.values.length || (this.type === 'max' && children.left[0] <= this.values[nodeIndex]) && (children.right[0] <= this.values[nodeIndex]) || (this.type === 'min' && children.left[0] >= this.values[nodeIndex]) && (children.right[0] >= this.values[nodeIndex])) 
