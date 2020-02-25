export default function fib(targetNum: number): number | void {
  if (targetNum <= 0) return;
  if (targetNum === 1 || targetNum === 2) return 1;
  return (fib(targetNum - 1) as number) + (fib(targetNum - 2) as number);
}
