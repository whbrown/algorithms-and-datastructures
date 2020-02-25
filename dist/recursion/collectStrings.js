"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function collectStrings(object) {
    let strArray = [];
    for (let key of Object.keys(object)) {
        if (typeof object[key] === 'string') {
            strArray.push(object[key]);
        }
        else if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
            strArray = strArray.concat(collectStrings(object[key]));
        }
    }
    return strArray;
}
exports.default = collectStrings;
// test object:
// const obj = {
//   stuff: "foo",
//   data: {
//     val: {
//       thing: {
//         info: "bar",
//         moreInfo: {
//           evenMoreInfo: {
//             weMadeIt: "baz"
//           }
//         }
//       }
//     }
//   }
// }
