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
    test(`can add vertex and it will appear as a key value pair in the adjacency list, with edges value initialized as empty array`, () => {
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
        expect(graph.adjacencyList['Alice'].map(edge => edge.target)).toEqual(['Caterpillar']);
        expect(graph.adjacencyList['Caterpillar'].map(edge => edge.target)).toEqual(['Alice']);
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
        expect(graph.adjacencyList['Alice'].map(edge => edge.target)).toEqual(['The Duchess']);
        expect(graph.adjacencyList['The Duchess'].map(edge => edge.target)).toEqual(['Alice']);
    });
    test('can remove edge between two vertices', () => {
        graph.addVertex('Alice');
        graph.addVertex('Cheshire Cat');
        graph.addEdge('Alice', 'Cheshire Cat');
        expect(typeof graph.removeEdge('Alice', 'Cheshire Cat')).toBe('object');
        expect(graph.adjacencyList['Alice'].map(edge => edge.target)).toEqual([]);
        expect(graph.adjacencyList['Cheshire Cat'].map(edge => edge.target)).toEqual([]);
    });
    test('can remove vertex successfully', () => {
        populateGraph(graph);
        expect(typeof graph.removeVertex('Alice')).toBe('object');
        expect(graph.adjacencyList['Alice']).toBeUndefined();
        expect(graph.adjacencyList['Cheshire Cat'].map(edge => edge.target)).toEqual([]);
        expect(graph.adjacencyList['Mad Hatter'].map(edge => edge.target)).toEqual(['March Hare', 'Dormouse', 'Time']);
        expect(graph.adjacencyList['March Hare'].map(edge => edge.target)).toEqual(['Mad Hatter', 'Dormouse']);
        expect(graph.adjacencyList['Dormouse'].map(edge => edge.target)).toEqual(['Mad Hatter', 'March Hare']);
    });
    test('can remove multiple vertices by key[] with removeVertices method', () => {
        populateGraph(graph);
        graph.removeVertices(['Dormouse', 'Mad Hatter', 'March Hare']);
        expect(graph.adjacencyList).toEqual({ "Alice": [{ "target": "Cheshire Cat" }], "Cheshire Cat": [{ "target": "Alice" }], "Time": [] });
        expect(graph.vertices).toEqual({
            "Alice": { "key": "Alice", "value": null },
            "Cheshire Cat": { "key": "Cheshire Cat", "value": null },
            "Time": { "key": "Time", "value": null }
        });
    });
    test('removing a non-existent key from graph throws reference error', () => {
        populateGraph(graph);
        try {
            graph.removeVertex('White Rabbit');
        }
        catch (e) {
            expect(typeof e).toEqual('object');
            expect(e.message).toBe("Key: White Rabbit does not exist as a vertex.");
        }
        try {
            graph.removeVertices(['White Rabbit', 'Queen of Hearts']);
        }
        catch (e) {
            expect(typeof e).toEqual('object');
            expect(e.message).toBe("Key: White Rabbit does not exist as a vertex.");
        }
    });
});
describe(`can pass in array values to graph's crud methods`, () => {
    test('can initiate a graph with values by passing string[] to constructor', () => {
        graph = new Graph_1.default({ direction: 'bi' }, ['Alice', 'The Caterpillar', 'The Cheshire Cat']);
        expect(graph.adjacencyList).toEqual({ "Alice": [], "The Caterpillar": [], "The Cheshire Cat": [] });
        expect(graph.vertices).toEqual({
            "Alice": { "key": "Alice", "value": null },
            "The Caterpillar": { "key": "The Caterpillar", "value": null },
            "The Cheshire Cat": { "key": "The Cheshire Cat", "value": null }
        });
    });
    test('can initiate a graph with values by passing vertex[] to constructor', () => {
        graph = new Graph_1.default({ direction: 'bi' }, [{ key: 'Alice', value: "Curiouser and curiouser!" },
            { key: 'The Eaglet', value: "Speak English!" },
            { key: 'The Dodo', value: "The best way to explain it is to do it." }]);
        expect(graph.adjacencyList).toEqual({ "Alice": [], "The Dodo": [], "The Eaglet": [] });
        expect(graph.vertices).toEqual({
            "Alice": { "key": "Alice", "value": "Curiouser and curiouser!" },
            "The Dodo": { "key": "The Dodo", "value": "The best way to explain it is to do it." },
            "The Eaglet": { "key": "The Eaglet", "value": "Speak English!" }
        });
    });
    test('addVertices method exists', () => {
        expect(typeof graph.addVertices).toBe('function');
    });
    test('can pass string array to addVertices and get proper result', () => {
        graph.addVertices(['Alice', 'The Duck', 'The Lory', 'The Eaglet']);
        expect(graph.adjacencyList).toEqual({
            "Alice": [], "The Duck": [], "The Eaglet": [],
            "The Lory": []
        });
        expect(graph.vertices).toEqual({
            "Alice": { "key": "Alice", "value": null },
            "The Duck": { "key": "The Duck", "value": null },
            "The Eaglet": { "key": "The Eaglet", "value": null },
            "The Lory": { "key": "The Lory", "value": null }
        });
    });
    test('addEdges method exists', () => {
        expect(typeof graph.addEdges).toBe('function');
    });
    test('bidirectional graph: can pass string array to addEdges, which it will interpret as a tuple: [fromKey, toKey]', () => {
        graph = new Graph_1.default({ direction: 'bi' }, [{ key: 'Alice', value: "Curiouser and curiouser!" },
            { key: 'The Eaglet', value: "Speak English!" },
            { key: 'The Dodo', value: "The best way to explain it is to do it." }]);
        graph.addEdges([{ from: 'Alice', to: 'The Eaglet' }, { from: 'Alice', to: 'The Dodo' },
            { from: 'The Eaglet', to: 'The Dodo' }]);
        expect(graph.adjacencyList).toEqual({
            "Alice": [{ "target": "The Eaglet" },
                { "target": "The Dodo" }], "The Dodo": [{ "target": "Alice" },
                { "target": "The Eaglet" }], "The Eaglet": [{ "target": "Alice" },
                { "target": "The Dodo" }]
        });
    });
    test('monodirectional graph: can pass string array to addEdges, which it will interpret as a tuple: [fromKey, toKey]', () => {
        graph = new Graph_1.default({ direction: 'mono' }, [{ key: 'Alice', value: "Curiouser and curiouser!" },
            { key: 'The Eaglet', value: "Speak English!" },
            { key: 'The Dodo', value: "The best way to explain it is to do it." }]);
        graph.addEdges([{ from: 'Alice', to: 'The Eaglet' }, { from: 'Alice', to: 'The Dodo' },
            { from: 'The Eaglet', to: 'The Dodo' }]);
        expect(graph.adjacencyList).toEqual({
            "Alice": [{ "target": "The Eaglet" },
                { "target": "The Dodo" }], "The Dodo": [], "The Eaglet": [{ "target": "The Dodo" }]
        });
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
describe(`Dijkstra's shortest path algorithm`, () => {
    test('dijkstra exists as a method', () => {
        expect(typeof graph.dijkstra).toBe('function');
    });
    test('dijkstras works with a basic bi-directional graph', () => {
        try {
            populateGraph(graph);
        }
        catch (e) {
            expect(e.message).toBe(`ReferenceError: cannot find required property 'weight' on the graph's edges.`);
        }
    });
    test('can find shortest path with dijkstra', () => {
        graph.addVertices(['A', 'B', 'C', 'D', 'E', 'F']);
        graph.addEdges([{ from: 'A', to: 'B', weight: 4 }, { from: 'A', to: 'C', weight: 2 }, { from: 'C', to: 'D', weight: 2 }, { from: 'C', to: 'F', weight: 4 }, { from: 'F', to: 'E', weight: 1 }, { from: 'D', to: 'E', weight: 3 }, { from: 'D', to: 'F', weight: 1 }, { from: 'B', to: 'E', weight: 3 }]);
        const shortestPath = graph.dijkstra('A', 'E');
        expect(shortestPath).toEqual({ "distance": 6, "route": ["A", "C", "D", "F", "E"] });
    });
});
