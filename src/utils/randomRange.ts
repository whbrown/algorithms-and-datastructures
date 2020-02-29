export default function randomRange(min: number, max: number): number {
  // not including max
  return Math.floor(Math.random() * (max - min) + min);
}