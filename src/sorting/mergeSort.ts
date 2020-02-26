import SortOptions from './SortOptions';
import merge from './merge';

const mergeSort = <T>(arr: T[] | T[][], options: SortOptions = { direction: 'ascending' }): T[] => {
  if (arr.length <= 1) {
    return arr as T[];
  }
  const { direction } = options;
  const left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)), { direction: direction });
  const right = mergeSort(arr.slice(Math.floor(arr.length / 2)), { direction: direction });
  return merge(left, right, { direction });
}

export default mergeSort;
// console.log(mergeSort([72, 1, 5, 7, 2, 10, 55, 12, 33, 73], { direction: 'descending' }))