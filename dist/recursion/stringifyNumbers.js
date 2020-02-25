"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringifyNumbers(obj) {
    let stringifiedObj = {};
    for (let key of Object.keys(obj)) {
        if (typeof obj[key] === 'number') {
            stringifiedObj[key] = obj[key].toString();
        }
        else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            stringifiedObj[key] = stringifyNumbers(obj[key]);
        }
        else {
            stringifiedObj[key] = obj[key];
        }
    }
    return stringifiedObj;
}
let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
};
console.log(stringifyNumbers(obj));
exports.default = stringifyNumbers;
