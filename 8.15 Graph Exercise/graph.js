class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (this.nodes.has(vertex)) {
      for (let adjacentNode of vertex.adjacent) {
        adjacentNode.adjacent.delete(vertex);
      }

      this.nodes.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const result = [];
    const visited = new Set();

    const traverse = (node) => {
      // Base case and visited case
      if (!node || visited.has(node)) return;

      visited.add(node);
      result.push(node.value);

      node.adjacent.forEach((adjacent) => traverse(adjacent));
    };

    traverse(start);
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const result = [];
    const visited = new Set();
    const queue = [start];

    visited.add(start);

    while (queue.length) {
      const node = queue.shift();
      result.push(node.value);

      node.adjacent.forEach((adjacent) => {
        if (!visited.has(adjacent)) {
          visited.add(adjacent);
          queue.push(adjacent);
        }
      });
    }

    return result;
  }

  // this function accepts a source vertex and a target vertex, and returns the shortest path
  shortestPath(start, target) {
    // Check single node case
    if (start === target) return target;

    // Implement BFS
    const visited = new Set();
    const queue = [[start]];

    visited.add(start);

    while (queue.length) {
      // Get current path from queue
      const path = queue.shift();
      const node = path[path.length - 1];

      // If target found, return path
      if (node === target) return path;

      // Explore adjacent nodes
      for (let neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);

          // Create a new path and add it to the queue
          const newPath = [...path, neighbor];
          queue.push(newPath);
        }
      }
    }

    // No path found from start to target
    return null;
  }
}

module.exports = { Graph, Node };
