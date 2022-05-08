const findDigit = (radix: 2 | 8 | 10 | 16) => {
  // currying to avoid repeated radix param
  return (num: number, place: number) => {
    return Math.floor(Math.abs(num) % radix ** place / radix ** (place - 1));
  }
}

const digitCount = (radix: 2 | 8 | 10 | 16) => {
  return (num: number) => num.toString(radix).length;
}

const maxDigitCount = (nums: number[], radix: 2 | 8 | 10 | 16): number | null => {
  if (!nums.length) return null;
  return nums.reduce((max, current) => {
    const currentDigitCount = digitCount(radix)(current);
    if (currentDigitCount > max) {
      max = currentDigitCount;
    }
    return max;
  }, 0);
}

const radixSort = (arr: number[], radix: 2 | 8 | 10 | 16): number[] | null => {
  const getDigit = findDigit(radix); // make appropriate getDigit fn for radix of our nums[]
  if (!arr.length) return null;
  const maxDigits = maxDigitCount(arr, radix) as number;
  for (let place = 1; place <= maxDigits; place++) {
    // first initialize buckets to place digits
    let buckets: number[][] = []; // array of arrays (one array for each unique digit)
    for (let digit = 0; digit < radix; digit++) {
      buckets.push([]);
    }
    // now loop over arr
    for (let num of arr) {
      let bucket = getDigit(num, place);
      buckets[bucket].push(num);
    }
    arr = buckets.reduce((newArr, bucket) => {
      return newArr.concat(bucket)
    }, []);
  }
  return arr;
}

export { findDigit, digitCount, maxDigitCount };
export default radixSort;