import _Node, { DoublyLinkedNode } from "./Node";
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

  push = (node: DoublyLinkedNode<T>): DoublyLinkedNode<T> => {
    if (this.tail) {
      node.prev = this.tail;
    }
    super.push(node);
    return node;
  };

  pop = (): DoublyLinkedNode<T> | null => {
    // returns deleted item, O(1) time
    if (!this.tail) return null;
    const oldTail = this.tail;
    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      // one item list, with that item being popped off;
      this.head = null;
      this.tail = null;
    }
    this._length--;
    return oldTail;
  }

  shift = (node: DoublyLinkedNode<T>): DoublyLinkedNode<T> => {
    if (this.head) {
      this.head.prev = node;
    }
    return super.shift(node);
  }

  unshift = (): DoublyLinkedNode<T> | null => {
    if (this.head && this.head.next) {
      // set new head's prev to null
      this.head.next.prev = null;
    }
    return super.unshift();
  }
};

export default DoublyLinkedList;

// const doubleList = new DoublyLinkedList();
// doubleList.push(new DoublyLinkedNode('test'))
// doubleList.push(new DoublyLinkedNode('additional test'))
// doubleList.shift(new DoublyLinkedNode('yet another additional test'));
// doubleList.pop();
// console.log(doubleList);

