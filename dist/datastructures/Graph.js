"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = __importDefault(require("./Stack"));
const Queue_1 = __importDefault(require("./Queue"));
const PriorityQueue_1 = __importDefault(require("./PriorityQueue"));
;
;
;
;
;
class Graph {
    constructor(options = { direction: 'bi' }, vertices) {
        this.addVertex = (key, value = null) => {
            const vertex = { key: key, value: value };
            if (!this.adjacencyList[key])
                this.adjacencyList[key] = [];
            if (!this.vertices[key])
                this.vertices[key] = vertex;
            return this.adjacencyList[key];
        };
        this.addVertices = (vertices) => {
            switch (typeof vertices[0]) {
                case 'string':
                    for (let v of vertices) {
                        this.addVertex(v);
                    }
                    break;
                case 'object':
                    for (let v of vertices) {
                        let { key, value } = v;
                        this.addVertex(key, value);
                    }
                    break;
                default:
                    throw new TypeError('Incorrect type passed for vertices array. Try a key string or vertex object');
            }
            ;
        };
        this.addEdge = (firstKey, secondKey, weight) => {
            // bidirectional
            let weightProp = weight ? { weight: weight } : {}; /* going to spread this object into
            eventual edge object. if no weight value given, the weight prop will not exist at all on
            the edge object as spreading an empty object yields nothing */
            const { direction } = this.options;
            if (!this.adjacencyList[firstKey] || !this.adjacencyList[secondKey]) {
                return null; // maybe throw error instead?
            }
            if (!this.adjacencyList[firstKey].find((edge) => edge.target === secondKey)) {
                this.adjacencyList[firstKey].push(Object.assign({ target: secondKey }, weightProp));
            }
            if (direction === 'bi' && !this.adjacencyList[secondKey].find((edge) => edge.target === firstKey)) {
                this.adjacencyList[secondKey].push(Object.assign({ target: firstKey }, weightProp));
            }
            return this.adjacencyList;
        };
        this.addEdges = (edges) => {
            for (let edge of edges) {
                this.addEdge(edge.from, edge.to, edge.weight);
            }
        };
        this.removeEdge = (firstKey, secondKey) => {
            const { direction } = this.options;
            const firstEdge = this.adjacencyList[firstKey].findIndex((edge) => edge.target === secondKey);
            if (firstEdge !== -1) {
                this.adjacencyList[firstKey].splice(firstEdge, 1);
            }
            if (direction === 'bi') {
                const secondEdge = this.adjacencyList[secondKey].findIndex((edge) => edge.target === firstKey);
                if (secondEdge !== -1) {
                    this.adjacencyList[secondKey].splice(secondEdge, 1);
                }
            }
            return this.adjacencyList;
        };
        this.removeVertex = (key) => {
            if (this.adjacencyList[key] === undefined)
                throw new ReferenceError(`Key: ${key} does not exist as a vertex.`);
            const { direction } = this.options;
            if (direction === 'bi') {
                for (let edge of this.adjacencyList[key]) {
                    this.adjacencyList[edge.target] = this.adjacencyList[edge.target].filter(edge => edge.target !== key);
                }
            }
            else if (direction === 'mono') {
                /* have to iterate over every vertex to delete any mono-directional
                   references to the removed vertex */
                for (let vertexKey of Object.keys(this.adjacencyList)) {
                    this.adjacencyList[vertexKey] = this.adjacencyList[vertexKey].filter(edge => edge.target !== key);
                }
            }
            delete this.adjacencyList[key];
            delete this.vertices[key];
            return this.adjacencyList;
        };
        this.removeVertices = (keys) => {
            for (let key of keys) {
                this.removeVertex(key);
            }
            return this.adjacencyList;
        };
        this.depthFirstTraversal = (startKey, map = v => v) => {
            // takes a starting vertex, and a map function to call on each vertex
            const visited = {};
            const results = [];
            const helper = (vertexKey) => {
                if (!this.adjacencyList[vertexKey])
                    return;
                results.push(map(this.vertices[vertexKey]));
                visited[vertexKey] = true;
                for (let neighbourEdge of this.adjacencyList[vertexKey]) {
                    if (!visited[neighbourEdge.target]) {
                        helper(neighbourEdge.target);
                    }
                }
            };
            helper(startKey);
            return results;
        };
        this.iterativeDFS = (startKey, map = v => v) => {
            if (!this.adjacencyList[startKey])
                return null;
            let stack = new Stack_1.default();
            let results = [];
            const visited = {};
            stack.push(startKey);
            while (stack.length > 0) {
                // @ts-ignore // ignore typescript error (ts2339) where stack.pop will 
                // return void (only happens if stack.size === 0, avoided by while
                // condition)
                let vertex = stack.pop().data;
                if (!visited[vertex]) {
                    visited[vertex] = true;
                    results.push(map(this.vertices[vertex]));
                    for (let neighbourEdge of this.adjacencyList[vertex]) {
                        if (!visited[neighbourEdge.target]) {
                            stack.push(neighbourEdge.target);
                        }
                    }
                }
            }
            return results;
        };
        this.breathFirstTraversal = (vertexKey, map = v => v) => {
            let results = [];
            if (!vertexKey)
                return null;
            const queue = new Queue_1.default();
            const visited = { [vertexKey]: true };
            queue.enqueue(vertexKey);
            let dequeuedNode;
            while (queue.length) {
                dequeuedNode = queue.dequeue();
                if (dequeuedNode) {
                    let dequeuedKey = dequeuedNode.data;
                    results.push(map(this.vertices[dequeuedKey]));
                    for (let neighbourEdge of this.adjacencyList[dequeuedKey]) {
                        if (!visited[neighbourEdge.target]) {
                            visited[neighbourEdge.target] = true;
                            queue.enqueue(neighbourEdge.target);
                        }
                    }
                }
            }
            return results;
        };
        this.dijkstra = (start, end) => {
            // dijkstra's shortest path graph algorithm
            // *** setup starting state
            if (typeof start === 'object')
                start = start.key;
            if (typeof end === 'object')
                end = end.key;
            if (!this.adjacencyList[start][0].weight || !this.adjacencyList[end][0].weight) {
                return new ReferenceError(`cannot find required property 'weight' on the graph's edges.`);
            }
            ;
            let distances = Object.keys(this.adjacencyList).reduce((accumulator, key) => {
                accumulator[key] = Infinity;
                return accumulator;
            }, {});
            distances[start] = 0;
            let priorityQueue = new PriorityQueue_1.default('min');
            Object.keys(distances).forEach((key) => {
                priorityQueue.enqueue(key, distances[key]);
            });
            const prev = Object.keys(this.adjacencyList).reduce((accumulator, key) => {
                accumulator[key] = null;
                return accumulator;
            }, {});
            // *** begin loop
            while (priorityQueue.length) {
                let vertex = priorityQueue.dequeue();
                if (vertex.data === end) {
                    // end is top priority -> done
                    break;
                }
                ;
                if (vertex || distances[vertex] !== Infinity) {
                    for (let neighbour of this.adjacencyList[vertex.data]) {
                        let distance = distances[vertex.data] + neighbour.weight;
                        if (distance < distances[neighbour.target]) {
                            distances[neighbour.target] = distance;
                            prev[neighbour.target] = vertex.data;
                            priorityQueue.enqueue(neighbour.target, distance);
                        }
                    }
                }
            }
            ;
            // *** create return object
            const path = {
                distance: distances[end],
                route: []
            };
            const fillRoute = (key) => {
                let array = [];
                if (prev[key] === null) {
                    return array;
                }
                else {
                    array.push(prev[key]);
                    return array.concat(fillRoute(prev[key]));
                }
            };
            path.route = fillRoute(end).reverse().concat('E');
            return path;
        };
        this.adjacencyList = {};
        this.vertices = {};
        this.options = options;
        if (vertices) {
            switch (typeof vertices[0]) {
                case 'string':
                    for (let v of vertices) {
                        this.addVertex(v);
                    }
                    break;
                case 'object':
                    for (let v of vertices) {
                        let { key, value } = v;
                        this.addVertex(key, value);
                    }
                    break;
                default:
                    throw new TypeError('Incorrect type passed for vertices array. Try a key string or vertex object');
            }
        }
    }
    ;
    get size() {
        return { vertices: this.vertices.length, edges: this.adjacencyList.length };
    }
}
exports.default = Graph;
