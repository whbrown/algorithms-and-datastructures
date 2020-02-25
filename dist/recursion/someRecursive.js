"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function someRecursive(arr, cbfn) {
    let found = false;
    function check(val, cbfn) {
        if (!val.length)
            return false;
        let result = cbfn(val.pop());
        found = result;
        if (!found) {
            return check(val, cbfn);
        }
        return true;
    }
    return check(arr.slice(), cbfn);
}
exports.default = someRecursive;
const isOdd = (value) => value % 2 !== 0;
console.log(someRecursive([2, 4], isOdd));
