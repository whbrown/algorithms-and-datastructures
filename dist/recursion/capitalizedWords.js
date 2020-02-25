"use strict";
function capitalizedWords(words) {
    let newArray = [];
    if (!words.length)
        return newArray;
    newArray.push(words[0].toUpperCase());
    return newArray.concat(capitalizedWords(words.slice(1)));
}
let words = ['i', 'am', 'learning', 'recursion'];
console.log(capitalizedWords(words)); // ['I', 'AM', 'LEARNING', 'RECURSION']
