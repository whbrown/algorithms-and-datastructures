import { fillListWithDummyData, testTraversalSLL } from './SinglyLinkedList.test';
import Stack from './Stack';
import _Node from './Node';

let stack = new Stack<string>();
beforeEach(() => stack = new Stack<string>());

describe('base functionality', () => {
  test('stack class exists', () => {
    expect(typeof stack).toBe('object');
  });
  test('can push onto stack', () => {
    stack.push(`push: 0`);
    expect(stack.head).toBeTruthy();
    expect(stack.tail).toBeTruthy();
    expect(stack.head!.data).toBe(`push: 0`)
    expect(stack.tail!.data).toBe(`push: 0`);
  });
  test(`popping from stack gets last item pushed`, () => {
    stack.push('Walrus');
    stack.push('Orca');
    stack.push('Leopard seal');
    const poppedNode = stack.pop() as _Node<string>;
    expect(poppedNode).toBeTruthy();
    expect(poppedNode.data).toBe('Leopard seal')
  })
  test('get value of node with get method', () => {
    stack = fillListWithDummyData(stack);
    const thirdNodeFromTop = stack.get(2);
    expect(thirdNodeFromTop).toBe(stack.head?.next?.next)
  })
  test('able to set value of a node by index (distance from the top)', () => {
    stack = fillListWithDummyData(stack);
    const thirdNodeFromTop = stack.set('set: test', 2);
    expect(stack.get(2)?.data).toBe('set: test')
  })
})

test('full traversal from top to bottom of stack', () => {
  stack = fillListWithDummyData(stack);
  expect(testTraversalSLL(stack)).toBe(true);
})

