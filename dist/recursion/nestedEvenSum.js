"use strict";
const obj1 = {
    outer: 2,
    obj: {
        inner: 2,
        otherObj: {
            superInner: 2,
            notANumber: true,
            alsoNotANumber: "yup"
        }
    }
};
function nestedEvenSum(obj1) {
    let evenSum = 0;
    function recurse(obj1) {
        let keys = Object.keys(obj1);
        for (let key of keys) {
            if (typeof obj1[key] === 'number' && obj1[key] % 2 === 0) {
                evenSum += obj1[key];
            }
            if (typeof obj1[key] === 'object') {
                evenSum = recurse(obj1[key]);
            }
        }
        return evenSum;
    }
    return recurse(obj1);
}
console.log(nestedEvenSum(obj1));
