"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HashTable {
    constructor() {
        this.hash = (value, max) => {
            // naive hash fn for illustrative purposes
            if (max <= 0)
                throw TypeError('Max hash value must be a positive integer');
            return value.split('').reduce((a, b) => a * b.charCodeAt(0), 1) % max;
        };
    }
}
exports.default = HashTable;
