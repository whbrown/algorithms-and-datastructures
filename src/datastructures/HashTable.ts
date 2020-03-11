class HashTable {
  keyMap: [string, string][][];
  constructor(size = 83) {
    this.keyMap = new Array(size);
  }
  hash = (key: string): number => {
    // naive hash fn for illustrative purposes
    let total = 0;
    let prime = 73;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * prime + value) % this.keyMap.length;
    }
    return total;
    // return value.split('').reduce((a, b) => a * b.charCodeAt(0), 1) % max;
  }
  set = (key: string, value: string): void => {
    let index = this.hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [] as [string, string][];
    }
    this.keyMap[index].push([key, value]);
  }

  get = (soughtKey: string) => {
    let index = this.hash(soughtKey);
    if (this.keyMap[index]) {
      return this.keyMap[index].find(([key]) => soughtKey === key);
    }
  }
}

export default HashTable;