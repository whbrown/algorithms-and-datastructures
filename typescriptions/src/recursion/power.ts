export default function power(base: number, exponent: number): number {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}

