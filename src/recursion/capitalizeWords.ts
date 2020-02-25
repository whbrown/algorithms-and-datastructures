function capitalizeWords(words: string[] | []): (string[] | []) {
  let newArray: string[] = [];
  if (!words.length) return newArray;
  newArray.push(words[0].toUpperCase());
  return newArray.concat(capitalizeWords(words.slice(1)));
}

// let words = ['i', 'am', 'learning', 'recursion'];
// console.log(capitalizeWords(words)); // ['I', 'AM', 'LEARNING', 'RECURSION']

export default capitalizeWords;