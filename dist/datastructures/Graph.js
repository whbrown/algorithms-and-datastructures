"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                delete this.adjacencyList[vertex];
            }
            return this.adjacencyList;
        };
        this.adjacencyList = {};
    }
}
exports.default = Graph;
