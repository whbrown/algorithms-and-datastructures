"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reverse(str) {
    let reversedStr = [];
    function helper(str) {
        if (!str.length)
            return reversedStr.join("");
        reversedStr.push(str[str.length - 1]);
        return helper(str.slice(0, str.length - 1));
    }
    return helper(str);
}
exports.default = reverse;
