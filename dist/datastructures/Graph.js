"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = __importDefault(require("./Stack"));
;
;
;
class Graph {
    constructor() {
        this.addVertex = (name) => {
            if (!this.adjacencyList[name])
                this.adjacencyList[name] = [];
            return this.adjacencyList[name];
        };
        this.addEdge = (firstVertex, secondVertex, options = { direction: 'bi' }) => {
            // bidirectional
            const { direction } = options;
            if (!this.adjacencyList[firstVertex] || !this.adjacencyList[secondVertex]) {
                return null; // maybe throw error instead?
            }
            if (!this.adjacencyList[firstVertex].includes(secondVertex)) {
                this.adjacencyList[firstVertex].push(secondVertex);
            }
            if (direction === 'bi' && !this.adjacencyList[secondVertex].includes(firstVertex)) {
                this.adjacencyList[secondVertex].push(firstVertex);
            }
            return this.adjacencyList;
        };
        this.removeEdge = (firstVertex, secondVertex, options = { direction: 'bi' }) => {
            const { direction } = options;
            const firstEdge = this.adjacencyList[firstVertex].findIndex((edge) => edge === secondVertex);
            if (firstEdge !== -1) {
                this.adjacencyList[firstVertex].splice(firstEdge, 1);
            }
            if (direction === 'bi') {
                const secondEdge = this.adjacencyList[secondVertex].findIndex((edge) => edge === firstVertex);
                if (secondEdge !== -1) {
                    this.adjacencyList[secondVertex].splice(secondEdge, 1);
                }
            }
            return this.adjacencyList;
        };
        this.removeVertex = (vertex, options = { direction: 'bi' }) => {
            if (this.adjacencyList[vertex] === undefined)
                return null;
            const { direction } = options;
            if (direction === 'bi') {
                for (let edge of this.adjacencyList[vertex]) {
                    this.adjacencyList[edge] = this.adjacencyList[edge].filter(v => v !== vertex);
                }
            }
            else if (direction === 'mono') {
                /* have to iterate over every vertex to delete any mono-directional
                   references to the removed vertex */
                for (let edge of Object.keys(this.adjacencyList)) {
                    this.adjacencyList[edge] = this.adjacencyList[edge].filter(v => v !== vertex);
                }
            }
            delete this.adjacencyList[vertex];
            return this.adjacencyList;
        };
        this.depthFirstTraversal = (vertex, map = v => v) => {
            // takes a starting vertex, and a map function to call on each vertex
            const visited = {};
            const results = [];
            const helper = (vertex) => {
                if (!this.adjacencyList[vertex])
                    return;
                results.push(map(vertex));
                visited[vertex] = true;
                for (let neighbour of this.adjacencyList[vertex]) {
                    if (!visited[neighbour]) {
                        helper(neighbour);
                    }
                }
            };
            helper(vertex);
            return results;
        };
        this.iterativeDFS = (startingVertex, map = v => v) => {
            let stack = new Stack_1.default();
            let results = [];
            const visited = {};
            stack.push(startingVertex);
            while (stack.length > 0) {
                // @ts-ignore // ignore typescript concern that stack.pop will return 
                // void (only happens if stack.size === 0, avoided by while loop)
                let vertex = stack.pop().data;
                if (!visited[vertex]) {
                    visited[vertex] = true;
                    results.push(map(vertex));
                    for (let neighbour of this.adjacencyList[vertex]) {
                        if (!visited[neighbour]) {
                            stack.push(neighbour);
                        }
                    }
                }
            }
            return results;
        };
        this.adjacencyList = {};
        // TODO: change directional to boolean and have it be set in constructor
    }
}
exports.default = Graph;
