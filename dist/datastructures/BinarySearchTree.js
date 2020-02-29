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
    DFS(startingNode = this.root, options = { order: 'ascending' }) {
        if (startingNode === null)
            return null;
        const array = [];
        const helper = (node = startingNode, options = { order: 'ascending' }) => {
            const { order } = options;
            if (order === 'ascending') {
                if (node.left)
                    helper(node.left);
                array.push(node.value);
                if (node.right)
                    helper(node.right);
            }
            if (order === 'descending') {
                if (node.right)
                    helper(node.right, { order: 'descending' });
                array.push(node.value);
                if (node.left)
                    helper(node.left, { order: 'descending' });
            }
        };
        helper(startingNode, options);
        return array;
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
