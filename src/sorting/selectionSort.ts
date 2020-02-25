/* tslint:disable-next-line */ // ignore ts(1149)
import Options from './Options';

const selectionSort = <T extends number | string>(arr: T[], options: Options = { direction: 'ascending' }): T[] => {
  const { direction } = options;
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