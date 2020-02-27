import _Node from './Node';

interface SinglyLinkedList<T> {
  head: null | _Node<T>;
  tail: null | _Node<T>;
  length: number;
  push: (node: _Node<T>) => _Node<T>;
  pop: () => _Node<T> | null;
  shift: (node: _Node<T>) => _Node<T>;
  unshift: () => _Node<T> | null;
}

class SinglyLinkedList<T> {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push = (node: _Node<T>) => {
    // add node to end of list
    if (!this.head || !this.tail) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
    return this.tail;
  }

  pop = () => {
    // remove last node from list
    // O(n) time since we have to iterate over the whole list to find the new tail
    if (!this.head) return null;
    let node = this.head;
    if (!node.next) {
      this.head = null;
      this.tail = null;
      this.length--;
      return node;
    }
    else {
      let childNode: _Node<T> | null = node.next;
      while (childNode.next !== null) {
        childNode = childNode.next;
      }
      node.next = null;
      this.tail = node;
      this.length--;
      return childNode;
    }
  }

  shift = (node: _Node<T>) => {
    // add node as first of list
    this.length++;
    node.next = this.head;
    this.head = node;
    return this.head;
  }

  unshift = () => {
    // remove first node from list
    if (!this.head) return null;
    const nextHead = this.head.next;
    const oldHead = this.head;
    this.head = nextHead || null;
    this.length--;
    return oldHead;
  }
}

export default SinglyLinkedList;