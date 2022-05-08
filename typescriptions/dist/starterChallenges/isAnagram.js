"use strict";
// normally would use simple method of sorting both string then comparing them,
// but this is to practice frequency counters
Object.defineProperty(exports, "__esModule", { value: true });
const isAnagram = (word1, word2) => {
    if (word1.length !== word2.length)
        return false;
    const letterFrequency = (word) => word.split("").reduce((prev, char) => {
        prev[char] = prev[char] + 1 || 1;
        return prev;
    }, {});
    const frequencies1 = letterFrequency(word1);
    const frequencies2 = letterFrequency(word2);
    return Object.keys(frequencies1).every((char) => {
        return frequencies1[char] === frequencies2[char];
    });
};
// console.log(isAnagram("rat", "car"));
exports.default = isAnagram;
