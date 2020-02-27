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

class DoublyLinkedNode<T> extends _Node<T> implements _Node<T> {
  constructor(data: T) {
    super(data);
    this.prev = null;
  }
}

export default _Node;
export { DoublyLinkedNode };