import _Node from './Node';
import IndexError from '../utils/IndexError';
import BinaryTreeNode from './BinarySearchTree';

interface Queue<T> {
  front: null | _Node<T>;
  back: null | _Node<T>;
}


class Queue<T> {
  // this queue implementation uses doubly linked nodes, allowing for 
  // faster getting/setting of data in the middle/back of the queue.
  // while nodes can only be enqueued from the back and dequeued from the front,
  // their data prop is always mutable and accessible--making this not exactly 
  // a strict queue, but functional in O(1)time as a queue along with a couple
  // extra features.
  private _length: number;
  constructor() {
    this._length = 0;
    this.back = null;
    this.front = null;
  }

  public get length(): number {
    return this._length;
  }

  enqueue = (value: T): _Node<T> => {
    // doubly linked list's push
    const oldBack = this.back;
    const node = new _Node(value);
    // add node to end of list
    // O(1) since we keep track of tail node
    if (!this.front || !this.back) {
      this.front = node;
    } else {
      this.back.next = node;
    }
    this.back = node;
    this._length++;
    node.prev = oldBack;
    return node;
  }

  dequeue = (): _Node<T> | void => {
    // doubly linked list's shift
    if (this.front && this.front.next) {
      this.front.next.prev = null;
    }
    if (!this.front) return;
    const newFront = this.front.next;
    const oldFront = this.front;
    oldFront.next = null;
    this.front = newFront || null;
    if (this.length === 1) this.back = null;
    this._length--;
    return oldFront;
  }

  get = (index: number): _Node<T> | null => {
    if (index < (this.length / 2)) {
      // start at front
      if (!this.front || (index > this.length - 1 || index < 0)) throw new IndexError('list index out of range.');
      let counter = 0;
      let node = this.front;
      while (counter < index) {
        if (!node.next) return null;
        node = node.next;
        counter++;
      }
      return node;
    }
    else {
      // count from back
      if (!this.back || (index > this.length - 1 || index < 0)) throw new IndexError('list index out of range.');
      let counter = this.length - 1;
      let node = this.back;
      while (counter > index) {
        if (!node.prev) return null;
        node = node.prev;
        counter--;
      }
      return node;
    }
  }

  set = (value: T, index: number): _Node<T> | null => {
    const selectedNode = this.get(index);
    if (selectedNode) {
      selectedNode.data = value;
    }
    return selectedNode;
  }
}

export default Queue;