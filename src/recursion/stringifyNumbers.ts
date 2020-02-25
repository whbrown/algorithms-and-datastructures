export default function stringifyNumbers(obj: { [key: string]: any | { [key: string]: any } }): { [key: string]: any } {
  let stringifiedObj: { [key: string]: any } = {};
  for (let key of Object.keys(obj)) {
    if (typeof obj[key] === 'number') {
      stringifiedObj[key] = obj[key].toString();
    }
    else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      stringifiedObj[key] = stringifyNumbers(obj[key] as { [key: string]: any });
    }
    else {
      stringifiedObj[key] = obj[key];
    }
  }
  return stringifiedObj;
}

// let obj = {
//   num: 1,
//   test: [],
//   data: {
//     val: 4,
//     info: {
//       isRight: true,
//       random: 66
//     }
//   }
// }