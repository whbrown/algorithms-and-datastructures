"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BinarySearchTree_1 = __importStar(require("./BinarySearchTree"));
function populateTree(tree) {
    BST.insert(5);
    BST.insert(3);
    BST.insert(8);
    BST.insert(4);
    BST.insert(6);
    BST.insert(1);
    BST.insert(9);
}
let BST = new BinarySearchTree_1.default();
beforeEach(() => BST = new BinarySearchTree_1.default());
describe('basic binary search tree functionality', () => {
    test('Binary search tree exists', () => {
        expect(BST).toBeTruthy();
    });
    test('Tree root initiates as null', () => {
        expect(BST.root).toBeNull();
    });
    test('Can add new root node to tree', () => {
        var _a;
        const node = new BinarySearchTree_1.BinaryTreeNode(5);
        BST.root = node;
        expect((_a = BST.root) === null || _a === void 0 ? void 0 : _a.data).toBe(5);
    });
    test('Can add left and right nodes to tree root manually', () => {
        var _a, _b, _c, _d;
        BST.root = new BinarySearchTree_1.BinaryTreeNode(5);
        BST.root.left = new BinarySearchTree_1.BinaryTreeNode(1);
        BST.root.right = new BinarySearchTree_1.BinaryTreeNode(10);
        expect((_b = (_a = BST.root) === null || _a === void 0 ? void 0 : _a.left) === null || _b === void 0 ? void 0 : _b.data).toBe(1);
        expect((_d = (_c = BST.root) === null || _c === void 0 ? void 0 : _c.right) === null || _d === void 0 ? void 0 : _d.data).toBe(10);
    });
    test('Insert method exists', () => {
        expect(typeof BST.insert).toBe('function');
    });
});
describe('insertion', () => {
    test('insert method works by inserting in order (left to right ascending)', () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        populateTree(BST);
        expect((_a = BST.root) === null || _a === void 0 ? void 0 : _a.data).toBe(5);
        expect((_c = (_b = BST.root) === null || _b === void 0 ? void 0 : _b.left) === null || _c === void 0 ? void 0 : _c.data).toBe(3);
        expect((_e = (_d = BST.root) === null || _d === void 0 ? void 0 : _d.right) === null || _e === void 0 ? void 0 : _e.data).toBe(8);
        expect((_h = (_g = (_f = BST.root) === null || _f === void 0 ? void 0 : _f.left) === null || _g === void 0 ? void 0 : _g.right) === null || _h === void 0 ? void 0 : _h.data).toBe(4);
        expect((_l = (_k = (_j = BST.root) === null || _j === void 0 ? void 0 : _j.right) === null || _k === void 0 ? void 0 : _k.left) === null || _l === void 0 ? void 0 : _l.data).toBe(6);
        expect((_p = (_o = (_m = BST.root) === null || _m === void 0 ? void 0 : _m.left) === null || _o === void 0 ? void 0 : _o.left) === null || _p === void 0 ? void 0 : _p.data).toBe(1);
        expect((_s = (_r = (_q = BST.root) === null || _q === void 0 ? void 0 : _q.right) === null || _r === void 0 ? void 0 : _r.right) === null || _s === void 0 ? void 0 : _s.data).toBe(9);
    });
    test(`can insert multiple nodes of the same value and they'll bubble down the right`, () => {
        var _a, _b, _c, _d, _e, _f;
        BST.insert(1);
        BST.insert(1);
        BST.insert(1);
        expect((_a = BST.root) === null || _a === void 0 ? void 0 : _a.data).toBe(1);
        expect((_c = (_b = BST.root) === null || _b === void 0 ? void 0 : _b.right) === null || _c === void 0 ? void 0 : _c.data).toBe(1);
        expect((_f = (_e = (_d = BST.root) === null || _d === void 0 ? void 0 : _d.right) === null || _e === void 0 ? void 0 : _e.right) === null || _f === void 0 ? void 0 : _f.data).toBe(1);
    });
});
describe('binary search', () => {
    test('searching for a value in a empty tree returns null', () => {
        expect(BST.find(1)).toBeNull();
    });
    test('searching for a value which is the root value', () => {
        var _a;
        BST.insert(1);
        expect((_a = BST.find(1)) === null || _a === void 0 ? void 0 : _a.data).toBe(1);
    });
    test('searching a populated tree', () => {
        var _a, _b, _c, _d, _e, _f, _g;
        populateTree(BST);
        expect((_a = BST.find(1)) === null || _a === void 0 ? void 0 : _a.data).toBe(1);
        expect(BST.find(2)).toBeNull();
        expect((_b = BST.find(3)) === null || _b === void 0 ? void 0 : _b.data).toBe(3);
        expect((_c = BST.find(4)) === null || _c === void 0 ? void 0 : _c.data).toBe(4);
        expect((_d = BST.find(5)) === null || _d === void 0 ? void 0 : _d.data).toBe(5);
        expect((_e = BST.find(6)) === null || _e === void 0 ? void 0 : _e.data).toBe(6);
        expect(BST.find(7)).toBeNull();
        expect((_f = BST.find(8)) === null || _f === void 0 ? void 0 : _f.data).toBe(8);
        expect((_g = BST.find(9)) === null || _g === void 0 ? void 0 : _g.data).toBe(9);
    });
});
describe('depth first search', () => {
    test('can log a populated tree in ascending order', () => {
        populateTree(BST);
        let ascendingArray = [];
        BST.DFS((node) => { ascendingArray.push(node.data); });
        expect(ascendingArray).toEqual([1, 3, 4, 5, 6, 8, 9]);
    });
    test('can log a populated tree in descending order', () => {
        populateTree(BST);
        let descendingArray = [];
        BST.DFS((node) => descendingArray.push(node.data), BST.root, { order: 'descending' });
        expect(descendingArray).toEqual([9, 8, 6, 5, 4, 3, 1]);
    });
});
describe('breadth first search', () => {
    test('BFS exists', () => {
        expect(BST.BFS(null, BST.root)).toBeNull();
    });
    test('BFS can print out contents of a basic tree', () => {
        let array = [];
        populateTree(BST);
        BST.BFS((node) => array.push(node.data));
        console.log(array);
        expect(array).toEqual([5, 3, 8, 1, 4, 6, 9]);
    });
});
