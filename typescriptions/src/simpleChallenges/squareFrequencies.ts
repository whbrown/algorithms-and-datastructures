interface Frequencies {
  [key: string]: number; // value: occurrence frequency
}

export default function frequencyCounter(
  array: number[],
  squaresArray: number[]
): boolean {
  const frequencies1 = array.reduce(
    (squareFrequencies: Frequencies, num: number) => {
      squareFrequencies[num ** 2] = squareFrequencies[num ** 2] + 1 || 1;
      return squareFrequencies;
    },
    {}
  );
  const frequencies2 = squaresArray.reduce(
    (squareFrequencies: Frequencies, num: number) => {
      squareFrequencies[num] = squareFrequencies[num] + 1 || 1;
      return squareFrequencies;
    },
    {}
  );
  return JSON.stringify(frequencies1) === JSON.stringify(frequencies2); // ! unreliable!
  // would be better to iterate over Object.keys(frequencies1) with .every(...etc) to check if values of each object for each prop are the same
}

// console.log(frequencyCounter([1, 2, 3], [4, 1, 9]));
