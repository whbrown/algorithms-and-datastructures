export default function capitalizeFirst(arr: any[]): string[] {
  let capitalizedArray: string[] = [];
  function helper(arr: any[]): void {
    if (arr.length) {
      let word = arr.shift();
      capitalizedArray.push(word[0].toUpperCase() + word.slice(1));
      helper(arr);
    }
  }
  helper(arr);
  return capitalizedArray;
}

export function capitalizeFirstPure(arr: any[]): string[] {
  let capitalizedArray: string[] = [];
  if (!arr.length) {
    // base case
    return capitalizedArray;
  } else {
    let word = arr.shift();
    capitalizedArray.push(word[0].toUpperCase() + word.slice(1));
  }
  return capitalizedArray.concat(capitalizeFirstPure(arr));
}
console.log(capitalizeFirstPure(["car", "taco", "banana"]));
