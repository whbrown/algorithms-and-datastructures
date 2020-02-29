import DoublyLinkedList from './DoublyLinkedList';
import { testTraversalSLL, fillListWithDummyData } from './SinglyLinkedList.test';
import randomRange from '../utils/randomRange';

export function testTraversalDLL<T>(list: DoublyLinkedList<T>): boolean {
  // backwards traversal
  if (!list.tail) return true; // empty list
  let node = list.tail!;
  let countedLength = 1;
  while (node.prev) {
    // console.log(node.data)
    node = node.prev;
    countedLength++;
  }
  return (node === list.head && countedLength === list.length);
}
let list = new DoublyLinkedList<string>();
beforeEach(() => list = new DoublyLinkedList<string>());


test('popping from an empty list returns void', () => {
  expect(list.pop()).toBeUndefined();
});

test('shifting from an empty list returns void', () => {
  expect(list.shift()).toBeUndefined();
});

test('pushed node to empty list, node -> new head & tail, length 1', () => {
  list.push('value');
  expect(list.head!.data === 'value').toBe(true);
  expect(list.tail!.data === 'value').toBe(true);
  expect(list.length).toBe(1);
})

test('unshifting node to empty list, node -> new head & tail, length 1', () => {
  list.unshift('value');
  expect(list.head!.data === 'value').toBe(true);
  expect(list.tail!.data === 'value').toBe(true);
  expect(list.length).toBe(1);
})

test('insert as 0, or without index, on empty list, node -> new head & tail', () => {
  list.insert('value', 0);
  expect(list.head!.data === 'value').toBe(true);
  expect(list.tail!.data === 'value').toBe(true);
})

test('test traversal of several randomly created lists', () => {
  const list1 = fillListWithDummyData(list);
  const list2 = fillListWithDummyData(list);
  expect(testTraversalDLL(list1)).toBe(true);
  expect(testTraversalDLL(list2)).toBe(true);
});

test('Able to set the value of a node by index', () => {
  list = fillListWithDummyData(list);
  const index = 0;
  list.set(`set: new`, index);
  expect(list.get(index)?.data).toBe(`set: new`);
})

test('Able to insert in the middle of the list and maintain traversal', () => {
  list.push('Van Gogh');
  list.unshift('Matisse');
  list.push('Gauguin');
  list.unshift('Picasso');
  list.insert('Toulouse-Lautrec', 1);
  expect(testTraversalSLL(list)).toBe(true);
  expect(testTraversalDLL(list)).toBe(true);
  expect(list.length).toBe(5);
});

test('Able to remove a node in the middle of the list and maintain traversal', () => {
  list.push('Van Gogh');
  list.unshift('Matisse');
  list.push('Gauguin');
  list.unshift('Picasso');
  list.removeIndex(3);
  expect(testTraversalSLL(list)).toBe(true);
  expect(testTraversalDLL(list)).toBe(true);
});

test(`Able to traverse a list mutated by pushes, pops, shifts, unshifts, inserts, and removals all the way from head to tail`, () => {
  for (let i = 1; i < 100; i++) {
    if (list.length > 1 && list.head!.next === null) {
      console.log('caught length inconsistency at: ', i);
      console.log(list.log());
      throw new Error;
    }
    if (i % 2 === 0) {
      list.push(`push: ${i}`);
    }
    if (i % 3 === 0) {
      list.unshift(`unshift: ${i}`);
    }
    if (i % 5 === 0) {
      list.pop();
    }
    if (i % 7 === 0) {
      list.shift();
    }
    if (i === 1) list.insert(`insert: ${i}`);
    if (i % 9 === 0) {
      list.insert(`insert: ${i}`, randomRange(0, list.length));
    }
    if (i === 20) list.removeIndex(list.length - 1);
    if (i % 11 === 0) {
      list.removeIndex(randomRange(0, list.length));
    }
  }
  expect(testTraversalSLL(list)).toBe(true);
  expect(testTraversalDLL(list)).toBe(true);
})

