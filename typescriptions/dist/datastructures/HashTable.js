"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HashTable {
    constructor() {
        this.hash = (key, arrLen) => {
            // naive hash fn for illustrative purposes
            if (arrLen <= 0)
                throw TypeError('Max hash value must be a positive integer');
            let total = 0;
            let prime = 31;
            for (let i = 0; i < Math.min(key.length, 100); i++) {
                let char = key[i];
                let value = char.charCodeAt(0) - 96;
                total = (total * prime + value) % arrLen;
            }
            return total;
            // return value.split('').reduce((a, b) => a * b.charCodeAt(0), 1) % max;
        };
    }
}
exports.default = HashTable;
