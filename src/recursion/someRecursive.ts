export default function someRecursive<T>(
  arr: T[],
  cbfn: (val: T) => boolean
): boolean {
  let found = false;
  function check<T>(val: T[], cbfn: (val: T) => boolean): boolean {
    if (!val.length) return false;
    let result = cbfn(val.pop() as T);
    found = result;
    if (!found) {
      return check(val, cbfn);
    }
    return true;
  }
  return check(arr.slice(), cbfn);
}
// const isOdd = (value: number): boolean => value % 2 !== 0;
// console.log(someRecursive([2, 4], isOdd));
