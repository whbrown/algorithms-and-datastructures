interface _Node<T> {
  data: T;
  next: _Node<T> | null;
  prev?: _Node<T> | null;
}

class _Node<T> implements _Node<T> {
  /// singly linked node
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export default _Node;