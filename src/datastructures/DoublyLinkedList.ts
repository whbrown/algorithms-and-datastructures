import _Node from "./Node";
import SinglyLinkedList from './SinglyLinkedList';

// interface DoublyLinkedList<T> extends SinglyLinkedList<T> {
//   head: null | _Node<T>;
//   tail: null | _Node<T>;
//   push: (node: _Node<T>) => _Node<T>;
//   pop: () => _Node<T> | null;
//   shift: (node: _Node<T>) => _Node<T>;
//   unshift: () => _Node<T> | null;
// }

class DoublyLinkedList<T> extends SinglyLinkedList<T> {
  constructor() {
    super();
  };

  push = (value: T): _Node<T> => {
    const oldTail = this.tail;
    const node = super.push(value);
    if (oldTail) {
      node.prev = oldTail;
    }
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
};

const doubleList = new DoublyLinkedList();
doubleList.push(5);
console.log(doubleList);
console.log(doubleList.shift())
console.log(doubleList);

export default DoublyLinkedList;

