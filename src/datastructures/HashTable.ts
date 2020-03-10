class HashTable<T> {
  constructor() {

  }
  hash = (value: string, max: number): number => {
    // naive hash fn for illustrative purposes
    if (max <= 0) throw TypeError('Max hash value must be a positive integer');
    return value.split('').reduce((a, b) => a * b.charCodeAt(0), 1) % max;
  }
}

export default HashTable;