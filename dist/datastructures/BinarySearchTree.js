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
        while (true) {
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
    }
    find(value, startingNode = this.root) {
        if (!startingNode)
            return null;
        if (value < startingNode.value) {
            return this.find(value, startingNode.left);
        }
        if (value > startingNode.value) {
            return this.find(value, startingNode.right);
        }
        // found!
        return startingNode;
    }
    DFS(cbFn, startingNode = this.root, options = { order: 'ascending' }) {
        // calls the callback function on the nodes in the specified order 
        // could reorganize parameterization, little bit too verbose when user wants to use order: 'descending' they also have to pass in the root node
        if (startingNode === null)
            return null;
        const { order } = options;
        const helper = (node = startingNode) => {
            if (order === 'ascending') {
                if (node.left)
                    helper(node.left);
                cbFn(node);
                if (node.right)
                    helper(node.right);
            }
            if (order === 'descending') {
                if (node.right)
                    helper(node.right);
                cbFn(node);
                if (node.left)
                    helper(node.left);
            }
        };
        helper();
    }
    logTree(startingNode = this.root, options = { order: 'ascending' }) {
        if (!startingNode)
            return console.log(null);
        const { order } = options;
        if (order === 'ascending') {
            if (startingNode.left)
                this.logTree(startingNode.left);
            console.log(startingNode.value);
            if (startingNode.right)
                this.logTree(startingNode.right);
        }
        if (order === 'descending') {
            if (startingNode.right)
                return this.logTree(startingNode.right, { order: 'descending' });
            console.log(startingNode.value);
            if (startingNode.left)
                return this.logTree(startingNode.left, { order: 'descending' });
        }
    }
}
exports.default = BinarySearchTree;
