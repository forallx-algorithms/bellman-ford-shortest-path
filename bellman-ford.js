/*
  Bellman Ford algorithm computes shortest path distance of a weighted directed graph in O(m*n)

  @author Evgeniy Kuznetsov
  @date 26.04.2015
*/

// Bellman Ford algorithm
// @param {Edges} edges
// @param {Vertex} destination
// @return {Integer|false} Integer - length of a path, false - graph has negative cycle
function bellmanFord(edges, destination) {
  return 0;
}


// section: Tests

var edges = [
  [1, 2, 2],
  [1, 3, 4],
  [2, 3, 1],
  [2, 4, 2],
  [3, 5, 4],
  [5, 6, 2]
];

console.log("Case 1:", bellmanFord(edges, 5) == 6, bellmanFord(edges, 5));