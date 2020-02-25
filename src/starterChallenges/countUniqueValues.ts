// Multiple pointers challenge

// n.b. I normally would have solved this by making a number occurence frequency object and then Object.keys(frequencies).length -> O(n) time complexity just like this multiple pointers one, but a bit more intuitive for me (and also more information since you also get the frequencies of each number.) Though this one has O(1) space complexity rather than O(uniques), i.e. linear
export default function countUniqueValues(array: number[]): number {
  let uniqueNums = 0;
  for (let num = 0, comparison = 1; comparison <= array.length; comparison++) {
    if (array[num] !== array[comparison]) {
      uniqueNums += 1;
      num = comparison;
    }
  }
  return uniqueNums;
}
console.log(countUniqueValues([-2, -1, -1, 0, 1]));

// sneaky declarative solution using a set, also O(n) time complexity, space complexity is O(n)
// const countUniqueValues(array: number[]): number {
//   return new Set(array).size;
// }
