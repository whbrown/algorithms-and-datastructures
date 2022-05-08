// normally would use simple method of sorting both string then comparing them,
// but this is to practice frequency counters

interface FrequencyCounter {
  [char: string]: number;
}

const isAnagram = (word1: string, word2: string): boolean => {
  if (word1.length !== word2.length) return false;
  const letterFrequency = (word: string): FrequencyCounter =>
    word.split("").reduce((prev: FrequencyCounter, char: string) => {
      prev[char] = prev[char] + 1 || 1;
      return prev;
    }, {});
  const frequencies1 = letterFrequency(word1);
  const frequencies2 = letterFrequency(word2);
  return Object.keys(frequencies1).every((char: string) => {
    return frequencies1[char] === frequencies2[char];
  });
};
// console.log(isAnagram("rat", "car"));
export default isAnagram;
