export default function linearSearch<T>(arr: T[], val: T): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
}

console.log(linearSearch([1, 4, 5], 5));
