export default function naiveStringSearch(
  str: string,
  pattern: string
): number {
  let count = 0;
  if (pattern.length > str.length) return count;
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (str[i + j] !== pattern[j]) break;
      else if (j === pattern.length - 1) count++;
    }
  }
  return count;
}
