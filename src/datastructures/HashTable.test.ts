import HashTable from './HashTable';

let HT = new HashTable<string>();
beforeEach(() => HT = new HashTable<string>());

describe('basic hash table', () => {
  test('hash fn exists', () => {
    expect(typeof HT.hash).toBe('function');
  });
  test('hash fn takes string and returns number between 0 and specified max', () => {
    const max = 50;
    expect(HT.hash('test', max)).toBeLessThan(50);
  });
  test('hash fn throws error if max argument is <= 0', () => {
    let max = 0;
    try {
      HT.hash('test', max);
    } catch (e) {
      expect(e.message).toBe("Max hash value must be a positive integer");
    }
    max = -1;
    try {
      HT.hash('test', max);
    } catch (e) {
      expect(e.message).toBe("Max hash value must be a positive integer");
    }
  });
})