export default function reverse(str: string): string {
  let reversedStr: string[] = [];
  function helper(str: string): string {
    if (!str.length) return reversedStr.join("");
    reversedStr.push(str[str.length - 1]);
    return helper(str.slice(0, str.length - 1));
  }
  return helper(str);
}

