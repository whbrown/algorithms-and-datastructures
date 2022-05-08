"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function frequencyCounter(array, squaresArray) {
    const frequencies1 = array.reduce((squareFrequencies, num) => {
        squareFrequencies[Math.pow(num, 2)] = squareFrequencies[Math.pow(num, 2)] + 1 || 1;
        return squareFrequencies;
    }, {});
    const frequencies2 = squaresArray.reduce((squareFrequencies, num) => {
        squareFrequencies[num] = squareFrequencies[num] + 1 || 1;
        return squareFrequencies;
    }, {});
    return JSON.stringify(frequencies1) === JSON.stringify(frequencies2); // ! unreliable!
    // would be better to iterate over Object.keys(frequencies1) with .every(...etc) to check if values of each object for each prop are the same
}
exports.default = frequencyCounter;
// console.log(frequencyCounter([1, 2, 3], [4, 1, 9]));
