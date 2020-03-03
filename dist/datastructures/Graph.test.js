"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Graph_1 = __importDefault(require("./Graph"));
let graph = new Graph_1.default();
beforeEach(() => {
    graph = new Graph_1.default();
});
const populateGraph = (graph) => {
    graph.addVertex('Alice');
    graph.addVertex('Cheshire Cat');
    graph.addEdge('Alice', 'Cheshire Cat');
    graph.addVertex('Mad Hatter');
    graph.addVertex('March Hare');
    graph.addVertex('Dormouse');
    graph.addEdge('Mad Hatter', 'Alice');
    graph.addEdge('March Hare', 'Alice');
    graph.addEdge('Dormouse', 'Alice');
    graph.addEdge('Mad Hatter', 'March Hare');
    graph.addEdge('Mad Hatter', 'Dormouse');
    graph.addEdge('March Hare', 'Dormouse');
};
describe('basic graph functionality', () => {
    test('graph class exists', () => {
        expect(typeof graph).toBe('object');
    });
    test('adjacency list prop exists', () => {
        expect(typeof graph.adjacencyList).toBe('object');
    });
    test('add vertex method exists', () => {
        expect(typeof graph.addVertex).toBe('function');
    });
    test('can add vertex and it will appear as a key value pair in the adjacency list, with edges value initialized as empty array', () => {
        graph.addVertex('Alice');
        expect(graph.adjacencyList['Alice']).toEqual([]);
    });
    test('add edge method exists', () => {
        expect(typeof graph.addEdge).toBe('function');
    });
    test('can add bidirectional edge between two added vertices', () => {
        graph.addVertex('Alice');
        graph.addVertex('Caterpillar');
        graph.addEdge('Alice', 'Caterpillar');
        expect(graph.adjacencyList['Alice']).toEqual(['Caterpillar']);
        expect(graph.adjacencyList['Caterpillar']).toEqual(['Alice']);
    });
    test(`adding a bidirectional edge between one or two vertices which don't exist returns null; success returns adjacency list`, () => {
        expect(graph.addEdge('Alice', 'Cheshire Cat')).toBeNull(); // beginning of book
        graph.addVertex('Alice');
        expect(graph.addEdge('Alice', 'Cheshire Cat')).toBeNull(); // Cheshire cat still invisible
        graph.addVertex('Cheshire Cat'); // appears!
        expect(typeof graph.addEdge('Alice', 'Cheshire Cat')).toBe('object');
    });
    test('adding a vertex using existing key name will return the existing list of edges', () => {
        graph.addVertex('Alice');
        graph.addVertex('The Duchess');
        graph.addEdge('Alice', 'The Duchess');
        graph.addVertex('Alice');
        expect(graph.adjacencyList['Alice']).toEqual(['The Duchess']);
        expect(graph.adjacencyList['The Duchess']).toEqual(['Alice']);
    });
    test('can remove edge between two vertices', () => {
        graph.addVertex('Alice');
        graph.addVertex('Cheshire Cat');
        graph.addEdge('Alice', 'Cheshire Cat');
        expect(typeof graph.removeEdge('Alice', 'Cheshire Cat')).toBe('object');
        expect(graph.adjacencyList['Alice']).toEqual([]);
        expect(graph.adjacencyList['Cheshire Cat']).toEqual([]);
    });
    test('can remove vertex successfully', () => {
        populateGraph(graph);
        expect(typeof graph.removeVertex('Alice')).toBe('object');
        expect(graph.adjacencyList['Alice']).toBeUndefined();
        expect(graph.adjacencyList['Cheshire Cat']).toEqual([]);
        expect(graph.adjacencyList['Mad Hatter']).toEqual(['March Hare', 'Dormouse']);
        expect(graph.adjacencyList['March Hare']).toEqual(['Mad Hatter', 'Dormouse']);
        expect(graph.adjacencyList['Dormouse']).toEqual(['Mad Hatter', 'March Hare']);
    });
});
