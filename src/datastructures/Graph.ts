interface Graph {
  adjacencyList: { [vertex: string]: string[] /* edges[] */ }
  // might be better to use a set instead of array to keep track of edges
}

interface GraphOptions {
  direction: 'mono' | 'bi'; // mono- and bi-directionality of edge connection
}

class Graph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex = (name: string): string[] => {
    if (!this.adjacencyList[name]) this.adjacencyList[name] = [];
    return this.adjacencyList[name];
  };
  addEdge = (firstVertex: string, secondVertex: string, options: GraphOptions = { direction: 'bi' }): { [vertex: string]: string[] } | null => {
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
  removeEdge = (firstVertex: string, secondVertex: string, options: GraphOptions = { direction: 'bi' }): { [vertex: string]: string[] } | null => {
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
  }
  removeVertex = (vertex: string, options: GraphOptions = { direction: 'bi' }): { [vertex: string]: string[] } | null => {
    if (this.adjacencyList[vertex] === undefined) return null;
    const { direction } = options;
    if (direction === 'bi') {
      for (let edge of this.adjacencyList[vertex]) {
        this.adjacencyList[edge] = this.adjacencyList[edge].filter(v => v !== vertex);
      }
      delete this.adjacencyList[vertex];
    }
    return this.adjacencyList;
  }
}

export default Graph;