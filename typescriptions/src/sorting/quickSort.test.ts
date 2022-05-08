import quickSort from './quickSort';
let arr: number[] = [];
beforeEach(() => arr = [5, 2, 1, 8, 4, 7, 6, 3])

describe('quicksort basic functionality', () => {
  test('quicksort exists', () => {
    expect(typeof quickSort).toBe('function');
  });
  test('quickSort returns same length array as it receives', () => {
    const originalLength = arr.length;
    expect(quickSort(arr).length).toBe(originalLength);
  });
  test('ascending: quicksort works on basic array', () => {
    quickSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
  test('descending: quicksort works on basic array', () => {
    quickSort(arr, { direction: 'descending' });
    expect(arr).toEqual([8, 7, 6, 5, 4, 3, 2, 1]);
  });
})