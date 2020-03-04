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
    graph.addVertex('Time');
    graph.addEdge('Mad Hatter', 'Time'); /* `If you knew Time as well as I do,' said the Hatter,
    `you wouldn't talk about wasting it. It's him.' */
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
        expect(graph.adjacencyList['Mad Hatter']).toEqual(['March Hare', 'Dormouse', 'Time']);
        expect(graph.adjacencyList['March Hare']).toEqual(['Mad Hatter', 'Dormouse']);
        expect(graph.adjacencyList['Dormouse']).toEqual(['Mad Hatter', 'March Hare']);
    });
});
describe('depth first traversal of graphs', () => {
    test('DFS method exists', () => {
        expect(typeof graph.depthFirstTraversal).toBe('function');
    });
    test('DFS method returns array of all connected vertices', () => {
        populateGraph(graph);
        let results = graph.depthFirstTraversal('Alice', (v) => v.key);
        expect(results).toEqual(["Alice", "Cheshire Cat", "Mad Hatter", "March Hare", "Dormouse", "Time"]);
        results = graph.depthFirstTraversal('Time', (v) => v.key); // different route
        expect(results).toEqual(["Time", "Mad Hatter", "Alice", "Cheshire Cat", "March Hare", "Dormouse"]);
    });
});
describe('iterative implementation of DFS', () => {
    test('iterative DFS method exists', () => {
        expect(typeof graph.iterativeDFS).toBe('function');
    });
    test('iterative dfs method returns array of all connected vertices in proper order', () => {
        populateGraph(graph);
        let results = graph.iterativeDFS('Alice', v => v.key);
        expect(results).toEqual(["Alice", "Dormouse", "March Hare", "Mad Hatter", "Time", "Cheshire Cat"]);
        results = graph.iterativeDFS('Time', v => v.key); // different route
        expect(results).toEqual(["Time", "Mad Hatter", "Dormouse", "March Hare", "Alice", "Cheshire Cat"]);
    });
});
describe('breadth first search implementation', () => {
    test('BFS method exists', () => {
        expect(typeof graph.breathFirstTraversal).toBe('function');
    });
    test('breath first search returns array of all connected vertices in proper order', () => {
        populateGraph(graph);
        let results = graph.breathFirstTraversal('Alice', v => v.key);
        expect(results).toEqual(['Alice', 'Cheshire Cat', 'Mad Hatter',
            'March Hare', 'Dormouse', 'Time']);
        // n.b. time comes last as it has a distance of 2
        results = graph.breathFirstTraversal('Time', v => v.key);
        expect(results).toEqual(['Time', 'Mad Hatter', 'Alice', 'March Hare',
            'Dormouse', 'Cheshire Cat']);
        // n.b. cheshire cat comes last as it has a distance of 2
    });
});
