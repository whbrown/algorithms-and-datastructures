interface _Node<T> {
  data: T;
  next: (null | _Node<T>);
}

class _Node<T> {
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export default _Node;