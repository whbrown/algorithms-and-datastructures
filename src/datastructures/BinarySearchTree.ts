interface BinaryTreeNode<T> {
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;
  value: T;
}

class BinaryTreeNode<T> {
  constructor(value: T) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

export { BinaryTreeNode };

interface BinarySearchTree<T> {
  root: BinaryTreeNode<T> | null;
}

class BinarySearchTree<T> {
  constructor() {
    this.root = null;
  }

  insert(value: T): BinaryTreeNode<T> {
    // could refactor as recursive function rather than using while loop
    const node = new BinaryTreeNode<T>(value);
    if (!this.root) {
      this.root = node;
      return node;
    }
    let targetNode: BinaryTreeNode<T> = this.root;
    while (targetNode) {
      if (node.value < targetNode.value) {
        if (!targetNode.left) {
          targetNode.left = node;
          return node;
        }
        targetNode = targetNode.left;
      }
      else if (node.value >= targetNode.value) {
        if (!targetNode.right) {
          targetNode.right = node;
          return node;
        }
        targetNode = targetNode.right;
      }
    }
    return node;
  }
}


export default BinarySearchTree;