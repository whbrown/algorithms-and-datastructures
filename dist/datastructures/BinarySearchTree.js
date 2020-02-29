"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryTreeNode {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}
exports.BinaryTreeNode = BinaryTreeNode;
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        // could refactor as recursive function rather than using while loop
        const node = new BinaryTreeNode(value);
        if (!this.root) {
            this.root = node;
            return node;
        }
        let targetNode = this.root;
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
exports.default = BinarySearchTree;
