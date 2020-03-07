const findDigit = (radix: number) => {
  // currying to avoid repeated radix param
  return (num: number, place: number) => {
    return Math.floor(num % radix ** place / radix ** (place - 1));
  }
}

const radixSort = () => { }

export { findDigit };
export default radixSort;