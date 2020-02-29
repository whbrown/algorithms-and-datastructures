"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomRange(min, max) {
    // not including max
    return Math.floor(Math.random() * (max - min) + min);
}
exports.default = randomRange;
