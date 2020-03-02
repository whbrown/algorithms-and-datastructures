interface PriorityNode<T> {
  data: T;
  priority: number;
}

class PriorityNode<T> {
  constructor(data: T, priority: number) {
    this.data = data;
    this.priority = priority;
  }
}

interface PriorityQueue<T extends PriorityNode<T>> {
  values: PriorityNode<T>[];
  type: 'min' | 'max';
}

class PriorityQueue<T extends PriorityNode<T>> {
  constructor(type: 'min' | 'max', initialValues?: { data: T, priority: number }[]) {
    this.values = [];
    this.type = type;
    if (initialValues) {
      initialValues.forEach((node) => this.enqueue(node.data, node.priority));
    }
  }

  enqueue(value: T, priority: number): PriorityNode<T>[] {
    // recursive insert implementation, returns the heap with the value inserted
    const node = new PriorityNode<T>(value, priority);
    this.values.push(node);
    let valueIndex = this.values.length - 1;
    const helper = (): void => {
      let parentIndex = Math.floor((valueIndex - 1) / 2);
      if (this.type === 'max' && this.values[parentIndex].priority < priority
        || this.type === 'min' && this.values[parentIndex].priority > priority) {
        [this.values[valueIndex], this.values[parentIndex]] = [this.values[parentIndex], this.values[valueIndex]]; // swap parent and child
        valueIndex = parentIndex;
        helper();
      }
    }
    helper();
    return this.values;
  }

  dequeue(): PriorityNode<T> | void {
    const { values } = this;
    if (!values.length) return;
    if (values.length === 1) return values.pop();
    const newRoot: PriorityNode<T> = values.pop()!;
    const extractedNode = values[0];
    values[0] = newRoot;
    let nodeIndex = 0;
    if (this.type === 'max' &&
      values[0].priority > Math.max(values[1].priority, values[2].priority)
      || this.type === 'min' &&
      values[0].priority < Math.min(values[1].priority, values[2].priority)) {
      return extractedNode;
    }
    const helper = (): void => {
      const left: [number, number] = [values[nodeIndex * 2 + 1].priority, nodeIndex * 2 + 1]
      const right: [number, number] = [values[nodeIndex * 2 + 2].priority, nodeIndex * 2 + 2]
      if (nodeIndex * 2 + 1 >= values.length) return;
      if (this.type === 'max') {
        if ((left[0] <= values[nodeIndex].priority // both children larger or undefined
          || left[0] === undefined)
          && (right[0] <= values[nodeIndex].priority
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
        if ((left[0] >= values[nodeIndex].priority // both children smaller or undefined
          || left[0] === undefined)
          && (right[0] >= values[nodeIndex].priority
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

export default PriorityQueue;