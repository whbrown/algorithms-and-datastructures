"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function capitalizeFirst(arr) {
    let capitalizedArray = [];
    function helper(arr) {
        if (arr.length) {
            let word = arr.shift();
            capitalizedArray.push(word[0].toUpperCase() + word.slice(1));
            helper(arr);
        }
    }
    helper(arr);
    return capitalizedArray;
}
exports.default = capitalizeFirst;
function capitalizeFirstPure(arr) {
    let capitalizedArray = [];
    if (!arr.length) {
        // base case
        return capitalizedArray;
    }
    else {
        let word = arr.shift();
        capitalizedArray.push(word[0].toUpperCase() + word.slice(1));
    }
    return capitalizedArray.concat(capitalizeFirstPure(arr));
}
exports.capitalizeFirstPure = capitalizeFirstPure;
// console.log(capitalizeFirstPure(["car", "taco", "banana"]));
