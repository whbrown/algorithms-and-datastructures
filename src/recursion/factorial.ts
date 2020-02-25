export default function factorial(num: number): number | void {
  if (num < 0 || typeof num !== "number") return;
  if (num === 1 || num === 0) return 1;
  return num * <number>factorial(num - 1);
}
console.log(factorial(5));
