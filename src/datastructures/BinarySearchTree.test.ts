import BinarySearchTree, { BinaryTreeNode } from './BinarySearchTree';

let BST = new BinarySearchTree<number>();
beforeEach(() => BST = new BinarySearchTree<number>());

describe('basic binary search tree functionality', () => {
  test('Binary search tree exists', () => {
    expect(BST).toBeTruthy();
  })
  test('Tree root initiates as null', () => {
    expect(BST.root).toBeNull();
  })
  test('Can add new root node to tree', () => {
    const node = new BinaryTreeNode(5);
    BST.root = node;
    expect(BST.root?.value).toBe(5);
  })
  test('Can add left and right nodes to tree root manually', () => {
    BST.root = new BinaryTreeNode(5);
    BST.root.left = new BinaryTreeNode(1);
    BST.root.right = new BinaryTreeNode(10);
    expect(BST.root?.left?.value).toBe(1);
    expect(BST.root?.right?.value).toBe(10);
  })
  test('Insert method exists', () => {
    expect(typeof BST.insert).toBe('function');
  })
  test('insert method works by inserting in order (left to right ascending)', () => {
    BST.insert(5);
    expect(BST.root?.value).toBe(5);
    BST.insert(3);
    expect(BST.root?.left?.value).toBe(3);
    BST.insert(7);
    expect(BST.root?.right?.value).toBe(7);
    BST.insert(4);
    expect(BST.root?.left?.right?.value).toBe(4);
    BST.insert(6);
    expect(BST.root?.right?.left?.value).toBe(6);
    BST.insert(1);
    expect(BST.root?.left?.left?.value).toBe(1);
    BST.insert(8);
    expect(BST.root?.right?.right?.value).toBe(8);
  })
})