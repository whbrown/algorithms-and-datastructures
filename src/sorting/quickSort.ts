import SortOptions from './SortOptions';

function quickSort<T>(arr: T[], options: SortOptions = { direction: 'ascending' }, [left, right]: [number, number] = [0, arr.length - 1]): T[] {
  // TODO: add ability to pass as argument a cbFn used to compare values, like js built-in sort
  const pivot = (arr: T[], indexRange: [number, number] = [0, arr.length - 1]): number => {
    const { direction } = options;
    const [startIndex, lastIndex] = indexRange;
    let matches = 0;
    let pivotIndex = startIndex; /* change pivotIndex selection to be more intentional,
    based on heuristics about the input array's median. */
    let pivotNum = arr[pivotIndex];
    for (let i = pivotIndex + 1; i <= lastIndex; i++) {
      if ((direction === 'ascending' && arr[i] < pivotNum)
        || direction === 'descending' && arr[i] > pivotNum) {
        matches++;
        [arr[pivotIndex + matches], arr[i]] =
          [arr[i], arr[pivotIndex + matches]] // swap matched num to be left of eventual pivot index
      }
    }
    [arr[pivotIndex], arr[pivotIndex + matches]] =
      [arr[pivotIndex + matches], arr[pivotIndex]]; // swap pivot into correct sorted position
    pivotIndex += matches;
    return pivotIndex;
  }
  if (left < right) {
    let pivotIndex = pivot(arr, [left, right]);
    quickSort(arr, options, [left, pivotIndex - 1]);
    quickSort(arr, options, [pivotIndex + 1, right]);
  }
  return arr;
}

export default quickSort;