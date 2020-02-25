const selectionSort = <T extends number | string>(arr: T[], direction: 'ascending' | 'descending' = 'ascending'): T[] => {
  // could refactor direction as a property on a secondary options object -- do this if it were an exposed API
  for (let i = 0; i < arr.length; i++) {
    let [compNum, compIndex] = [arr[i], i]; // compNum/Index === min or max depending on @param direction
    for (let j = i; j < arr.length; j++) {
      // console.log(arr, 'arr[j]:', arr[j], 'compNum:', compNum);
      if (direction === 'ascending' && arr[j] < compNum
        || direction === 'descending' && arr[j] > compNum) {
        [compNum, compIndex] = [arr[j], j];
      }
    }
    [arr[i], arr[compIndex]] = [arr[compIndex], arr[i]]
  }
  return arr;
}

// console.log(selectionSort([5, 1, 6, 3, 11, 10], 'descending'))
export default selectionSort;