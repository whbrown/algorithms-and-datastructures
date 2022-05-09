const arr = [0, 1, 0, 1, 0, 1, 99];

const singleNum = (arr: number[]) => {
  let candidates = new Set();
  let countsMap: { [key: number]: number } = {};
  for (let num of arr) {
    if (!countsMap[num]) {
      candidates.add(num);
      countsMap[num] = 1;
    } else {
      if (candidates.has(num)) {
        candidates.delete(num);
      }
      countsMap[num] += 1;
    }
  }
  const [result] = [...candidates];
  return result;
}

