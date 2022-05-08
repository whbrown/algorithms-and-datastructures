import SortOptions from './SortOptions';

const insertionSort = <T>(arr: T[], options: SortOptions = { direction: 'ascending' }) => {
  const { direction } = options;
  if (direction === 'ascending') {
    for (let i = 1; i < arr.length; i++) {
      let compNum = arr[i];
      let j = i - 1;
      for (; j >= 0 && arr[j] > compNum; j--) {
        arr[j + 1] = arr[j];
      }
      arr[j + 1] = compNum;
    }
  }
  if (direction === 'descending') {
    for (let i = arr.length - 2; i >= 0; i--) {
      let compNum = arr[i];
      let j = i + 1;
      for (; j < arr.length && arr[j] > compNum; j++) {
        arr[j - 1] = arr[j];
      }
      arr[j - 1] = compNum;
    }
  }
  return arr;
}

export default insertionSort;