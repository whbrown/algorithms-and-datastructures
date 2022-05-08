"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPalindrome(str) {
    let reverse = [];
    function append(str) {
        if (!str.length)
            return;
        reverse.push(str[str.length - 1]);
        return append(str.slice(0, str.length - 1));
    }
    if (str.length !== reverse.length)
        append(str);
    return reverse.join("") === str;
}
exports.default = isPalindrome;
