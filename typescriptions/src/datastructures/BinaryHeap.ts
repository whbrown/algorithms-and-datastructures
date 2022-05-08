interface BinaryHeap<T> {
  values: T[];
  type: 'min' | 'max';
}

class BinaryHeap<T extends number> {
  constructor(type: 'min' | 'max', initialValues?: T[]) {
    this.values = [];
    this.type = type;
    if (initialValues) {
      initialValues.forEach((value) => this.insert(value));
    }
  }

  insert(value: T): T[] {
    // recursive insert implementation, returns the heap with the value inserted
    this.values.push(value);
    let valueIndex = this.values.length - 1;
    const helper = (): void => {
      let parentIndex = Math.floor((valueIndex - 1) / 2);
      if (this.type === 'max' && this.values[parentIndex] < value
        || this.type === 'min' && this.values[parentIndex] > value) {
        [this.values[valueIndex], this.values[parentIndex]] = [this.values[parentIndex], this.values[valueIndex]]; // swap parent and child
        valueIndex = parentIndex;
        helper();
      }
    }
    helper();
    return this.values;
  }

  extract(): T | void {
    const { values } = this;
    if (!values.length) return;
    if (values.length === 1) return values.pop();
    const newRoot: T = values.pop()!;
    const extractedNode = values[0];
    values[0] = newRoot;
    let nodeIndex = 0;
    if (this.type === 'max' &&
      values[0] > Math.max(values[1], values[2])
      || this.type === 'min' &&
      values[0] < Math.min(values[1], values[2])) {
      return extractedNode;
    }
    const helper = (): void => {
      const left: [T, number] = [values[nodeIndex * 2 + 1], nodeIndex * 2 + 1]
      const right: [T, number] = [values[nodeIndex * 2 + 2], nodeIndex * 2 + 2]
      if (nodeIndex * 2 + 1 >= values.length) return;
      if (this.type === 'max') {
        if ((left[0] <= values[nodeIndex] // both children larger or undefined
          || left[0] === undefined)
          && (right[0] <= values[nodeIndex]
            || right[0] === undefined)) {
          return; // bubble down successful, exit recursion;
        }
        if (left[0] > right[0]) {
          [values[nodeIndex], values[left[1]]] =
            [values[left[1]], values[nodeIndex]]; // swap left, recurse
          nodeIndex = left[1];
        }
        else {
          [values[nodeIndex], values[right[1]]] =
            [values[right[1]], values[nodeIndex]]; // swap right, recurse
          nodeIndex = right[1];
        }
      }
      else if (this.type === 'min') {
        if ((left[0] >= values[nodeIndex] // both children smaller or undefined
          || left[0] === undefined)
          && (right[0] >= values[nodeIndex]
            || right[0] === undefined)) {
          return; // bubble down successful, exit recursion;
        }
        if (left[0] < right[0]) {
          [values[nodeIndex], values[left[1]]] =
            [values[left[1]], values[nodeIndex]]; // swap left, recurse
          nodeIndex = left[1];
        }
        else {
          [values[nodeIndex], values[right[1]]] =
            [values[right[1]], values[nodeIndex]]; // swap right, recurse
          nodeIndex = right[1];
        }
      }
      helper(); // recurse
    }
    helper();
    return extractedNode;
  }
}

export default BinaryHeap;