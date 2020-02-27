import _Node, { DoublyLinkedNode } from './Node';

interface SinglyLinkedList<T> {
  head: null | _Node<T>;
  tail: null | _Node<T>;
  // these methods cannot be arrow functions in order to be used by the doublelinked subclass
  // push: (node: _Node<T>) => _Node<T>;
  // pop: () => _Node<T> | null;
  // shift: (node: _Node<T>) => _Node<T>;
  // unshift: () => _Node<T> | null;
}

class SinglyLinkedList<T> {
  protected _length: number;
  constructor() {
    this._length = 0;
    this.head = null;
    this.tail = null;
    // don't like how Object.keys(new SinglyLinkedList) shows `_length` but not the public setter `length`
    // there should be a way to fix this?

    // ? maybe make length a public getter with a private setter so that it's readonly outside
    // ? the class, but modifiable inside by the other methods?
    // when implemented, tsc error: Getter and setter accessors do not agree in visibility.ts(2379)
    // typescript doesn't support this, 
    // see https://github.com/microsoft/TypeScript/issues/2845
    // design meeting notes: https://github.com/microsoft/TypeScript/issues/6735
    // instead, i'm using a slightly uglier work around where there is no setter,
    // but the prop itself is private, giving the same functionality.
  }

  public get length(): number {
    return this._length;
  }

  push(node: _Node<T>): _Node<T> {
    // add node to end of list
    // O(1) since we keep track of tail node
    if (!this.head || !this.tail) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this._length++;
    return this.tail;
  }


  pop(): _Node<T> | null {
    // remove last node from list
    // O(n) time since we have to iterate over the whole list to find the new tail, and in particular to point the second to last node's next prop to that new tail.
    if (!this.head) return null;
    let node = this.head;
    if (!node.next) {
      this.head = null;
      this.tail = null;
      this._length--;
      return node;
    }
    else {
      let childNode: _Node<T> | null = node.next;
      while (childNode.next !== null) {
        // list traversal
        childNode = childNode.next;
      }
      node.next = null;
      this.tail = node;
      this._length--;
      return childNode;
    }
  }

  shift(node: _Node<T>): _Node<T> {
    // add node as first of list
    // O(1)
    node.next = this.head;
    this.head = node;
    this._length++;
    return this.head;
  }

  unshift(): _Node<T> | null {
    // remove first node from list
    // O(1)
    if (!this.head) return null;
    const newHead = this.head.next;
    const oldHead = this.head;
    this.head = newHead || null;
    this._length--;
    return oldHead;
  }
}
// const list = new SinglyLinkedList();

export default SinglyLinkedList;