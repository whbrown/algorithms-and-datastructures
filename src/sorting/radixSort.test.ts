import radixSort, { findDigit, digitCount, maxDigitCount } from './radixSort';

describe('findDigit fn', () => {
  test('findDigit exists', () => {
    expect(typeof findDigit).toBe('function');
  });
  test('findDigit works with positive decimal numbers', () => {
    const getDecimalDigit = findDigit(10);
    const num = 3178;
    expect(getDecimalDigit(num, 1)).toBe(8);
    expect(getDecimalDigit(num, 2)).toBe(7);
    expect(getDecimalDigit(num, 3)).toBe(1);
    expect(getDecimalDigit(num, 4)).toBe(3);
  });
  test('findDigits works with negative decimal numbers', () => {
    const getDecimalDigit = findDigit(10);
    const num = -3178;
    expect(getDecimalDigit(num, 1)).toBe(8);
    expect(getDecimalDigit(num, 2)).toBe(7);
    expect(getDecimalDigit(num, 3)).toBe(1);
    expect(getDecimalDigit(num, 4)).toBe(3);
  });
  test('findDigit works with positive binary numbers', () => {
    const getBinaryDigit = findDigit(2);
    const num = 0b1101;
    expect(getBinaryDigit(num, 1)).toBe(1);
    expect(getBinaryDigit(num, 2)).toBe(0);
    expect(getBinaryDigit(num, 3)).toBe(1);
    expect(getBinaryDigit(num, 4)).toBe(1);
  });
  test('findDigit works with negative binary numbers', () => {
    const getBinaryDigit = findDigit(2);
    const num = -0b1101;
    expect(getBinaryDigit(num, 1)).toBe(1);
    expect(getBinaryDigit(num, 2)).toBe(0);
    expect(getBinaryDigit(num, 3)).toBe(1);
    expect(getBinaryDigit(num, 4)).toBe(1);
  });
  test('findDigit works with positive hex numbers', () => {
    const getHexDigit = findDigit(16);
    const num = 0x3D7E9A;
    expect(getHexDigit(num, 1)).toBe(10);
    expect(getHexDigit(num, 2)).toBe(9);
    expect(getHexDigit(num, 3)).toBe(14);
    expect(getHexDigit(num, 4)).toBe(7);
    expect(getHexDigit(num, 5)).toBe(13);
    expect(getHexDigit(num, 6)).toBe(3);
  });
  test('findDigit works with negative hex numbers', () => {
    const getHexDigit = findDigit(16);
    const num = -0x3D7E9A;
    expect(getHexDigit(num, 1)).toBe(10);
    expect(getHexDigit(num, 2)).toBe(9);
    expect(getHexDigit(num, 3)).toBe(14);
    expect(getHexDigit(num, 4)).toBe(7);
    expect(getHexDigit(num, 5)).toBe(13);
    expect(getHexDigit(num, 6)).toBe(3);
  });
  test('findDigit works with positive octal numbers', () => {
    const getOctalDigit = findDigit(8);
    const num = 0o3503;
    expect(getOctalDigit(num, 1)).toBe(3);
    expect(getOctalDigit(num, 2)).toBe(0);
    expect(getOctalDigit(num, 3)).toBe(5);
    expect(getOctalDigit(num, 4)).toBe(3);
  });
  test('findDigit works with negative octal numbers', () => {
    const getOctalDigit = findDigit(8);
    const num = -0o3503;
    expect(getOctalDigit(num, 1)).toBe(3);
    expect(getOctalDigit(num, 2)).toBe(0);
    expect(getOctalDigit(num, 3)).toBe(5);
    expect(getOctalDigit(num, 4)).toBe(3);
  });
});

describe('digitCount fn', () => {
  test('digit count works on decimal numbers', () => {
    const num = 95043;
    const decimalDigitCount = digitCount(10);
    expect(decimalDigitCount(0)).toBe(1);
    expect(decimalDigitCount(num)).toBe(5);
  });
  test('digit count works on binary numbers', () => {
    const num = 0b1001110;
    const binaryDigitCount = digitCount(2);
    expect(binaryDigitCount(0b0)).toBe(1);
    expect(binaryDigitCount(num)).toBe(7);
  });
  test('digit count works on hex numbers', () => {
    const num = 0xA012B6;
    const hexDigitCount = digitCount(16);
    expect(hexDigitCount(0x0)).toBe(1);
    expect(hexDigitCount(num)).toBe(6);
  });
  test('digit count works on octal numbers', () => {
    const num = 0o17432;
    const octalDigitCount = digitCount(8);
    expect(octalDigitCount(0o0)).toBe(1);
    expect(octalDigitCount(num)).toBe(5);
  });
});

describe('maxDigitCount fn', () => {
  test('maxDigitCount returns proper max digit count for decimal nums[]', () => {
    const nums = [5, 12, 6964, 23, 95403, 334];
    expect(maxDigitCount(nums, 10)).toBe(5);
  });
  test('maxDigitCount returns null when passed empty[]', () => {
    const nums: number[] = [];
    expect(maxDigitCount(nums, 10)).toBe(null);
  });
});


describe('main radixSort fn', () => {
  test('radixSort works on decimal nums array', () => {
    const nums = [1, 59, 5, 10102, 94, 9991, 234];
    expect(radixSort(nums, 10))
      .toEqual([1, 5, 59, 94, 234, 9991, 10102]);
  });
  test('radixSort works on binary nums array', () => {
    const nums = [0b1000101, 0b101, 0b0, 0b1, 0b11111111];
    expect(radixSort(nums, 2))
      .toEqual([0, 1, 5, 69, 255]);
  });
  test('radixSort works on hex nums array', () => {
    const nums = [0x85, 0xFF, 0x0F0, 0xA000, 0xE, 0x100000];
    expect(radixSort(nums, 16))
      .toEqual([14, 133, 240, 255, 40960, 1048576]);
  });
  test('radixSort works on octal nums array', () => {
    const nums = [0o107, 0o44, 0o10002, 0o7000000];
    expect(radixSort(nums, 8))
      .toEqual([36, 71, 4098, 1835008]);
  });
})