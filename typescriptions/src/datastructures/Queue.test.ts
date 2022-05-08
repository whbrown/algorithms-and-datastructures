import _Node from './Node';
import Queue from './Queue';

let queue = new Queue<string>();
beforeEach(() => queue = new Queue<string>());

describe('base functionality', () => {
  test('queue class exists', () => {
    expect(typeof queue).toBe('object')
  });
  test('enqueue method exists', () => {
    expect(queue.enqueue).toBeTruthy()
  });
  test('dequeue method exists', () => {
    expect(queue.dequeue).toBeTruthy()
  });
  test('get method exists', () => {
    expect(queue.get).toBeTruthy()
  });
  test('set method exists', () => {
    expect(queue.set).toBeTruthy()
  });
  test('enqueue method works', () => {
    queue.enqueue('1');
    queue.enqueue('2');
    queue.enqueue('3');
    expect(queue).toHaveLength(3);
    expect(queue.back?.data).toBe('3');
    expect(queue.front?.data).toBe('1');
  });
  test('dequeue method works', () => {
    expect(queue.dequeue()).toBeUndefined();
    queue.enqueue('1');
    queue.enqueue('2');
    queue.enqueue('3');
    queue.dequeue();
    expect(queue).toHaveLength(2);
    expect(queue.back?.data).toBe('3');
    expect(queue.front?.data).toBe('2');
  });

  test('get and set methods work', () => {
    try {
      queue.set('Mad Hatter', 1);
    }
    catch (e) {
      expect(e).toBeTruthy();
    }
    queue.enqueue('March Hare');
    queue.set('The Dormouse', 0);
    queue.set('Alice', 0);
    expect(queue.front?.data).toBe('Alice');
    expect(queue.back?.data).toBe('Alice');
    expect(queue).toHaveLength(1);
  })
})
