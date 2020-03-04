"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = __importDefault(require("./Stack"));
const Queue_1 = __importDefault(require("./Queue"));
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
        };
        this.addEdge = (firstKey, secondKey) => {
            // bidirectional
            const { direction } = this.options;
            if (!this.adjacencyList[firstKey] || !this.adjacencyList[secondKey]) {
                return null; // maybe throw error instead?
            }
            if (!this.adjacencyList[firstKey].find((key) => key === secondKey)) {
                this.adjacencyList[firstKey].push(secondKey);
            }
            if (direction === 'bi' && !this.adjacencyList[secondKey].find((key) => key === firstKey)) {
                this.adjacencyList[secondKey].push(firstKey);
            }
            return this.adjacencyList;
        };
        this.addEdges = (edges) => {
            edges.forEach(([fromKey, toKey]) => this.addEdge(fromKey, toKey));
        };
        this.removeEdge = (firstKey, secondKey) => {
            const { direction } = this.options;
            const firstEdge = this.adjacencyList[firstKey].findIndex((key) => key === secondKey);
            if (firstEdge !== -1) {
                this.adjacencyList[firstKey].splice(firstEdge, 1);
            }
            if (direction === 'bi') {
                const secondEdge = this.adjacencyList[secondKey].findIndex((key) => key === firstKey);
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
                    this.adjacencyList[edge] = this.adjacencyList[edge].filter(v => v !== key);
                }
            }
            else if (direction === 'mono') {
                /* have to iterate over every vertex to delete any mono-directional
                   references to the removed vertex */
                for (let edge of Object.keys(this.adjacencyList)) {
                    this.adjacencyList[edge] = this.adjacencyList[edge].filter(v => v !== key);
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
                for (let neighbour of this.adjacencyList[vertexKey]) {
                    if (!visited[neighbour]) {
                        helper(neighbour);
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
                // @ts-ignore // ignore typescript concern that stack.pop will return 
                // void (only happens if stack.size === 0, avoided by while loop)
                let vertex = stack.pop().data;
                if (!visited[vertex]) {
                    visited[vertex] = true;
                    results.push(map(this.vertices[vertex]));
                    for (let neighbour of this.adjacencyList[vertex]) {
                        if (!visited[neighbour]) {
                            stack.push(neighbour);
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
                    for (let neighbour of this.adjacencyList[dequeuedKey]) {
                        if (!visited[neighbour]) {
                            visited[neighbour] = true;
                            queue.enqueue(neighbour);
                        }
                    }
                }
            }
            return results;
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
}
exports.default = Graph;
