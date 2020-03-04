import Stack from './Stack';
import Queue from './Queue';
import _Node from './Node';

interface vertex { key: string, value?: unknown };

// type edge = { vertex: string, weight?: number }
type edge = string;

interface Graph {
  adjacencyList: AdjacencyList;
  vertices: { [key: string]: vertex }
  // might be better to use a set instead of array to keep track of edges
};
interface AdjacencyList { [vertex: string]: edge[] };

interface GraphOptions {
  direction: 'mono' | 'bi'; // mono- and bi-directionality of edge connection
};


class Graph {
  constructor() {
    this.adjacencyList = {};
    this.vertices = {};
    // TODO: change directional to boolean and have it be set in constructor
  }
  addVertex = (name: string, value: unknown = null): edge[] => {
    const vertex: vertex = { key: name, value: value }
    if (!this.adjacencyList[name]) this.adjacencyList[name] = [];
    if (!this.vertices[name]) this.vertices[name] = vertex;
    return this.adjacencyList[name];
  };
  addEdge = (firstKey: string, secondKey: string,
    options: GraphOptions = { direction: 'bi' }): AdjacencyList | null => {
    // bidirectional
    const { direction } = options;
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
  removeEdge = (firstKey: string, secondKey: string,
    options: GraphOptions = { direction: 'bi' }): AdjacencyList | null => {
    const { direction } = options;
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
  }
  removeVertex = (key: string, options: GraphOptions = { direction: 'bi' }): AdjacencyList | null => {
    if (this.adjacencyList[key] === undefined) return null;
    const { direction } = options;
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
    return this.adjacencyList;
  }

  depthFirstTraversal = (startKey: string, map: (vertex: vertex) => unknown = v => v): unknown[] => {
    // takes a starting vertex, and a map function to call on each vertex
    const visited: { [vertex: string]: boolean } = {};
    const results: unknown[] = [];
    const helper = (vertexKey: string): void => {
      if (!this.adjacencyList[vertexKey]) return;
      results.push(map(this.vertices[vertexKey]));
      visited[vertexKey] = true;
      for (let neighbour of this.adjacencyList[vertexKey]) {
        if (!visited[neighbour]) {
          helper(neighbour);
        }
      }
    }
    helper(startKey);
    return results;
  };

  iterativeDFS = (startKey: string, map: (vertex: vertex) => unknown = v => v): unknown[] | null => {
    if (!this.adjacencyList[startKey]) return null;
    let stack = new Stack<string>();
    let results: unknown[] = [];
    const visited: { [key: string]: boolean } = {};
    stack.push(startKey);
    while (stack.length > 0) {
      // @ts-ignore // ignore typescript concern that stack.pop will return 
      // void (only happens if stack.size === 0, avoided by while loop)
      let vertex: string = stack.pop().data;
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

  breathFirstTraversal = (vertexKey: string, map: (vertex: vertex) => unknown = v => v): unknown[] | null => {
    let results: unknown[] = [];
    if (!vertexKey) return null;
    const queue = new Queue<string>()
    const visited: { [vertex: string]: boolean } = { [vertexKey]: true };
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
}
export default Graph;
export { vertex };