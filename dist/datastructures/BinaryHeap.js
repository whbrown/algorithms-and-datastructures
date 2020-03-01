"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryHeap {
    constructor(type) {
        this.values = [];
        this.type = type;
    }
    insert(value) {
        this.values.push(value);
        let valueIndex = this.values.length - 1;
        const helper = () => {
            let parentIndex = Math.floor((valueIndex - 1) / 2);
            if (this.type === 'max' && this.values[parentIndex] < value
                || this.type === 'min' && this.values[parentIndex] > value) {
                [this.values[valueIndex], this.values[parentIndex]] = [this.values[parentIndex], this.values[valueIndex]]; // swap parent and larger child
                valueIndex = parentIndex;
                helper();
            }
        };
        helper();
        return this.values;
    }
}
exports.default = BinaryHeap;
