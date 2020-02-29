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
        expect((_a = BST.root) === null || _a === void 0 ? void 0 : _a.value).toBe(5);
    });
    test('Can add left and right nodes to tree root manually', () => {
        var _a, _b, _c, _d;
        BST.root = new BinarySearchTree_1.BinaryTreeNode(5);
        BST.root.left = new BinarySearchTree_1.BinaryTreeNode(1);
        BST.root.right = new BinarySearchTree_1.BinaryTreeNode(10);
        expect((_b = (_a = BST.root) === null || _a === void 0 ? void 0 : _a.left) === null || _b === void 0 ? void 0 : _b.value).toBe(1);
        expect((_d = (_c = BST.root) === null || _c === void 0 ? void 0 : _c.right) === null || _d === void 0 ? void 0 : _d.value).toBe(10);
    });
    test('Insert method exists', () => {
        expect(typeof BST.insert).toBe('function');
    });
    test('insert method works by inserting in order (left to right ascending)', () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        BST.insert(5);
        expect((_a = BST.root) === null || _a === void 0 ? void 0 : _a.value).toBe(5);
        BST.insert(3);
        expect((_c = (_b = BST.root) === null || _b === void 0 ? void 0 : _b.left) === null || _c === void 0 ? void 0 : _c.value).toBe(3);
        BST.insert(7);
        expect((_e = (_d = BST.root) === null || _d === void 0 ? void 0 : _d.right) === null || _e === void 0 ? void 0 : _e.value).toBe(7);
        BST.insert(4);
        expect((_h = (_g = (_f = BST.root) === null || _f === void 0 ? void 0 : _f.left) === null || _g === void 0 ? void 0 : _g.right) === null || _h === void 0 ? void 0 : _h.value).toBe(4);
        BST.insert(6);
        expect((_l = (_k = (_j = BST.root) === null || _j === void 0 ? void 0 : _j.right) === null || _k === void 0 ? void 0 : _k.left) === null || _l === void 0 ? void 0 : _l.value).toBe(6);
        BST.insert(1);
        expect((_p = (_o = (_m = BST.root) === null || _m === void 0 ? void 0 : _m.left) === null || _o === void 0 ? void 0 : _o.left) === null || _p === void 0 ? void 0 : _p.value).toBe(1);
        BST.insert(8);
        expect((_s = (_r = (_q = BST.root) === null || _q === void 0 ? void 0 : _q.right) === null || _r === void 0 ? void 0 : _r.right) === null || _s === void 0 ? void 0 : _s.value).toBe(8);
    });
});
