import BinarySearchTree, { BinaryTreeNode } from './BinarySearchTree';

function populateTree<T>(tree: BinarySearchTree<T>): void {
  BST.insert(5);
  BST.insert(3);
  BST.insert(8);
  BST.insert(4);
  BST.insert(6);
  BST.insert(1);
  BST.insert(9);
}

let BST = new BinarySearchTree<number>();
beforeEach(() => BST = new BinarySearchTree<number>());

describe('basic binary search tree functionality', () => {
  test('Binary search tree exists', () => {
    expect(BST).toBeTruthy();
  });
  test('Tree root initiates as null', () => {
    expect(BST.root).toBeNull();
  });
  test('Can add new root node to tree', () => {
    const node = new BinaryTreeNode(5);
    BST.root = node;
    expect(BST.root?.value).toBe(5);
  });
  test('Can add left and right nodes to tree root manually', () => {
    BST.root = new BinaryTreeNode(5);
    BST.root.left = new BinaryTreeNode(1);
    BST.root.right = new BinaryTreeNode(10);
    expect(BST.root?.left?.value).toBe(1);
    expect(BST.root?.right?.value).toBe(10);
  });
  test('Insert method exists', () => {
    expect(typeof BST.insert).toBe('function');
  });
})

describe('insertion', () => {
  test('insert method works by inserting in order (left to right ascending)', () => {
    populateTree(BST);
    expect(BST.root?.value).toBe(5);
    expect(BST.root?.left?.value).toBe(3);
    expect(BST.root?.right?.value).toBe(8);
    expect(BST.root?.left?.right?.value).toBe(4);
    expect(BST.root?.right?.left?.value).toBe(6);
    expect(BST.root?.left?.left?.value).toBe(1);
    expect(BST.root?.right?.right?.value).toBe(9);
  });
  test(`can insert multiple nodes of the same value and they'll bubble down the right`, () => {
    BST.insert(1);
    BST.insert(1);
    BST.insert(1);
    expect(BST.root?.value).toBe(1);
    expect(BST.root?.right?.value).toBe(1);
    expect(BST.root?.right?.right?.value).toBe(1);
  });
})

describe('binary search', () => {
  test('searching for a value in a empty tree returns null', () => {
    expect(BST.find(1)).toBeNull();
  })
  test('searching for a value which is the root value', () => {
    BST.insert(1);
    expect(BST.find(1)?.value).toBe(1);
  });
  test('searching a populated tree', () => {
    populateTree(BST);
    expect(BST.find(1)?.value).toBe(1);
    expect(BST.find(2)).toBeNull();
    expect(BST.find(3)?.value).toBe(3);
    expect(BST.find(4)?.value).toBe(4);
    expect(BST.find(5)?.value).toBe(5);
    expect(BST.find(6)?.value).toBe(6);
    expect(BST.find(7)).toBeNull();
    expect(BST.find(8)?.value).toBe(8);
    expect(BST.find(9)?.value).toBe(9);
  })
})

describe('depth first search', () => {
  test('can log an empty tree', () => {

  })
  test('can log a populated tree in ascending order', () => {
    populateTree(BST);
    expect(BST.DFS()).toEqual([1, 3, 4, 5, 6, 8, 9]);
  })
  test('can log a populated tree in descending order', () => {
    populateTree(BST);
    console.log(BST.DFS(BST.root, { order: 'descending' }));
    expect(BST.DFS(BST.root, { order: 'descending' })).toEqual([9, 8, 6, 5, 4, 3, 1]);
  })
})