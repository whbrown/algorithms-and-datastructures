"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PriorityNode {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
    }
}
exports.PriorityNode = PriorityNode;
class PriorityQueue {
    constructor(type, initialValues) {
        this.values = [];
        this.type = type;
        if (initialValues) {
            initialValues.forEach((node) => this.enqueue(node.data, node.priority));
        }
    }
    get length() {
        return this.values.length;
    }
    enqueue(value, priority) {
        // recursive insert implementation, returns the heap with the value inserted
        const node = new PriorityNode(value, priority);
        this.values.push(node);
        let valueIndex = this.values.length - 1;
        const helper = () => {
            let parentIndex = Math.floor((valueIndex - 1) / 2);
            if (parentIndex < 0 || parentIndex > this.values.length - 1)
                return;
            if (this.type === 'max' && this.values[parentIndex].priority < priority
                || this.type === 'min' && this.values[parentIndex].priority > priority) {
                [this.values[valueIndex], this.values[parentIndex]] = [this.values[parentIndex], this.values[valueIndex]]; // swap parent and child
                valueIndex = parentIndex;
                helper();
            }
        };
        helper();
        return this.values;
    }
    dequeue() {
        var _a, _b, _c, _d, _e, _f;
        const { values } = this;
        if (!values.length)
            return;
        if (values.length === 1)
            return values.pop();
        const newRoot = values.pop();
        const extractedNode = values[0];
        values[0] = newRoot;
        let nodeIndex = 0;
        if (this.type === 'max' &&
            ((_a = values[0]) === null || _a === void 0 ? void 0 : _a.priority) > Math.max((_b = values[1]) === null || _b === void 0 ? void 0 : _b.priority, (_c = values[2]) === null || _c === void 0 ? void 0 : _c.priority)
            || this.type === 'min' &&
                ((_d = values[0]) === null || _d === void 0 ? void 0 : _d.priority) < Math.min((_e = values[1]) === null || _e === void 0 ? void 0 : _e.priority, (_f = values[2]) === null || _f === void 0 ? void 0 : _f.priority)) {
            return extractedNode;
        }
        const helper = () => {
            var _a, _b, _c, _d, _e, _f;
            if (nodeIndex * 2 + 1 >= values.length)
                return;
            const left = [(_a = values[nodeIndex * 2 + 1]) === null || _a === void 0 ? void 0 : _a.priority, nodeIndex * 2 + 1];
            const right = [(_b = values[nodeIndex * 2 + 2]) === null || _b === void 0 ? void 0 : _b.priority, nodeIndex * 2 + 2];
            if (this.type === 'max') {
                if (!left)
                    return;
                if ((left[0] <= ((_c = values[nodeIndex]) === null || _c === void 0 ? void 0 : _c.priority) // both children larger or undefined
                    || left[0] === undefined)
                    && (right[0] <= ((_d = values[nodeIndex]) === null || _d === void 0 ? void 0 : _d.priority)
                        || right[0] === undefined)) {
                    return; // bubble down successful, exit recursion;
                }
                if (left[0] > right[0]) {
                    [values[nodeIndex], values[left[1]]] =
                        [values[left[1]], values[nodeIndex]]; // swap left, recurse
                    nodeIndex = left[1];
                }
                else {
                    [values[nodeIndex], values[right[1]]] =
                        [values[right[1]], values[nodeIndex]]; // swap right, recurse
                    nodeIndex = right[1];
                }
            }
            else if (this.type === 'min') {
                if ((left[0] >= ((_e = values[nodeIndex]) === null || _e === void 0 ? void 0 : _e.priority) // both children smaller or undefined
                    || left[0] === undefined)
                    && (right[0] >= ((_f = values[nodeIndex]) === null || _f === void 0 ? void 0 : _f.priority)
                        || right[0] === undefined)) {
                    return; // bubble down successful, exit recursion;
                }
                if (left[0] < right[0]) {
                    [values[nodeIndex], values[left[1]]] =
                        [values[left[1]], values[nodeIndex]]; // swap left, recurse
                    nodeIndex = left[1];
                }
                else {
                    [values[nodeIndex], values[right[1]]] =
                        [values[right[1]], values[nodeIndex]]; // swap right, recurse
                    nodeIndex = right[1];
                }
            }
            helper(); // recurse
        };
        helper();
        return extractedNode;
    }
}
exports.default = PriorityQueue;
