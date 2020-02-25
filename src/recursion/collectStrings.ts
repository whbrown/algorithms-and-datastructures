export default function collectStrings(object: any): string[] {
  let strArray: string[] = [];
  for (let key of Object.keys(object)) {
    if (typeof object[key] === 'string') {
      strArray.push(object[key])
    }
    else if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
      strArray = strArray.concat(collectStrings(object[key]));
    }
  }
  return strArray;
}
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