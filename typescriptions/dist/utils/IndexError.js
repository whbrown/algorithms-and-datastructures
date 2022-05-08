"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexError extends Error {
    constructor(message = "") {
        super(message);
        this.name = 'IndexError';
    }
}
exports.default = IndexError;
