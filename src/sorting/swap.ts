const swap = <T>(arr: T[], firstIndex: number, secondIndex: number): void => {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
}

export default swap;