import _Node from './Node';
import IndexError from '../utils/IndexError';

interface Stack<T> {
  head: null | _Node<T>;
  tail: null | _Node<T>;
}

class Stack<T> {
  protected _length: number;
  constructor() {
    this._length = 0;
    this.head = null;
    this.tail = null;
  }

  public get length(): number {
    return this._length;
  }

  push(value: T): _Node<T> {
    // renamed version of SinglyLinkedList's unshift
    // add node as first of list
    // O(1)
    const node = new _Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this._length++;
    return this.head;
  }

  pop(): _Node<T> | void {
    // renamed version of SinglyLinkedList's shift
    // O(1)
    if (!this.head) return;
    const newHead = this.head.next;
    const oldHead = this.head;
    oldHead.next = null;
    this.head = newHead || null;
    if (this.length === 1) this.tail = null;
    this._length--;
    return oldHead;
  }

  get(index: number): _Node<T> | null {
    if (!this.head || (index > this.length - 1 || index < 0)) throw new IndexError('list index out of range.');
    let counter = 0;
    let node = this.head;
    while (counter < index) {
      if (!node.next) return null;
      node = node.next;
      counter++;
    }
    return node;
  }

  set(value: T, index: number): _Node<T> | null {
    const selectedNode = this.get(index);
    if (selectedNode) {
      selectedNode.data = value;
    }
    return selectedNode;
  }
}
export default Stack;