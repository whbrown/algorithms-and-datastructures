/* tslint:disable-next-line */ // ignore ts(1149)
import SortOptions from './SortOptions';
import swap from './swap';

const selectionSort = <T extends number>(arr: T[], options: SortOptions = { direction: 'ascending' }): T[] => {
  // TODO: change to work with strings
  const { direction } = options;
  for (let i = 0; i < arr.length; i++) {
    let [compNum, compIndex] = [arr[i], i]; // compNum/Index === min or max depending on @param direction
    for (let j = i + 1; j < arr.length; j++) {
      // console.log(arr, 'arr[j]:', arr[j], 'compNum:', compNum);
      if (direction === 'ascending' && arr[j] < compNum
        || direction === 'descending' && arr[j] > compNum) {
        [compNum, compIndex] = [arr[j], j];
      }
    }
    if (compIndex !== i) {
      // swap
      swap(arr, i, compIndex);
    }
  }
  return arr;
}

// console.log(selectionSort([5, 1, 6, 3, 11, 10], 'descending'))
export default selectionSort;