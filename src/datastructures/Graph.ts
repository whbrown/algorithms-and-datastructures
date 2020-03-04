import Stack from './Stack';
import Queue from './Queue';
import _Node from './Node';
import PriorityQueue, { PriorityNode } from './PriorityQueue';

interface vertex { key: string, value: unknown };
interface edge { target: string, weight?: number };

interface Graph {
  adjacencyList: AdjacencyList;
  vertices: { [key: string]: vertex };
  options: GraphOptions;
  // might be better to use a set instead of array to keep track of edges and vertices
};
interface AdjacencyList { [vertex: string]: edge[] };

interface GraphOptions {
  direction: 'mono' | 'bi'; // mono- and bi-directionality of edge connection
};

class Graph {
  constructor(options: GraphOptions = { direction: 'bi' }, vertices?: string[] | vertex[]) {
    this.adjacencyList = {};
    this.vertices = {};
    this.options = options;
    if (vertices) {
      switch (typeof vertices[0]) {
        case 'string':
          for (let v of vertices) {
            this.addVertex(v as string);
          }
          break;
        case 'object':
          for (let v of vertices) {
            let { key, value } = v as vertex;
            this.addVertex(key as string, value);
          }
          break;
        default:
          throw new TypeError('Incorrect type passed for vertices array. Try a key string or vertex object');
      }
    }
  };
  public get size() {
    return { vertices: this.vertices.length, edges: this.adjacencyList.length };
  }
  addVertex = (key: string, value: unknown = null): edge[] => {
    const vertex: vertex = { key: key, value: value }
    if (!this.adjacencyList[key]) this.adjacencyList[key] = [];
    if (!this.vertices[key]) this.vertices[key] = vertex;
    return this.adjacencyList[key];
  };

  addVertices = (vertices: string[] | vertex[]) => {
    switch (typeof vertices[0]) {
      case 'string':
        for (let v of vertices) {
          this.addVertex(v as string);
        }
        break;
      case 'object':
        for (let v of vertices) {
          let { key, value } = v as vertex;
          this.addVertex(key as string, value);
        }
        break;
      default:
        throw new TypeError('Incorrect type passed for vertices array. Try a key string or vertex object');
    };
  };

  addEdge = (firstKey: string, secondKey: string, weight?: number): AdjacencyList | null => {
    // bidirectional
    let weightProp = weight ? { weight: weight } : {}; /* going to spread this object into
    eventual edge object. if no weight value given, the weight prop will not exist at all on
    the edge object as spreading an empty object yields nothing */
    const { direction } = this.options;
    if (!this.adjacencyList[firstKey] || !this.adjacencyList[secondKey]) {
      return null; // maybe throw error instead?
    }
    if (!this.adjacencyList[firstKey].find((edge) => edge.target === secondKey)) {
      this.adjacencyList[firstKey].push({ target: secondKey, ...weightProp });
    }
    if (direction === 'bi' && !this.adjacencyList[secondKey].find((edge) => edge.target === firstKey)) {
      this.adjacencyList[secondKey].push({ target: firstKey, ...weightProp });
    }
    return this.adjacencyList;
  };

  addEdges = (edges: { from: string, to: string, weight?: number }[]) => {
    for (let edge of edges) {
      this.addEdge(edge.from, edge.to, edge.weight);
    }
  }

  removeEdge = (firstKey: string, secondKey: string): AdjacencyList | null => {
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
  }

  removeVertex = (key: string): AdjacencyList => {
    if (this.adjacencyList[key] === undefined) throw new ReferenceError(`Key: ${key} does not exist as a vertex.`);
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
  }

  removeVertices = (keys: string[]): AdjacencyList => {
    for (let key of keys) {
      this.removeVertex(key);
    }
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
      for (let neighbourEdge of this.adjacencyList[vertexKey]) {
        if (!visited[neighbourEdge.target]) {
          helper(neighbourEdge.target);
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
        for (let neighbourEdge of this.adjacencyList[vertex]) {
          if (!visited[neighbourEdge.target]) {
            stack.push(neighbourEdge.target);
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

  dijkstra = (start: vertex | string, end: vertex | string) => {
    // dijkstra's shortest path graph algorithm
    // *** setup starting state
    if (typeof start === 'object') start = start.key;
    if (typeof end === 'object') end = end.key;
    if (!this.adjacencyList[start][0].weight || !this.adjacencyList[end][0].weight) {
      return new ReferenceError(`cannot find required property 'weight' on the graph's edges.`);
    };
    let distances: { [key: string]: number } =
      Object.keys(this.adjacencyList).reduce((accumulator: { [key: string]: number }, key) => {
        accumulator[key] = Infinity;
        return accumulator;
      }, {});
    distances[start] = 0;
    let priorityQueue = new PriorityQueue<string>('min');
    Object.keys(distances).forEach((key) => {
      priorityQueue.enqueue(key, distances[key]);
    });
    const prev: { [key: string]: string | null } = Object.keys(this.adjacencyList).reduce((accumulator: { [key: string]: string | null }, key) => {
      accumulator[key] = null;
      return accumulator;
    }, {});

    // *** begin loop
    while (priorityQueue.length) {
      let vertex = priorityQueue.dequeue() as PriorityNode<string>;
      if (vertex.data === end) {
        // end is top priority -> done
        break;
      };
      if (vertex || distances[vertex] !== Infinity) {
        for (let neighbour of this.adjacencyList[vertex.data]) {
          let distance = distances[vertex.data] + <number>neighbour.weight;
          if (distance < distances[neighbour.target]) {
            distances[neighbour.target] = distance;
            prev[neighbour.target] = vertex.data;
            priorityQueue.enqueue(neighbour.target, distance);
          }
        }
      }
    };

    // *** create return object
    const path: { distance: number; route: string[] } = {
      distance: distances[end],
      route: []
    };
    const fillRoute = (key: string): string[] => {
      let array: string[] = [];
      if (prev[key] === null) {
        return array;
      } else {
        array.push(<string>prev[key]);
        return array.concat(fillRoute(<string>prev[key]));
      }
    }
    path.route = fillRoute(end).reverse().concat('E');
    return path;
  }
}

export default Graph;
export { vertex };