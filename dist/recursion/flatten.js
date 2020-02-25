"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flatten(arr) {
    // hate using these any types, but had issues with using generics recursively
    let flatArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            flatArray = flatArray.concat(flatten(arr[i]));
        }
        else {
            flatArray.push(arr[i]);
        }
    }
    return flatArray;
}
exports.default = flatten;
console.log(flatten([[[1]], [[[2], 3], 4], 6, [5]]));
