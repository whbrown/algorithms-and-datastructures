import _Node from "./Node";
import SinglyLinkedList from './SinglyLinkedList';
import IndexError from '../utils/IndexError';

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

  pop = (): _Node<T> | void => {
    // returns deleted item, O(1) time, unlike SinglyLinkedList's O(n) pop
    if (!this.tail) return;
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
    let oldHead: _Node<T> | null = this.head;
    let node = super.unshift(value);
    if (oldHead) {
      oldHead.prev = node;
    }
    node.prev = null;
    return node;
  }

  shift = (): _Node<T> | void => {
    if (this.head && this.head.next) {
      this.head.next.prev = null;
    }
    return super.shift();
  }
  get = (index: number): _Node<T> | null => {
    if (index < (this.length / 2)) {
      // start at head
      return super.get(index);
    }
    else {
      // count backwards from tail
      if (!this.tail || (index > this.length - 1 || index < 0)) throw new IndexError('list index out of range.');
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

  insert = (value: T, index?: number) => {
    if (index === 0) return this.unshift(value); // uses the doublylinkedlist's unshift/push/shift/pop as
    if (index === this.length) return this.push(value); // they already cover logic for dealing with prev
    return super.insert(value, index, { prevEnabled: true });
  };

  removeIndex = (index: number): _Node<T> | void => {
    if (index === 0) return this.shift();
    if (index === this.length) return this.pop();
    return super.removeIndex(index, { prevEnabled: true });
  }
};

export default DoublyLinkedList;