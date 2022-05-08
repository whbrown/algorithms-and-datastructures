import SortOptions from './SortOptions';
import merge from './merge';

const mergeSort = <T>(arr: T[] | T[][], options: SortOptions = { direction: 'ascending' }): T[] => {
  if (arr.length <= 1) return arr as T[]; /* base case. return the single number array which will return first
   merge() with the other (left/right) and those 2 will return merge with the other (left/right) and on down the 
   call stack as each layer gets popped off (the original root call is sitting on `const right = ...` waiting to 
   get the the stackframes piled on top of it done to proceed to final return). this function is, excluding the
   merge calls, O(log(n)), so combining the two is O(nlog(n)) */
  const { direction } = options;
  const left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)), { direction });
  const right = mergeSort(arr.slice(Math.floor(arr.length / 2)), { direction });
  return merge(left, right, { direction });
}

export default mergeSort;
// console.log(mergeSort([72, 1, 5, 7, 2, 10, 55, 12, 33, 73], { direction: 'ascending' }))