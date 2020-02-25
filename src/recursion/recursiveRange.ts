export default function recursiveRange(num: number): number {
  if (num <= 0) return 0;
  return num + recursiveRange(num - 1);
}
console.log(recursiveRange(10));
