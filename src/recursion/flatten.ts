export default function flatten(arr: any[]): any[] {
  // hate using these any types, but had issues with using generics recursively
  let flatArray: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatArray = flatArray.concat(flatten(arr[i]));
    } else {
      flatArray.push(arr[i]);
    }
  }
  return flatArray;
}

console.log(flatten([[[1]], [[[2], 3], 4], 6, [5]]));
