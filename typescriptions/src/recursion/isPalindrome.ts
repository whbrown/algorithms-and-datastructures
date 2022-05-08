export default function isPalindrome(str: string): boolean {
  let reverse: string[] = [];
  function append(str: string): string | void {
    if (!str.length) return;
    reverse.push(str[str.length - 1]);
    return append(str.slice(0, str.length - 1));
  }
  if (str.length !== reverse.length) append(str);
  return reverse.join("") === str;
}
