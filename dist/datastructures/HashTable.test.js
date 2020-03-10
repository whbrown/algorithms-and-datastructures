"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HashTable_1 = __importDefault(require("./HashTable"));
let HT = new HashTable_1.default();
beforeEach(() => HT = new HashTable_1.default());
describe('basic hash table', () => {
    test('hash fn exists', () => {
        expect(typeof HT.hash).toBe('function');
    });
    test('hash fn takes string and returns number between 0 and specified max', () => {
        const max = 50;
        expect(HT.hash('test', max)).toBeLessThan(50);
    });
    test('hash fn throws error if max argument is <= 0', () => {
        let max = 0;
        try {
            HT.hash('test', max);
        }
        catch (e) {
            expect(e.message).toBe("Max hash value must be a positive integer");
        }
        max = -1;
        try {
            HT.hash('test', max);
        }
        catch (e) {
            expect(e.message).toBe("Max hash value must be a positive integer");
        }
    });
});
