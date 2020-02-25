export default function productOfArray(arr: number[]): number {
  if (!arr.length) return 1;
  else {
    return arr[0] * productOfArray(arr.slice(1));
  }
}