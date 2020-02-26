import SortOptions from './SortOptions';

const merge = <T>(arr1: T[], arr2: T[], options: SortOptions = { direction: 'ascending' }): T[] => {
  // Takes two sorted arrays and merges them into one.
  // TODO: should instead infer ascending vs descending by peeking at the first two values of one of the arrays
  let newArr: T[] = [];
  let arr1Index: number = 0;
  let arr2Index: number = 0;
  const { direction } = options;
  while (newArr.length < (arr1.length + arr2.length)) {
    if (!arr2[arr2Index]) {
      return newArr.concat(arr1.slice(arr1Index));
    }
    else if (!arr1[arr1Index]) {
      return newArr.concat(arr2.slice(arr2Index));
    }
    if (direction === 'ascending' && arr1[arr1Index] <= arr2[arr2Index]
      || direction === 'descending' && arr1[arr1Index] >= arr2[arr2Index]) {
      newArr.push(arr1[arr1Index]);
      arr1Index++;
    }
    if (direction === 'ascending' && arr1[arr1Index] >= arr2[arr2Index]
      || direction === 'descending' && arr1[arr1Index] <= arr2[arr2Index]) {
      newArr.push(arr2[arr2Index]);
      arr2Index++;
    }
  }
  return newArr;
}

export default merge;