const bubbleSort = <T extends number>(arr: T[], direction: 'ascending' | 'descending' = 'ascending'): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    let hasSwapped = false;
    for (let j = 0; j < i; j++) {
      let a = arr[j];
      let b = arr[j + 1];
      console.log(arr, a, b);
      if (direction === 'ascending' && a > b || direction === 'descending' && a < b) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        hasSwapped = true;
      }
    }
    if (!hasSwapped) {
      return arr;
    }
  }
  return arr;
}

let arr = [1, 5, 3, 4, 7, 9];
console.log(bubbleSort(arr, 'ascending'))

export default bubbleSort;