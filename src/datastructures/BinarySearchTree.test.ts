import BinarySearchTree, { BinaryTreeNode } from './BinarySearchTree';

function populateTree1<T>(tree: BinarySearchTree<T>): void {
  BST.insert(5);
  BST.insert(3);
  BST.insert(8);
  BST.insert(4);
  BST.insert(6);
  BST.insert(1);
  BST.insert(9);
}

function populateTree2<T>(tree: BinarySearchTree<T>): void {
  BST.insert(10);
  BST.insert(6);
  BST.insert(15);
  BST.insert(8);
  BST.insert(20);
  BST.insert(3);
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
    expect(BST.root?.data).toBe(5);
  });
  test('Can add left and right nodes to tree root manually', () => {
    BST.root = new BinaryTreeNode(5);
    BST.root.left = new BinaryTreeNode(1);
    BST.root.right = new BinaryTreeNode(10);
    expect(BST.root?.left?.data).toBe(1);
    expect(BST.root?.right?.data).toBe(10);
  });
})

describe('insertion', () => {
  test('Insert method exists', () => {
    expect(typeof BST.insert).toBe('function');
  });
  test('insert method works by inserting in order (left to right ascending)', () => {
    populateTree1(BST);
    expect(BST.root?.data).toBe(5);
    expect(BST.root?.left?.data).toBe(3);
    expect(BST.root?.right?.data).toBe(8);
    expect(BST.root?.left?.right?.data).toBe(4);
    expect(BST.root?.right?.left?.data).toBe(6);
    expect(BST.root?.left?.left?.data).toBe(1);
    expect(BST.root?.right?.right?.data).toBe(9);
  });
  test(`can insert multiple nodes of the same value and they'll bubble down the right`, () => {
    BST.insert(1);
    BST.insert(1);
    BST.insert(1);
    expect(BST.root?.data).toBe(1);
    expect(BST.root?.right?.data).toBe(1);
    expect(BST.root?.right?.right?.data).toBe(1);
  });
})

describe('binary search', () => {
  test('searching for a value in a empty tree returns null', () => {
    expect(BST.find(1)).toBeNull();
  })
  test('searching for a value which is the root value', () => {
    BST.insert(1);
    expect(BST.find(1)?.data).toBe(1);
  });
  test('searching a populated tree', () => {
    populateTree1(BST);
    expect(BST.find(1)?.data).toBe(1);
    expect(BST.find(2)).toBeNull();
    expect(BST.find(3)?.data).toBe(3);
    expect(BST.find(4)?.data).toBe(4);
    expect(BST.find(5)?.data).toBe(5);
    expect(BST.find(6)?.data).toBe(6);
    expect(BST.find(7)).toBeNull();
    expect(BST.find(8)?.data).toBe(8);
    expect(BST.find(9)?.data).toBe(9);
  })
})

describe('depth first search', () => {
  test('can log a populated tree in ascending order', () => {
    populateTree1(BST);
    let ascendingArray: number[] = [];
    BST.DFS((node: BinaryTreeNode<number>) => { ascendingArray.push(node.data) });
    expect(ascendingArray).toEqual([1, 3, 4, 5, 6, 8, 9]);
  });
  test('can log a populated tree in descending order', () => {
    populateTree1(BST);
    let descendingArray: number[] = [];
    BST.DFS((node: BinaryTreeNode<number>) => descendingArray.push(node.data), BST.root, { order: 'descending' })
    expect(descendingArray).toEqual([9, 8, 6, 5, 4, 3, 1]);
  });
  test('preorder DFS working', () => {
    populateTree2(BST);
    const array: number[] = [];
    BST.DFS((node: BinaryTreeNode<number>) => array.push(node.data), BST.root, { order: 'preorder' })
    expect(array).toEqual([10, 6, 3, 8, 15, 20]);
  });
  test('postorder DFS working', () => {
    populateTree2(BST);
    const array: number[] = [];
    BST.DFS((node: BinaryTreeNode<number>) => array.push(node.data), BST.root, { order: 'postorder' });
    expect(array).toEqual([3, 8, 6, 20, 15, 10]);
  })
})

describe('breadth first search', () => {
  test('BFS exists', () => {
    expect(BST.BFS(null, BST.root)).toBeNull();
  })
  test('BFS can accurately print out contents of a basic tree 1', () => {
    populateTree2(BST);
    let array: number[] = [];
    BST.BFS((node: BinaryTreeNode<number>) => array.push(node.data));
    expect(array).toEqual([10, 6, 15, 3, 8, 20])
  })
  test('BFS can accurately print out contents of a basic tree 2', () => {
    let array: number[] = [];
    populateTree1(BST);
    BST.BFS((node: BinaryTreeNode<number>) => array.push(node.data));
    expect(array).toEqual([5, 3, 8, 1, 4, 6, 9])
    BST.insert(7);
    // 7 should be passed down to lowest level of tree beneath 6
    array = [];
    BST.BFS((node: BinaryTreeNode<number>) => array.push(node.data));
    const sixNode = BST.find(6)
    expect(sixNode?.right?.data).toBe(7);
    expect(array).toEqual([5, 3, 8, 1, 4, 6, 9, 7])
  })
})