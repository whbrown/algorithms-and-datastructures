import _Node from "./Node";
import SinglyLinkedList from './SinglyLinkedList';

class DoublyLinkedList<T> extends SinglyLinkedList<T> {
  constructor() {
    super();
  };

  push = (value: T): _Node<T> => {
    const oldTail = this.tail;
    const node = super.push(value);
    node.prev = oldTail;
    return node;
  };

  pop = (): _Node<T> | null => {
    // returns deleted item, O(1) time, unlike SinglyLinkedList's O(n) pop
    if (!this.tail) return null;
    const oldTail = this.tail;
    if (oldTail.prev) {
      this.tail = oldTail.prev;
      this.tail.next = null;
    } else {
      // one item list, with that item being popped off;
      this.head = null;
      this.tail = null;
    }
    oldTail.prev = null;
    this._length--;
    return oldTail;
  }

  unshift = (value: T): _Node<T> => {
    let oldHead = this.head;
    let node = super.unshift(value);
    if (oldHead) {
      oldHead.prev = node;
    }
    node.prev = null;
    return node;
  }

  shift = (): _Node<T> | null => {
    if (this.head && this.head.next) {
      // set new head's prev to null
      this.head.next.prev = null;
    }
    return super.shift();
  }
  get = (index: number): _Node<T> | null => {
    if (index < (this.length / 2)) {
      return super.get(index);
    }
    else {
      if (!this.tail || (index > this.length - 1 || index < 0)) return null;
      let counter = this.length - 1;
      let node = this.tail;
      while (counter > index) {
        if (!node.prev) return null;
        node = node.prev;
        counter--;
      }
      return node;
    }
  }

  insert = (value: T, index: number) => super.insert(value, index, { prevEnabled: true });
};

export default DoublyLinkedList;

