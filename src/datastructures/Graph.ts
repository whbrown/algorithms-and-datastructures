import Stack from './Stack';
import Queue from './Queue';
import _Node from './Node';

type vertex = string;
type edge = string;

interface Graph {
  adjacencyList: AdjacencyList;
  // might be better to use a set instead of array to keep track of edges
};
interface AdjacencyList { [vertex: string]: edge[] };

interface GraphOptions {
  direction: 'mono' | 'bi'; // mono- and bi-directionality of edge connection
};


class Graph {
  constructor() {
    this.adjacencyList = {}
    // TODO: change directional to boolean and have it be set in constructor
  }
  addVertex = (name: vertex): edge[] => {
    if (!this.adjacencyList[name]) this.adjacencyList[name] = [];
    return this.adjacencyList[name];
  };
  addEdge = (firstVertex: vertex, secondVertex: vertex,
    options: GraphOptions = { direction: 'bi' }): AdjacencyList | null => {
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
  removeEdge = (firstVertex: vertex, secondVertex: vertex,
    options: GraphOptions = { direction: 'bi' }): AdjacencyList | null => {
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
  removeVertex = (vertex: vertex, options: GraphOptions = { direction: 'bi' }): AdjacencyList | null => {
    if (this.adjacencyList[vertex] === undefined) return null;
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
  }

  depthFirstTraversal = (vertex: vertex, map: (vertex: vertex) => unknown = v => v): unknown[] => {
    // takes a starting vertex, and a map function to call on each vertex
    const visited: { [vertex: string]: boolean } = {};
    const results: unknown[] = [];
    const helper = (vertex: vertex): void => {
      if (!this.adjacencyList[vertex]) return;
      results.push(map(vertex));
      visited[vertex] = true;
      for (let neighbour of this.adjacencyList[vertex]) {
        if (!visited[neighbour]) {
          helper(neighbour);
        }
      }
    }
    helper(vertex);
    return results;
  };

  iterativeDFS = (startingVertex: vertex, map: (vertex: vertex) => unknown = v => v): unknown[] => {
    let stack = new Stack<string>();
    let results: unknown[] = [];
    const visited: { [vertex: string]: boolean } = {};
    stack.push(startingVertex);
    while (stack.length > 0) {
      // @ts-ignore // ignore typescript concern that stack.pop will return 
      // void (only happens if stack.size === 0, avoided by while loop)
      let vertex: vertex = stack.pop().data;
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

  breathFirstTraversal = (startingVertex: vertex, map: (vertex: vertex) => unknown = v => v): unknown[] | null => {
    let results: unknown[] = [];
    if (!startingVertex) return null;
    const queue = new Queue<vertex>()
    const visited: { [vertex: string]: boolean } = { [startingVertex]: true };
    queue.enqueue(startingVertex);
    let dequeuedNode;
    while (queue.length) {
      dequeuedNode = queue.dequeue();
      if (dequeuedNode) {
        results.push(map(dequeuedNode.data));
        for (let neighbour of this.adjacencyList[dequeuedNode.data]) {
          if (!visited[neighbour]) {
            visited[neighbour] = true;
            queue.enqueue(neighbour);
          }
        }
      }
    }
    return results;
  };
}
export default Graph;